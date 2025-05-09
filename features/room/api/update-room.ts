import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/query-config";
import { RoomInput } from "@/lib/validations/room";
import { Response } from "@/types/response";
import { Room } from "@/prisma/generated/client";
import { useMutation } from "@tanstack/react-query";

export const updateRoom = async ({
  id,
  data,
}: {
  id: string;
  data: RoomInput;
}): Promise<Response<Room>> => {
  const response = (await api.put(`/room/${id}`, data)) as Response<Room>;
  return response;
};

type UseUpdateRoomOptions = {
  mutationConfig?: MutationConfig<typeof updateRoom>;
};

export const useUpdateRoom = ({
  mutationConfig,
}: UseUpdateRoomOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: updateRoom,
  });
};
