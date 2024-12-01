import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "loading")
    return (
      <Layout className="text-center text-2xl bg-white pt-40 md:pt-20">
        Loading
        <span className="appear-delay">.</span>
        <span className="appear-delay delay333">.</span>
        <span className="appear-delay delay666">.</span>
      </Layout>
    );

  if (status === "unauthenticated" && window.location.pathname !== "/")
    router.push("/");

  return children;
};

export default ProtectedRoute;
