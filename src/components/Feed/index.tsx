import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
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

  const { mutate: sendImpression } = useMutation({
    mutationFn: (id: string) => fetch(`${BASE_URL}?itemId=${id}`),
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const postRefs = useRef<Map<string, HTMLDivElement>>(new Map());

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

  useEffect(() => {
    const impressionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLDivElement;
          const postId = target.getAttribute("data-id");
          if (entry.isIntersecting && postId) {
            sendImpression(postId);
            impressionObserver.unobserve(target);
          }
        });
      },
      { threshold: 0.5 }
    );

    postRefs.current.forEach((post) => {
      impressionObserver.observe(post);
    });

    return () => impressionObserver.disconnect();
  }, [feed, sendImpression]);

  return (
    <div className="feed-container">
      {feed
        ? feed.pages.flatMap((page) =>
            page.data.map((post, index) => (
              <div
                key={post.id + index}
                ref={(el) => el && postRefs.current.set(post.id, el)}
                data-id={post.id}>
                <Post {...post} />
              </div>
            ))
          )
        : null}
      {isFetchingNextPage && <p>Loading more posts...</p>}
      <div ref={sentinelRef} className="sentinel" />
    </div>
  );
};
