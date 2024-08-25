import React, { useEffect, useRef, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

type Post = {
  id: number;
  title: string;
};

function BascWithFetch() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const abortControlleRef = useRef<AbortController | null>(null);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        abortControlleRef.current?.abort();
        abortControlleRef.current = new AbortController();
        const response = await fetch(`${BASE_URL}/posts?page=${page}`, {
          signal: abortControlleRef.current?.signal,
        });
        const postResponse = (await response.json()) as Post[];
        setPosts(postResponse);
      } catch (e: any) {
        console.log(e.name);
        if (e.name === "AbortError") {
          console.log("Api Aborted!");
          return;
        }
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  if (error) {
    return <div>Someting went wrong! Please try again later.</div>;
  }
  return (
    <div>
      <h1>Data Fetcing in React</h1>
      <button onClick={() => setPage((prev) => prev + 1)}>
        Increase Page {page}
      </button>
      {isLoading ? (
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

export default BascWithFetch;
