import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";              
import { submitPost } from "./actions";      
import { PostsPage } from "@/lib/types";


export function useSubmitPostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters = { queryKey: ["post-feed", "for-you"] };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | undefined>>(
        { queryKey: ["post-feed", "for-you"] },
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor
                },
                ...oldData.pages.slice(1)
              ]
            };
          }
        }
      );

      // In case we cancel the query before the first posts have loaded
      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        }
      });

      toast.success("Post created!");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to post. Please try again.");
    },
  });
}

