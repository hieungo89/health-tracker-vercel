import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
// import { getServerAuthSession } from "./api/auth/[...nextauth]";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useFormatter } from "next-intl";
import Link from "next/link";
import { Setting } from "../components/Icons";
import MealData from "./data/mealData";
import SEW from "./data/sew";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [age, setAge] = useState("");
  const [sewData, setSewData] = useState(false);
  const [mealsData, setMealsData] = useState(false);

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

  if (status === "loading") return <Layout>...Loading</Layout>;
  if (status === "unauthenticated") router.push("/");
  if (!userProfile) router.push("/");

  if (userProfile.firstName)
    return (
      <>
        <Head>
          <title>HT - Profile</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout className="flex flex-col items-center">
          {/* //! Profile Photo, Name, Email, Age, Height, Settings */}
          <div className="flex justify-center">
            <div className="w-40 h-auto mr-6">
              <img
                src={userProfile.image}
                alt="profile"
                className="w-full h-full border border-white rounded-full"
              />
            </div>

            <div className="flex flex-col">
              <div>
                Name: {userProfile.firstName} {userProfile.lastName}
              </div>
              <div className="py-4">Email: {userProfile.email}</div>
              <div className="pb-4">Age: {age}</div>
              <div>
                Height: {userProfile.height.height_ft}ft.{" "}
                {userProfile.height.height_in}in.
              </div>
            </div>

            <Link
              href={{
                pathname: "/AccountSettings",
                query: {
                  type: "update",
                },
              }}
            >
              <Setting className="p-0.5 ml-4" />
            </Link>
          </div>

          {/* //! Dietary & Health */}
          <div className="flex p-2 my-12 w-full min-h-[8rem] max-w-4xl border rounded">
            <div className="w-1/3 pl-2">
              <span className="text-2xl font-semibold">
                Your Dietary Goals:&nbsp;
              </span>
              {userProfile?.dietaryGoals?.map((goal) => {
                return (
                  <li key={goal} className="pl-2">
                    {goal}
                  </li>
                );
              })}
            </div>
            <div className="w-2/3 pl-4">
              <div className="">
                <span className="text-2xl font-semibold pr-4">
                  Current Dietary Restrictions:&nbsp;
                </span>
                {userProfile.dietaryRestrictions
                  ? userProfile.dietaryRestrictions
                  : "none"}
              </div>
              <div className="">
                <span className="text-2xl font-semibold pr-4">
                  Health Complications:&nbsp;
                </span>
                {userProfile.healthComplications}
              </div>
            </div>
          </div>

          <div className="flex px-4 justify-around">
            {/*//! Input Data Section */}
            <div className="flex flex-col items-center p-4">
              <span className="text-xl font-bold uppercase underline">
                Input data
              </span>
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

            {/*//! Show Data Section */}
            <div className="flex flex-col items-center p-4">
              <span className="text-xl font-bold uppercase underline">
                View my Progress
              </span>
              <Button
                className="m-4 hover:text-black hover:bg-green-500"
                onPress={() => {
                  setMealsData(false);
                  setSewData(!sewData);
                }}
              >
                Sleep/Exercise/Weight
              </Button>
              <Button
                className="m-4 hover:text-black hover:bg-green-500"
                onPress={() => {
                  setSewData(false);
                  setMealsData(!mealsData);
                }}
              >
                Meals
              </Button>
            </div>
          </div>

          <div className="w-screen">
            {sewData ? <SEW /> : null}
            {mealsData ? <MealData /> : null}
          </div>
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
