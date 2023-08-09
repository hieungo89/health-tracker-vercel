// Currently not in use

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Auth({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  const loading = status === "loading";

  useEffect(() => {
    if (!loading) {
      if (!isUser) {
        router.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser, loading]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!loading && isUser) {
    return <>{children}</>;
  }
  return null;
}
