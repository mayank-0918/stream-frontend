import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";

const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      context?.onSuccessCallback?.(); // Trigger callback if provided
    },
  });

  const loginMutation = (loginData, onSuccessCallback) => {
    mutate(loginData, { context: { onSuccessCallback } });
  };

  return { error, isPending, loginMutation };
};

export default useLogin;
