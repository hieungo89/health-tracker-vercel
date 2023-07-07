// import clientPromise from "../lib/mongodb";
import Head from "next/head";
import Layout from "../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleUsernameEntry = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;

    axios.get(`/api/user?username=${username}`).then((response) => {
      if (response.data) {
        router.push({
          pathname: `/profile/`,
          query: { username },
        });
      } else {
        alert(
          `
          No account under that username.

          Please try again or Create a new account.
          `
        );
      }
    });
  };

  if (!session) {
    return (
      <div className="bg-blue-300 flex flex-col justify-center items-center min-h-screen pb-40">
        <h1 className="font-semibold text-6xl">Health Tracker</h1>
        <p className="text-lg mx-60 py-20">
          Welcome to the Health Tracker web app. This device will help you track
          your meals, weight, exercise, and sleep with quick and easy features.
        </p>
        <p className="font-semibold text-2xl pb-2">TO GET STARTED</p>
        <button
          className="text-4xl border border-solid rounded self-center py-2 px-4 bg-blue-400
          hover:border-black hover:bg-green-500"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Health Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className="p-2 w-screen min-h-screen flex flex-col items-center">
        <h1 className="text-6xl py-12">Health Tracker</h1>

        {/* {isConnected ? (
          <h2 className="">You are connected to MongoDB</h2>
        ) : (
          <h2 className="">
            You are NOT connected to MongoDB. Check the <code>README.md</code>
            for instructions.
          </h2>
        )} */}

        <div className="flex flex-col pt-20">
          <h2 className="self-center py-4">Welcome to Health Tracker!</h2>

          <form
            onSubmit={(e) => handleUsernameEntry(e)}
            className="flex flex-col justify-center items-center"
          >
            <label htmlFor="username" className="py-4">
              Please Enter your Username or create an account:&nbsp;
            </label>
            <div>
              <input
                type="text"
                name="username"
                size="25"
                maxLength="25"
                placeholder="username"
                required
                className="bg-blue-100"
              />
              <button
                type="submit"
                className="font-semibold border border-solid border-black px-2 ml-2 rounded
                hover:bg-green-400 hover:font-bold"
              >
                GO!
              </button>

              <div>Status: {status}</div>
              <div>{JSON.stringify(session, null, 1)}</div>
            </div>
          </form>
        </div>

        <div className="">
          <button className="bg-blue-200 font-semibold m-12 p-2 border border-solid border-black rounded hover:bg-green-400 hover:font-bold">
            <Link href="/profile">Go To Profile</Link>
          </button>

          <button
            className="bg-blue-200 font-semibold m-12 p-2 border border-solid border-black rounded
          hover:bg-green-400 hover:font-bold"
          >
            <Link href="/AccountCreation">Create Account</Link>
          </button>
        </div>
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
