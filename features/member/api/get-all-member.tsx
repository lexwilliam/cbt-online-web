import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/query-config";
import { User } from "@/prisma/generated/client";
import { Response } from "@/types/response";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getAllMember = async (): Promise<User[]> => {
  const response = (await api.get("/member")) as Response<User[]>;  
  return response.data[0];
};

export const getAllMemberQueryOptions = () => {
  return queryOptions({
    queryKey: ["all-member"],
    queryFn: () => getAllMember(),
  });
};

type UseGetAllMemberOptions = {
  queryConfig?: QueryConfig<typeof getAllMember>;
};

export const useGetAllMember = ({ queryConfig }: UseGetAllMemberOptions) => {
  return useQuery({
    ...getAllMemberQueryOptions(),
    ...queryConfig,
  });
};
