import { useInfiniteQuery } from "@tanstack/react-query";
import "./feed.css";
import { BASE_URL } from "@/constants";
import { Post, PostData } from "../Post";
import { useEffect, useRef } from "react";

interface FeedData {
  hasMore: boolean;
  data: PostData[];
}

export const Feed = () => {
  const {
    data: feed,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<FeedData>({
    queryKey: ["feed"],
    queryFn: ({ pageParam }) =>
      fetch(`${BASE_URL}hw/feed.json?skip=${pageParam}`).then((res) => res.json()),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => observerRef.current?.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="feed-container">
      {feed
        ? feed.pages.flatMap((page) =>
            page.data.map((post, index) => <Post key={post.id + index} {...post} />)
          )
        : null}
      {isFetchingNextPage && <p>Loading more posts...</p>}
      <div ref={sentinelRef} className="sentinel" />
    </div>
  );
};
