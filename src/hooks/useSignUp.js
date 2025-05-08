// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { signup } from "../lib/api";

// const useSignUp = () => {
//   const queryClient = useQueryClient();

//   const { mutate, isPending, error } = useMutation({
//     mutationFn: signup,
//     onSuccess: (_, __, context) => {
//       queryClient.invalidateQueries({ queryKey: ["authUser"] });
//       // Optional callback from component for redirection
//       context?.onSuccessCallback?.();
//     },
//   });

//   // Custom mutation function that accepts both signupData and an optional onSuccessCallback
//   const signupMutation = (signupData, onSuccessCallback) => {
//     mutate(signupData, { context: { onSuccessCallback } });
//   };

//   return { isPending, error, signupMutation };
// };

// export default useSignUp;



import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";

const useSignUp = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ signupData }) => {
      return await signup(signupData);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      variables?.onSuccess?.(); // call the navigation callback
    },
  });

  // Wrap mutate to allow custom onSuccess from the component
  const signupMutation = (signupData, onSuccess) => {
    mutate({ signupData, onSuccess });
  };

  return { isPending, error, signupMutation };
};

export default useSignUp;
