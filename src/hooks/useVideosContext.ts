import { useContext } from 'react';
import { VideosContext } from '../context/VideosContext';

export const useVideosContext = () => {
  const context = useContext(VideosContext);
  if (!context) {
    throw new Error('useVideosContext must be used within a VideosProvider');
  }
  return context;
};
