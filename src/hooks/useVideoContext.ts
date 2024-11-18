import { createContext, useContext } from 'react';
import { VideosContextProps } from '../context/VideosContext';
const VideosContext = createContext<VideosContextProps | undefined>(undefined);
export const useVideosContext = (): VideosContextProps => {
  const context = useContext(VideosContext);
  if (!context) {
    throw new Error('useVideosContext must be used within a VideosProvider');
  }
  return context;
};
