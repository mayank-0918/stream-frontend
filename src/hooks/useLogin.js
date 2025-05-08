import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";

const useLogin = () => {
  const queryClient = useQueryClient();
  let onSuccessCallbackRef = null;

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onMutate: async () => {
      return { onSuccessCallback: onSuccessCallbackRef };
    },
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      context?.onSuccessCallback?.(); // ✅ redirects after login
    },
  });

  const loginMutation = (loginData, onSuccessCallback) => {
    onSuccessCallbackRef = onSuccessCallback;
    mutate(loginData);
  };

  return { error, isPending, loginMutation };
};

export default useLogin;
