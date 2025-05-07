import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/query-config";
import { User } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getAllMember = async (): Promise<User[]> => {
  const response = (await api.get("/members")) as User[];
  return response;
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
