import React, { useState, useEffect } from 'react';
import { useVideos } from '../hooks/useVideos';
import { Carousel } from './Carousel';
import { CustomButton } from './CustomButton';
import { VideosResponse } from '../types/talk'; // Pre-existing VideosResponse type
import { Spinner } from './Spinner';

interface TalkListProps {
  searchQuery?: string;
  topicFilter?: string;
}

export const TalkList: React.FC<TalkListProps> = ({
  searchQuery,
  topicFilter,
}) => {
  const [images, setImages] = useState<
    VideosResponse['videos']['edges'][0]['node']['primaryImageSet']
  >([]);
  const { data, fetchNextPage, hasNextPage, isLoading } = useVideos({
    searchQuery,
    topicFilter,
  });

  // Extract images from the API response
  useEffect(() => {
    if (data) {
      const fetchedImages = data.pages.flatMap((page) =>
        page.videos.edges.flatMap((edge) => edge.node.primaryImageSet),
      );
      setImages(fetchedImages);
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Carousel images={images} />
      {hasNextPage && (
        <CustomButton onClick={fetchNextPage} className="mt-4">
          Load More
        </CustomButton>
      )}
    </div>
  );
};
