import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/query-config";
import { User } from "@/prisma/generated/client";
import { Response } from "@/types/response";
import { useMutation } from "@tanstack/react-query";

export const deleteMember = async ({
  id,
}: {
  id: string;
}): Promise<Response<User>> => {
  const response = (await api.delete(`/member/${id}`)) as Response<User>;
  return response;
};

type UseDeleteMemberOptions = {
  mutationConfig?: MutationConfig<typeof deleteMember>;
};

export const useDeleteMember = ({

  mutationConfig,
}: UseDeleteMemberOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: deleteMember,
  });
};
