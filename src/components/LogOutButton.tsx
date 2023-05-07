import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/router";

export const LogOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <button
      onClick={() => {
        signOut();
        router.push("/");
      }}
    >
      Sign out
    </button>
  );
};
