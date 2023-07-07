import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { getServerAuthSession } from "../api/auth/[...nextauth]";

const Profile = ({ user }) => {
  const [userProfile, setUserProfile] = useState({});
  const router = useRouter();
  const { username } = router.query;

  useEffect(() => {
    axios
      .get(`/api/user?username=${router.query.username}`)
      .then((response) => {
        setUserProfile(response.data);
      });
  }, [username]);

  if (!userProfile) {
    return <div>...Loading</div>;
  }

  return (
    <>
      <Head>
        <title>Health Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen h-screen">
        <Layout>
          <div>
            {userProfile.firstName} {userProfile.lastName}
            {JSON.stringify(user, null, 2)}
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Profile;

export async function getServerSideProps(ctx) {
  const session = await getServerAuthSession(ctx.req, ctx.res);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}

Profile.auth = true;
