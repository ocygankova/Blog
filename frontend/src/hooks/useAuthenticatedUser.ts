import useSWR from "swr";
import { getAuthenticatedUser } from "@/http/api/users";
import { UnauthorizedError } from "@/http/http-errors";

function useAuthenticatedUser() {
  const { data, isLoading, error, mutate } = useSWR(
    // currently authenticated user will be cached under 'authenticated_user' key,
    // the cache is cleared on page refresh
    "authenticated_user",
    async () => {
      try {
        return await getAuthenticatedUser();
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          return null;
        } else {
          throw error;
        }
      }
    }
  );

  return {
    user: data,
    userLoading: isLoading,
    userLoadingError: error,
    mutateUser: mutate,
  };
}

export default useAuthenticatedUser;
