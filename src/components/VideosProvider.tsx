import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { VideosProvider } from '../context/VideosContext';
import { ErrorBoundary } from './ErrorBoundary';
import { TalkFilters } from './TalkFilters';
import VideoContainer from './VideoContainer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <VideosProvider>
        {' '}
        {/* Wrap the components that need access to context */}
        <ErrorBoundary>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">TED Talks</h1>
              </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {/* Filters */}
              <TalkFilters />
              {/* Video Container */}
              <VideoContainer />
            </main>
          </div>
        </ErrorBoundary>
      </VideosProvider>
    </QueryClientProvider>
  );
};

export default App;
