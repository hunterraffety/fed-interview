import React, { useState, useEffect } from 'react';
import { useVideosContext } from '../context/VideosContext';
import { motion } from 'framer-motion';
import {
  filterImageByAspectRatio,
  formatViewCount,
  inferTopic,
} from '../utils/utils';
import { Loader } from './Loader'; // Custom spinner component
import { CustomButton } from './CustomButton'; // Custom button component
import { Video } from '../types/talk';
import { TalkFilters } from './TalkFilters';

const VideoContainer: React.FC = () => {
  const {
    videos,
    isLoading,
    error,
    searchQuery,
    selectedTopic,
    setSearchQuery,
    setSelectedTopic,
  } = useVideosContext();
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [topics, setTopics] = useState<string[]>([]);

  // Get unique topics from the video titles
  const getUniqueTopics = (videos: Video[]) => {
    const allTopics = videos.map((video) => inferTopic(video.title));
    const uniqueTopics = [...new Set(allTopics)];
    if (!uniqueTopics.includes('All Topics')) {
      uniqueTopics.unshift('All Topics');
    }
    return uniqueTopics;
  };

  // Filter videos based on search query and selected topic
  useEffect(() => {
    if (!isLoading) {
      const filtered = videos.filter((video) => {
        const matchesSearch = video.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const videoTopic = inferTopic(video.title); // Use inferred topic
        const matchesTopic =
          selectedTopic && selectedTopic !== 'All Topics'
            ? videoTopic === selectedTopic
            : true;
        return matchesSearch && matchesTopic;
      });
      setFilteredVideos(filtered);
    }
  }, [searchQuery, selectedTopic, videos, isLoading]);

  // Get unique topics every time the videos change
  useEffect(() => {
    setTopics(getUniqueTopics(videos));
  }, [videos]);

  // Reset to the first video when filteredVideos changes, only if there are videos
  useEffect(() => {
    if (filteredVideos.length > 0) {
      setCurrentVideoIndex(0);
    }
  }, [filteredVideos]);

  // Auto advance carousel every 5 seconds if filteredVideos is not empty
  useEffect(() => {
    if (filteredVideos.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentVideoIndex(
          (prevIndex) => (prevIndex + 1) % filteredVideos.length,
        );
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [filteredVideos]);

  // Loading state: only render loader during loading
  if (isLoading && filteredVideos.length === 0) return <Loader />;
  // Error state: render error message if needed
  if (error) return <div className="error-message">Error: {error}</div>;

  // No videos found
  if (filteredVideos.length === 0) {
    return (
      <div
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/placeholder.jpg)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center space-y-4 px-6 py-10">
          <h1 className="text-white text-4xl sm:text-6xl font-semibold">
            TED Talks
          </h1>
          <p className="text-white text-xl sm:text-3xl">
            No videos found for the selected topic or search.
          </p>
          <p className="text-white text-2xl sm:text-3xl">
            Redirecting you back to home...
          </p>
          <CustomButton
            onClick={() => (window.location.href = '/')} // Redir to homepage
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Go Back Home
          </CustomButton>
        </div>
      </div>
    );
  }

  // If there are videos, display the current video
  const video = filteredVideos[currentVideoIndex];
  const selectedImage = filterImageByAspectRatio(video.primaryImageSet);

  return (
    <motion.div
      key={filteredVideos[currentVideoIndex]?.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="relative w-full h-screen"
    >
      {/* Hero Image */}
      <img
        src={selectedImage?.url || '../assets/placeholder.jpg'}
        alt="Hero Background"
        className="w-full h-full object-cover absolute inset-0"
      />

      {/* Overlay Content (Search and Filter Inputs) */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-start items-start p-6 sm:p-10 space-y-6 z-10">
        <div className="text-white w-full">
          <h1 className="text-4xl sm:text-6xl font-semibold mb-6">TED Talks</h1>
          <TalkFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            topics={topics}
          />
        </div>
      </div>

      {/* Footer with Video Info and Navigation */}
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-80 py-8 px-6 sm:px-10 flex justify-between items-center z-20">
        <div className="text-white max-w-xl">
          <h2 className="text-2xl sm:text-4xl">{video.title}</h2>
          <p className="text-lg sm:text-2xl">{video.presenterDisplayName}</p>
          <p className="text-md sm:text-xl">
            {formatViewCount(video.viewedCount)} views
          </p>
        </div>
        <div className="flex items-center gap-6 z-30">
          <CustomButton
            onClick={() =>
              setCurrentVideoIndex(
                currentVideoIndex === 0
                  ? filteredVideos.length - 1
                  : currentVideoIndex - 1,
              )
            }
            className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300 text-lg sm:text-xl"
          >
            Prev
          </CustomButton>
          <CustomButton
            onClick={() =>
              setCurrentVideoIndex(
                (currentVideoIndex + 1) % filteredVideos.length,
              )
            }
            className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300 text-lg sm:text-xl"
          >
            Next
          </CustomButton>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoContainer;
