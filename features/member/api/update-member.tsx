import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/query-config";
import { UserInput } from "@/lib/validations/member";
import { User } from "@/types/api";
import { Response } from "@/types/response";
import { useMutation } from "@tanstack/react-query";

export const updateMember = async ({
  data,
}: {
  data: UserInput;
}): Promise<Response<User>> => {
  const response = (await api.put("/member", data)) as Response<User>;
  return response;
};

type UseInsertMemberOptions = {
  mutationConfig?: MutationConfig<typeof updateMember>;
};

export const useUpdateMember = ({
  mutationConfig,
}: UseInsertMemberOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: updateMember,
  });
};
