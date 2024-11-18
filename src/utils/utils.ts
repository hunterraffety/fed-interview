import type { Image } from '../types/talk';

export const inferTopic = (title: string): string => {
  const titleLower = title.toLowerCase();

  if (titleLower.includes("technology") || titleLower.includes("ai") || titleLower.includes("innovation")) {
    return "Technology";
  }
  else if (titleLower.includes("kidney") || titleLower.includes("climate") || titleLower.includes("nature")) {
    return "Science";
  } else if (titleLower.includes("dance") || titleLower.includes("creativity")) {
    return "Design";
  } else if (titleLower.includes("global") || titleLower.includes("issues") || titleLower.includes("world")) {
    return "Global Issues";
  } else {
    return "Other";  // no match
  }
};

// Util function to get the appropriate image based on the device aspect ratio
export const filterImageByAspectRatio = (images: Image[]): Image | null => {
  // Get the preferred aspect ratio from device size (using screen width, e.g., mobile, desktop, etc.)
  const width = window.innerWidth;
  let preferredAspectRatio = '16x9';  // Default aspect ratio
  if (width < 768) preferredAspectRatio = '16x9'; // Mobile screens prefer 16x9
  else if (width < 1024) preferredAspectRatio = '4x3'; // Tablets prefer 4:3

  // Filter images that match the preferred aspect ratio
  const suitableImages = images.filter(image => image.aspectRatioName === preferredAspectRatio);
  return suitableImages.length > 0 ? suitableImages[0] : images[0]; // Fallback to any image if no match
};


export const generateRandomViewCount = (): number => {
  return Math.floor(Math.random() * (10000000 - 1000) + 1000); // Random number between 1000 and 10 million
};

export const formatViewCount = (viewCount?: number): string => {
  // Generate a random view count if none exists
  if (!viewCount) {
    viewCount = Math.floor(Math.random() * 10000000); // Simulate a view count between 0 and 10M
  }

  // Format numbers with abbreviations for thousands, millions, etc.
  if (viewCount >= 1000000) {
    return (viewCount / 1000000).toFixed(1) + 'M';
  } else if (viewCount >= 1000) {
    return (viewCount / 1000).toFixed(1) + 'K';
  } else {
    return viewCount.toString() + ' views';
  }
};