import { useVideos } from '../hooks/useVideos';

export function DebugVideos() {
  const { data, isLoading, error } = useVideos({
    searchQuery: '',
    topicFilter: '',
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Fetched Videos:</h2>
      <ul>
        {data?.pages.flatMap((page) =>
          page.videos.edges.map((edge) => (
            <li key={edge.node.id}>{edge.node.title}</li>
          )),
        )}
      </ul>
    </div>
  );
}
