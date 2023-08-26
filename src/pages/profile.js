import axios from "axios";
import { intervalToDuration, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Setting } from "../components/Icons";
import Layout from "../components/Layout";
import MealData from "./data/mealData";
import SEW from "./data/sew";
import { Popover, Card, Text } from "@nextui-org/react";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [age, setAge] = useState("");
  const [sewData, setSewData] = useState(false);
  const [mealsData, setMealsData] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const getData = async () => {
    const { data } = await axios.get(`/api/user?email=${session?.user.email}`);
    setUserProfile(data);
    setAge(data.birthday);
  };

  const date = () => {
    const birthday = parseISO(userProfile.birthday.slice(0, 10));

    const ageDifference = intervalToDuration({
      start: birthday,
      end: new Date(),
    });

    if (ageDifference.years > 1) {
      setAge(ageDifference.years + " years old");
    } else if (ageDifference.years === 1) {
      setAge(ageDifference.years + " year old");
    } else {
      if (ageDifference.months !== 1) {
        setAge(ageDifference.months + " months old");
      } else {
        setAge(ageDifference.months + " month old");
      }
    }
  };

  useEffect(() => {
    if (!session) return;
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (!age) return;
    date();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [age]);

  if (!userProfile) router.push("/");

  if (userProfile.firstName)
    return (
      <>
        <Head>
          <title>HT - Profile</title>
          <meta name="profile" content="A full display of the user profile." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout className="flex flex-col items-center">
          {/* //! Profile Photo, Name, Email, Age, Height, Settings */}
          <div className="flex w-full max-w-3xl">
            <div className="flex w-full justify-evenly sm:flex-col sm:items-center">
              <div className="w-32 h-32 mr-6 self-center md:w-28 md:h-28 sm:w-28 sm:h-28 sm:self-center sm:mb-2">
                <img
                  src={userProfile.image}
                  alt="profile"
                  className="w-full h-full border border-white rounded-full"
                />
              </div>

              <div className="flex flex-col sm:text-sm sm:pt-2">
                <div>
                  Name: {userProfile.firstName} {userProfile.lastName}
                </div>
                <div className="py-4 md:py-1">Email: {userProfile.email}</div>
                <div className="pb-4 md:py-1">Age: {age}</div>
                <div>
                  Height: {userProfile.height.height_ft}ft.{" "}
                  {userProfile.height.height_in}in.
                </div>
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
              <Setting className="p-0.5 ml-4 md:text-xl sm:text-base sm:p-0 sm:ml-0" />
            </Link>
          </div>

          {/* //! Dietary & Health */}
          <div className="flex p-2 my-12 w-full max-w-3xl sm:flex-col sm:items-center">
            <div className="w-1/3 sm:w-full">
              <Card>
                <Card.Header>
                  <span className="text-2xl font-semibold lg:text-xl md:text-base sm:text-sm">
                    Your Dietary Goals:
                  </span>
                </Card.Header>
                <Card.Divider />
                <Card.Body>
                  <ol>
                    {userProfile?.dietaryGoals?.map((goal) => {
                      return (
                        <li key={goal} className="md:text-sm sm:text-xs">
                          {goal}
                        </li>
                      );
                    })}
                  </ol>
                </Card.Body>
              </Card>
            </div>
            <div className="flex flex-col w-2/3 pl-2 sm:w-full sm:pl-0">
              <div className="sm:py-2">
                <Card>
                  <Card.Header>
                    <span className="text-2xl font-semibold pr-4 lg:text-xl md:text-base sm:text-sm">
                      Current Dietary Restrictions:&nbsp;
                    </span>
                  </Card.Header>
                  <Card.Divider />
                  <Card.Body>
                    <span className="md:text-sm sm:text-xs sm:py-1">
                      {userProfile.dietaryRestrictions
                        ? userProfile.dietaryRestrictions
                        : "none"}
                    </span>
                  </Card.Body>
                </Card>
              </div>
              <div className="pt-2 sm:pt-0">
                <Card>
                  <Card.Header>
                    <span className="text-2xl font-semibold pr-4 lg:text-xl md:text-base sm:text-sm">
                      Health Complications:
                    </span>
                  </Card.Header>
                  <Card.Divider />
                  <Card.Body>
                    <span className="md:text-sm sm:text-xs sm:py-1">
                      {userProfile.healthComplications}
                    </span>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>

          <div className="flex w-full max-w-3xl justify-between sm:flex-col">
            {/*//! Input Data Section */}
            <div className="flex flex-col items-center px-4 ">
              <span className="text-xl font-bold uppercase underline sm:text-base">
                Input data
              </span>
              <button
                className="w-full m-4 border-2 rounded-lg p-2 font-semibold bg-white/80
              hover:text-black hover:bg-green-500
              md:text-sm sm:text-xs"
              >
                <Link href="/data/addHealthData" className="text-black">
                  Input Wellness Data
                </Link>
              </button>
              <button
                className="w-full m-4 border-2 rounded-lg p-2 font-semibold bg-white/80
              hover:text-black hover:bg-green-500
              md:text-sm sm:text-xs"
              >
                <Link href="/data/addMealData" className="text-black">
                  Input Meals
                </Link>
              </button>
            </div>

            {/*//! Show Data Section */}
            <div className="flex flex-col items-center px-4 ">
              <span className="text-xl font-bold uppercase underline sm:text-base">
                View my Progress
              </span>
              <button
                className="w-full m-4 border-2 rounded-lg p-2 font-semibold bg-white/80 text-black
                hover:text-black hover:bg-green-500
                md:text-sm sm:text-xs"
                onClick={() => {
                  setMealsData(false);
                  setSewData(!sewData);
                }}
              >
                Sleep/Exercise/Weight
              </button>
              <button
                className="w-full m-4 border-2 rounded-lg p-2 font-semibold bg-white/80 text-black
                hover:text-black hover:bg-green-500
                md:text-sm sm:text-xs"
                onClick={() => {
                  setSewData(false);
                  setMealsData(!mealsData);
                }}
              >
                Meals
              </button>
            </div>
          </div>

          <div className="w-screen">
            {sewData && <SEW />}
            {mealsData && <MealData />}
          </div>
        </Layout>
      </>
    );
};

export default Profile;
