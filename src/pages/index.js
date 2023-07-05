import clientPromise from "/src/lib/mongodb";
import Head from "next/head";
import Layout from "@components/Layout";
import axios from "axios";
import { useState } from "react";

export default function Home({ isConnected }) {
  const [user, setUser] = useState("");

  const handleUsernameEntry = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    await axios.post("/api/user", { username });
    await setUser(username);
  };

  return (
    <div className="">
      <Head>
        <title>Health Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-2">
        <Layout>
          <h1 className="title">Health Tracker App</h1>
        </Layout>

        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>
            for instructions.
          </h2>
        )}

        <div className="pt-20">
          <h2>Welcome to DASHING Health Tracker!</h2>
          <h3>Current user: {user}</h3>
          <form onSubmit={(e) => handleUsernameEntry(e)}>
            <label className="">Please Enter your Username:&nbsp;</label>
            <input
              type="text"
              name="username"
              size="25"
              maxLength="25"
              placeholder="username"
              required
            />
            <button type="submit" className="">
              GO!
            </button>
          </form>
        </div>
      </main>
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
