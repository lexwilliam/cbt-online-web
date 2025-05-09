import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/query-config";
import { Information } from "@/prisma/generated/client";
import { Response } from "@/types/response";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getInfo = async (): Promise<Information> => {
  const response = (await api.get("/info")) as Response<Information>;
  return response.data[0];
};

export const getInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ["info"],
    queryFn: () => getInfo(), 
  });
};

type UseGetInfoOptions = {
  queryConfig?: QueryConfig<typeof getInfo>;
};

export const useGetInfo = ({ queryConfig }: UseGetInfoOptions) => {
  return useQuery({
    ...getInfoQueryOptions(),
    ...queryConfig,
  });
};
