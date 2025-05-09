import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/query-config";
import { RoomInput } from "@/lib/validations/room";
import { Response } from "@/types/response";
import { Room } from "@/prisma/generated/client";
import { useMutation } from "@tanstack/react-query";

export const insertRoom = async ({
  data,
}: {
  data: RoomInput;
}): Promise<Response<Room>> => {
  const response = (await api.post("/room", data)) as Response<Room>;
  return response;
};

type UseInsertRoomOptions = {
  mutationConfig?: MutationConfig<typeof insertRoom>;
};

export const useInsertRoom = ({
  mutationConfig,
}: UseInsertRoomOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: insertRoom,
  });
};
