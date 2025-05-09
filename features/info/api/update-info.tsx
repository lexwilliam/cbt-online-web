import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/query-config";
import { InfoInput } from "@/lib/validations/info";
import { UserInput } from "@/lib/validations/member";
import { Response } from "@/types/response";
import { Information, User } from "@/prisma/generated/client";
import { useMutation } from "@tanstack/react-query";

export const updateInfo = async ({
  data,
}: {
  data: InfoInput;
}): Promise<Response<Information>> => {
  const response = (await api.put(`/info`, data)) as Response<Information>;
  return response;
};

type UseUpdateInfoOptions = {
  mutationConfig?: MutationConfig<typeof updateInfo>;
};

export const useUpdateInfo = ({
  mutationConfig,
}: UseUpdateInfoOptions = {}) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: updateInfo,
  });
};
