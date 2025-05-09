import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/query-config";
import { Room } from "@/prisma/generated/client";
import { Response } from "@/types/response";
import { useMutation } from "@tanstack/react-query";

export const deleteRoom = async ({
  id,
}: {
  id: string;
}): Promise<Response<Room>> => {
  const response = (await api.delete(`/room/${id}`)) as Response<Room>;
  return response;
};

type UseDeleteRoomOptions = {
  mutationConfig?: MutationConfig<typeof deleteRoom>;
};

export const useDeleteRoom = ({
  mutationConfig,
}: UseDeleteRoomOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: deleteRoom,
  });
};
