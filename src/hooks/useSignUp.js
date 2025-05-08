

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";

const useSignUp = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup, // <- no wrapping needed
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      context?.onSuccessCallback?.(); // ✅ this will redirect
    },
  });

  const signupMutation = (signupData, onSuccessCallback) => {
    mutate(signupData, {
      context: { onSuccessCallback }, // ✅ correct usage
    });
  };

  return { isPending, error, signupMutation };
};

export default useSignUp;
