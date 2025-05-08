import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";

const useSignUp = () => {
  const queryClient = useQueryClient();
  let onSuccessCallbackRef = null;

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onMutate: async () => {
      // store the callback
      return { onSuccessCallback: onSuccessCallbackRef };
    },
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      context?.onSuccessCallback?.(); // this will now work correctly
    },
  });

  const signupMutation = (signupData, onSuccessCallback) => {
    onSuccessCallbackRef = onSuccessCallback; // save ref before calling mutate
    mutate(signupData);
  };

  return { isPending, error, signupMutation };
};

export default useSignUp