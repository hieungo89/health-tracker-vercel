import clientPromise from "../lib/mongodb";
import Head from "next/head";
import Layout from "../components/Layout";
import axios from "axios";
import { useState } from "react";
// import { useRouter } from "next/router";
import Link from "next/link";

export default function Home({ isConnected }) {
  const [user, setUser] = useState("");
  // const router = useRouter();

  const handleUsernameEntry = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;

    axios.get(`/api/user?username=${username}`).then((response) => {
      if (response.data.length > 0) {
        setUser(response.data[0].username);
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

  return (
    <div>
      <Head>
        <title>Health Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className="p-2 w-screen min-h-screen flex flex-col items-center">
        <h1 className="text-6xl py-12">Health Tracker App</h1>

        {isConnected ? (
          <h2 className="">You are connected to MongoDB</h2>
        ) : (
          <h2 className="">
            You are NOT connected to MongoDB. Check the <code>README.md</code>
            for instructions.
          </h2>
        )}

        <div className="flex flex-col pt-20">
          <h2 className="self-center py-4">
            Welcome to DASHING Health Tracker!
          </h2>

          <h3 className="py-4">Current user: {user ? user : "none"}</h3>

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
            </div>
          </form>
        </div>

        {/* <button className="bg-blue-200 font-semibold m-12 p-2 border border-solid border-black rounded hover:bg-green-400 hover:font-bold">
          <Link href="/">Sign In</Link>
        </button> */}

        <button
          className="bg-blue-200 font-semibold m-12 p-2 border border-solid border-black rounded
        hover:bg-green-400 hover:font-bold"
        >
          <Link href="/AccountCreation">Create Account</Link>
        </button>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    await clientPromise;

    return {
      props: {
        isConnected: true,
      },
    };
  } catch (e) {
    console.error("error: ", e);
    return {
      props: {
        isConnected: false,
      },
    };
  }
}
