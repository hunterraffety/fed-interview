import React from 'react';

interface TalkFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  topics: string[]; // Dynamic list of topics
}

export const TalkFilters: React.FC<TalkFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedTopic,
  setSelectedTopic,
  topics,
}) => {
  return (
    <div className="w-full sm:w-1/6 flex flex-col space-y-4">
      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search talks..."
        className="p-4 rounded-lg text-lg sm:text-xl text-black placeholder-gray-500"
      />
      {/* Topic Dropdown */}
      <select
        value={selectedTopic}
        onChange={(e) => setSelectedTopic(e.target.value)}
        className="w-full py-2 px-4 rounded-md bg-white text-gray-800"
      >
        {topics.map((topic, index) => (
          <option key={index} value={topic}>
            {topic}
          </option>
        ))}
      </select>
    </div>
  );
};
