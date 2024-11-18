/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useVideos } from '../hooks/useVideos';
import { Video } from '../types/talk';

interface VideosContextType {
  videos: Video[];
  searchQuery: string;
  selectedTopic: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTopic: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  error: string | null;
}

// Create the context
export const VideosContext = createContext<VideosContextType | undefined>(
  undefined,
);

// Custom hook to use the VideosContext
export const useVideosContext = () => {
  const context = useContext(VideosContext);
  if (!context) {
    throw new Error('useVideosContext must be used within a VideosProvider');
  }
  return context;
};

interface VideosProviderProps {
  children: React.ReactNode;
}

export const VideosProvider: React.FC<VideosProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  // Using the hook to fetch data
  const {
    data,
    isLoading,
    error: rawError,
  } = useVideos({
    searchQuery,
    topicFilter: selectedTopic,
  });

  // Error message handling
  const error = rawError ? rawError.message : null;

  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (data?.pages) {
      // Flatten video data from paginated response
      const flattenedVideos = data.pages.flatMap((page) =>
        page.videos.edges.map((edge) => edge.node),
      );
      setVideos(flattenedVideos);
    }
  }, [data]);

  return (
    <VideosContext.Provider
      value={{
        videos,
        searchQuery,
        selectedTopic,
        setSearchQuery,
        setSelectedTopic,
        isLoading,
        error,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};
