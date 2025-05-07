import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/query-config";
import { User } from "@prisma/client";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getMember = async (id: string): Promise<User> => {
  const response = (await api.get<User>(`/members/${id}`)) as User;
  return response;
};

export const getMemberQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["member", id],
    queryFn: () => getMember(id),
  });
};

type UseGetMemberOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getMember>;
};

export const useGetMember = ({ id, queryConfig }: UseGetMemberOptions) => {
  return useQuery({
    ...getMemberQueryOptions(id),
    ...queryConfig,
  });
};
