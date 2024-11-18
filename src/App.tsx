import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/ErrorBoundary';
import VideoContainer from './components/VideoContainer';
import { VideosProvider } from './context/VideosContext';
import '../src/styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <VideosProvider>
        <ErrorBoundary>
          <div className="min-h-screen bg-black border-15 border-red-600">
            {/* Main Section */}
            <main className="relative w-full h-full">
              {/* Video Container (Carousel and Video list) */}
              <VideoContainer />
            </main>
          </div>
        </ErrorBoundary>
      </VideosProvider>
    </QueryClientProvider>
  );
};

export default App;
