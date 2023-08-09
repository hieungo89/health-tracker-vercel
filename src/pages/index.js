import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Home() {
  const [account, setAccount] = useState({});
  const { data: session, status } = useSession();
  const router = useRouter();

  const getData = async () => {
    const { data } = await axios.get(`/api/user?email=${session?.user.email}`);
    setAccount(data);
  };

  useEffect(() => {
    if (!session) return;
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  //! NOT SIGNED IN
  if (!session) {
    return (
      <>
        <Head>
          <title>Health Tracker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout className="flex flex-col justify-center items-center min-h-screen">
          <h1 className="font-semibold text-6xl lg:text-5xl sm:text-3xl">
            Health Tracker
          </h1>
          <div className="py-10 flex flex-col items-center md:py-6">
            <p className="text-lg pb-2 lg:text-base sm:text-sm">
              Welcome to the Health Tracker web app.
            </p>
            <p className="text-lg lg:text-base md:w-72 sm:text-sm">
              This device will help you track your meals, weight, exercise, and
              sleep with quick and easy features.
            </p>
          </div>
          <p className="font-semibold text-3xl pb-2 lg:text-2xl">
            TO GET STARTED
          </p>
          <button
            className="text-4xl border border-solid rounded-lg self-center py-2 px-4 bg-blue-400
          hover:border-black hover:bg-green-500
          lg:text-3xl md:text-2xl"
            onClick={() => signIn("google")}
          >
            Sign in with Google
          </button>
        </Layout>
      </>
    );
  }

  if (status === "loading") return <Layout>...Loading</Layout>;
  if (status === "unauthenticated") router.push("/");

  return (
    <div>
      <Head>
        <title>Health Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className="p-2 flex flex-col items-center">
        <div className="flex flex-col pt-40 md:pt-20">
          <h1 className="text-6xl pb-12 lg:text-5xl md:text-4xl">
            Health Tracker!
          </h1>
        </div>

        {account ? (
          <>
            {/* Profile in System */}
            <h2 className="text-3xl self-center pb-4 md:text-2xl">
              Welcome back {account.firstName}!
            </h2>
            <button
              className="bg-white/70 font-semibold m-12 p-2 border border-solid
            border-black rounded hover:bg-green-400 hover:font-bold md:text-sm"
            >
              <Link href="/profile" className="text-black">
                Go To Profile
              </Link>
            </button>
          </>
        ) : (
          <>
            {/* New Profile */}
            <h2 className="text-3xl self-center pb-4 md:text-2xl">
              Welcome {session.user.name}!
            </h2>
            <p className="text-lg py-2 md:text-base sm:text-sm">
              Thank you for trying out the Health Tracker Application.
            </p>
            <p className="text-lg py-2 md:text-base sm:text-sm">
              Click below to set up your profile!
            </p>
            <button
              className="bg-white/70 font-semibold p-2 border border-solid border-black rounded
              hover:bg-green-400 hover:font-bold md:text-sm"
            >
              <Link
                href={{
                  pathname: "/AccountSettings",
                  query: {
                    type: "create",
                  },
                }}
                className="text-black"
              >
                Setup Profile
              </Link>
            </button>
          </>
        )}
      </Layout>
    </div>
  );
}
