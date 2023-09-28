import Layout from "@components/Layout";
import SplashPage from "@components/SplashPage";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [account, setAccount] = useState({});
  const { data: session } = useSession();

  const getData = async () => {
    const { data } = await axios.get(`/api/user?email=${session?.user.email}`);
    setAccount(data);
  };

  useEffect(() => {
    if (!session) return;
    getData();
  }, [session]);

  //! NOT SIGNED IN
  if (!session) {
    return <SplashPage />;
  }

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
