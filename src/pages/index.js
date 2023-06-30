import Head from "next/head";
// import getServerSideProps from "./api/index";
import clientPromise from "../lib/mongodb";
import Layout from "../components/Layout";

export default function Home({ isConnected }) {
  return (
    <div className="container">
      <Head>
        <title>Health Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Layout>
          <h1 className="title">Health Tracker App</h1>
        </Layout>

        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
            for instructions.
          </h2>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;

  console.log("client ~ ", client);
  const isConnected = await client.isConnected();

  return {
    props: {
      isConnected,
    },
  };
}
