import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

type Post = {
  id: number;
  title: string;
};

const queryClient = new QueryClient();

function ReactQuery() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const [page, setPage] = useState(0);

  const {
    data: posts,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["posts", { page }],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/posts?page=${page}`);
      return (await response.json()) as Post[];
    },
  });

  if (isError) {
    return <div>Someting went wrong! Please try again later.</div>;
  }
  return (
    <div>
      <h1>Data Fetcing in React</h1>
      <button onClick={() => setPage((prev) => prev - 1)}>
        Decrease Page {page}
      </button>
      <button onClick={() => setPage((prev) => prev + 1)}>
        Increase Page {page}
      </button>
      {isPending ? (
        <div>Loading....</div>
      ) : (
        <div>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReactQuery;
