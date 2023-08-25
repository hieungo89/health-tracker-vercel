import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "./Layout";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "loading")
    return (
      <Layout className="text-center text-2xl pt-40 md:pt-20">
        ...Loading
      </Layout>
    );

  if (status === "unauthenticated" && window.location.pathname !== "/")
    router.push("/");

  return children;
};

export default ProtectedRoute;
