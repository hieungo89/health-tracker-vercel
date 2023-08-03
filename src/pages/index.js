// import clientPromise from "../lib/mongodb";
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
  }, [session]);

  // NOT SIGNED IN
  if (!session) {
    return (
      <>
        <Head>
          <title>Health Tracker</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="bg-blue-300 flex flex-col justify-center items-center min-h-screen pb-40">
          <h1 className="font-semibold text-6xl">Health Tracker</h1>
          <p className="text-lg mx-60 py-20">
            Welcome to the Health Tracker web app. This device will help you
            track your meals, weight, exercise, and sleep with quick and easy
            features.
          </p>
          <p className="font-semibold text-2xl pb-2">TO GET STARTED</p>
          <button
            className="text-4xl border border-solid rounded self-center py-2 px-4 bg-blue-400
          hover:border-black hover:bg-green-500"
            onClick={() => signIn("google")}
          >
            Sign in with Google
          </button>
        </main>
      </>
    );
  }

  if (status === "unauthenticated") router.push("/");

  return (
    <div>
      <Head>
        <title>Health Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className="p-2 flex flex-col items-center">
        <div className="flex flex-col pt-20">
          <h1 className="text-6xl pb-12">Health Tracker!</h1>
        </div>

        {account ? (
          <>
            <h2 className="text-3xl self-center pb-4">
              Welcome back {account.firstName}!
            </h2>
            <button className="bg-blue-200 font-semibold m-12 p-2 border border-solid border-black rounded hover:bg-green-400 hover:font-bold">
              <Link href="/profile" className="text-black">
                Go To Profile
              </Link>
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl self-center pb-4">
              Welcome {session.user.name}!
            </h2>
            <p className="text-lg py-2">
              Thank you for trying out the Health Tracker Application. Click
              below to set up your profile!
            </p>
            <button
              className="bg-blue-200 font-semibold m-12 p-2 border border-solid border-black rounded
              hover:bg-green-400 hover:font-bold"
            >
              <Link
                href={{
                  pathname: "/AccountSettings",
                  query: {
                    type: "create",
                  },
                }}
              >
                Setup Profile
              </Link>
            </button>
          </>
        )}

        {/* <div className="flex flex-col pl-20 border p-12">
          <div>Status: {status}</div>
          <div>{JSON.stringify(session, null, 1)}</div>
          <div>Name: {session.user.name}</div>
          <div>Email: {session.user.email}</div>
          <div>Image: {session.user.image}</div>
          <div>Expires: {session.expires}</div>
        </div> */}
      </Layout>
    </div>
  );
}

// export async function getServerSideProps() {
//   try {
//     await clientPromise;

//     return {
//       props: {
//         isConnected: true,
//       },
//     };
//   } catch (e) {
//     console.error("error: ", e);
//     return {
//       props: {
//         isConnected: false,
//       },
//     };
//   }
// }
