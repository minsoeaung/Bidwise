import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "../../api/apiClient";
import { COMMENTS } from "../queries/usePaginatedComments";
import { toaster } from "@/components/ui/toaster";

export interface CommentCreateDto {
  itemId: number;
  commentText: string;
}

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (payload: CommentCreateDto) => {
      return await ApiClient.post(`api/comments`, {
        commentId: 0,
        ...payload,
      });
    },
    {
      onSuccess: async (_, payload) => {
        queryClient.invalidateQueries([COMMENTS, String(payload.itemId)]);
      },
      onError: async (_, payload) => {
        toaster.create({
          title: "Failed to create comment!",
          type: "error",
        });
      },
    }
  );
};
