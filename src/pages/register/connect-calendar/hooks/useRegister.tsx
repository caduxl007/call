import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function useRegister() {
  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query?.error;
  const isSignedIn = session.status === "authenticated";

  async function handleConnectCalendar() {
    await signIn("google");
  }

  async function handleNavigateToNextStep() {
    await router.push("/register/timer-intervals");
  }

  return {
    hasAuthError,
    isSignedIn,
    handleConnectCalendar,
    handleNavigateToNextStep,
  };
}
