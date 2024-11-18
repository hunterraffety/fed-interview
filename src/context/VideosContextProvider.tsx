// src/context/VideosContextProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useVideos } from '../hooks/useVideos'; // Assuming this is your custom hook
import { ApiError, Video, VideosResponse } from '../types/talk';

interface VideosContextType {
  videos: VideosResponse | null;
  isLoading: boolean;
  error: ApiError | null;
  searchQuery: string;
  selectedTopic: string;
  setSearchQuery: (query: string) => void;
  setSelectedTopic: (topic: string) => void;
}

export const VideosContext = createContext<VideosContextType | undefined>(
  undefined,
);

export const useVideosContext = () => {
  const context = useContext(VideosContext);
  if (!context) {
    throw new Error('useVideosContext must be used within a VideosProvider');
  }
  return context;
};

export const VideosProvider: React.FC = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const {
    data,
    isLoading,
    error: rawError,
  } = useVideos({ searchQuery, topicFilter: selectedTopic });

  const error = rawError ? { message: rawError.message } : null;
  const [videos, setVideos] = useState<VideosResponse | null>(null);

  useEffect(() => {
    if (data?.pages) {
      const flattenedVideos = data.pages.flatMap((page) =>
        page.videos.edges.map((edge) => edge.node),
      );
      setVideos({ ...data, videos: flattenedVideos });
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
