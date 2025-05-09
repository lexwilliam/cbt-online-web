import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/query-config";
import { Room } from "@/prisma/generated/client";
import { Response } from "@/types/response";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getAllRoom = async (): Promise<Room[]> => {
  const response = (await api.get("/room")) as Response<Room[]>;
  return response.data[0];
};

export const getAllRoomQueryOptions = () => {
  return queryOptions({
    queryKey: ["all-room"],
    queryFn: () => getAllRoom(),
  });
};

type UseGetAllRoomOptions = {
  queryConfig?: QueryConfig<typeof getAllRoom>;
};

export const useGetAllRoom = ({ queryConfig }: UseGetAllRoomOptions) => {
  return useQuery({
    ...getAllRoomQueryOptions(),
    ...queryConfig,
  });
};
