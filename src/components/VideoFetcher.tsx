import React, { useState } from 'react';
import { useVideos } from '../hooks/useVideos';
import App from '../App';

const VideoFetcher: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  // Using the custom hook to fetch videos
  const { data, isLoading, error } = useVideos({
    searchQuery,
    topicFilter: selectedTopic,
  });

  // Flatten the video data from pages
  const videos = data
    ? data.pages.flatMap((page) => page.videos.edges.map((edge) => edge.node))
    : [];

  return (
    <App
      searchQuery={searchQuery}
      selectedTopic={selectedTopic}
      setSearchQuery={setSearchQuery}
      setSelectedTopic={setSelectedTopic}
      videos={videos}
      isLoading={isLoading}
      error={error ? error.message : null}
    />
  );
};

export default VideoFetcher;
