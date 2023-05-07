/*eslint-disable @typescript-eslint/no-misused-promises */
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/router";

export const LogOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  async function handleClick() {
    await signOut();
    await router.push("/");
    return true;
  }
  return <button onClick={handleClick}>Sign out</button>;
};
