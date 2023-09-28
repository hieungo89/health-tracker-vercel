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

  return (
    <div>
      <Head>
        <title>Health Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session ? <SplashPage /> : <SplashPage user={account} />}
    </div>
  );
}
