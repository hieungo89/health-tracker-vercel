import clientPromise from "../lib/mongodb";
import Head from "next/head";
import Layout from "../components/Layout";
import { useEffect } from "react";
// import getServerSideProps from "./api/index";

export default function Home({ isConnected }) {
  // let data = (async () => {
  //   const result = await getServerSideProps();
  //   return result;
  // })();
  // let result = getServerSideProps;
  // result = result.then((data) => {
  //   return data;
  // });

  // useEffect(() => {
  //   console.log(data.isConnected);
  // }, []);

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
  try {
    const client = await clientPromise;
    // const db = client.db("test");
    // const collection = db.collection("users");
    // const user = await collection.find({}).toArray();
    // console.log(user);

    return {
      props: {
        isConnected: true,
        // user: JSON.parse(JSON.stringify(user)),
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
