import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";

function useOnboardingRedirect() {
  const router = useRouter();
  const { user } = useAuthenticatedUser();

  useEffect(() => {
    if (user && !user.username && router.pathname !== "/onboarding") {
      router.push(`/onboarding?returnTo=${router.asPath}`);
    }
  }, [user, router]);
}

export default useOnboardingRedirect;
