"use client";

import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import Post from "@/components/posts/Post";
import PostsLoadingSkeleton from "@/components/posts/PostsLoadingSkeleton";
import kyInstance from "@/lib/ky";
import { PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useCallback } from "react";

export default function ForYouFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "for-you"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get("/api/posts/for-you", {
          searchParams: pageParam ? { cursor: pageParam } : undefined,
        })
        .json<PostsPage>(),
    initialPageParam: undefined as string | undefined, 
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined, // ⬅️ clé : undefined = no more page
    refetchOnWindowFocus: false,
    staleTime: 30_000,
  });

  const posts = data?.pages.flatMap((p) => p.posts) ?? [];

  const handleBottom = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") {
    return <PostsLoadingSkeleton />
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return <p className="text-center text-muted-foreground">No one has posted anything yet...</p>
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      onBottomReached={handleBottom}
      disabled={!hasNextPage}
      className="space-y-5"
    >
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {isFetchingNextPage && (
        <div className="flex items-center justify-center py-4 text-muted-foreground">
          <Loader2 className="mr-2 size-4 animate-spin" />
          Loading more…
        </div>
      )}
    </InfiniteScrollContainer>
  );
}
