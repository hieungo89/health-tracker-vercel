import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
// import { getServerAuthSession } from "./api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useFormatter } from "next-intl";
import Link from "next/link";
import SEW from "./data/sew";
import { Button } from "@nextui-org/react";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [sewData, setSewData] = useState(false);
  const [age, setAge] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();
  const format = useFormatter();

  const getData = async () => {
    const { data } = await axios.get(`/api/user?email=${session?.user.email}`);
    setUserProfile(data);
    setAge(data.birthday);
  };

  const date = () => {
    const dateTime = userProfile.birthday;
    const now = new Date().toISOString();
    const formatted = format.relativeTime(dateTime, now).replace("ago", "old");
    setAge(formatted);
  };

  useEffect(() => {
    if (!session) return;
    getData();
  }, [session]);

  useEffect(() => {
    if (!age) return;
    date();
  }, [age]);

  if (status === "loading") {
    return <Layout>...Loading</Layout>;
  }

  if (status === "unauthenticated") router.push("/");

  return (
    <>
      <Head>
        <title>Health Tracker - Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div>
          <div className="flex justify-center items start">
            <div className="rounded border w-32 h-32 mr-6">
              <img
                src={userProfile.image}
                alt="profile"
                className="w-full h-full"
              />
            </div>

            <div className="flex flex-col">
              <div>
                Name: {userProfile.firstName} {userProfile.lastName}
              </div>
              <div className="py-4">Email: {userProfile.email}</div>
              <div>Age: {age}</div>
            </div>
          </div>

          <div className="grid grid-cols-4 my-12">
            <div className="col-span-4">
              <span className="text-2xl">Your Dietary Goals:&nbsp;</span>
              {userProfile.dietaryGoals}
            </div>
            <div className="col-span-2">
              <span className="text-2xl">
                Current Dietary Restrictions:&nbsp;
              </span>
              {userProfile.dietaryRestrictions
                ? userProfile.dietaryRestrictions
                : "none"}
            </div>
            <div className="col-span-2">
              <span className="text-2xl">Health Complications:&nbsp;</span>
              {userProfile.healthComplications}
            </div>
          </div>
        </div>

        <div className="flex border rounded px-4 justify-around">
          {/* Input Data */}
          <div className="flex flex-col items-center p-4">
            Input data
            <Link href="/data/addHealthData">
              <Button className="m-4 hover:text-black hover:bg-green-500 ">
                Input Wellness Data
              </Button>
            </Link>
            <Link href="/data/addMealData">
              <Button className="m-4 hover:text-black hover:bg-green-500">
                Input Meals
              </Button>
            </Link>
          </div>

          {/* Show Data */}
          <div className="flex flex-col items-center p-4">
            View my Progress
            <Button
              className="m-4 hover:text-black hover:bg-green-500"
              onPress={() => setSewData(!sewData)}
            >
              Sleep/Exercise/Weight
            </Button>
            <Button className="m-4 hover:text-black hover:bg-green-500">
              Meals
            </Button>
          </div>
        </div>

        {sewData ? <SEW /> : null}
      </Layout>
    </>
  );
};

export default Profile;

// export async function getServerSideProps(ctx) {
//   const session = await getServerAuthSession(ctx.req, ctx.res);

//   const data = await axios.get(`/api/user?email=${session?.user.email}`);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       user: session.user,
//     },
//   };
// }
