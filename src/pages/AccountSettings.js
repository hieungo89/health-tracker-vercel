import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const AccountCreation = ({ type }) => {
  const [option, setOption] = useState("");
  const [userProfile, setUserProfile] = useState({});

  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const goals = [];
    for (let i = 1; i <= 3; i++) {
      if (e.target[`dietaryGoals` + i].value) {
        goals.push(e.target[`dietaryGoals` + i].value);
      }
    }

    const data = {
      googleName: session.user.name,
      email: session.user.email,
      image: session.user.image,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      birthday: e.target.birthday.value,
      height_ft: e.target.height_ft.value,
      height_in: e.target.height_in.value,
      dietaryGoals: goals,
      dietaryRestrictions: e.target.dietaryRestrictions.value,
      healthComplications: e.target.healthComplications.value,
    };

    axios
      .post("./api/user", data)
      .then(() => router.push("/"))
      .catch((error) => console.log(error));
  };

  const getUserData = async () => {
    const { data } = await axios.get(`/api/user?email=${session?.user.email}`);
    setUserProfile(data);
  };

  // TODO: Future update: convert onChange to use less event listener
  const handleChange = (e) => {
    const name = e.target.name;
    const profile = { ...userProfile };

    if (name.includes("height")) {
      profile.height[name] = e.target.value;
    } else if (name.includes("dietaryGoals")) {
      profile.dietaryGoals[name[name.length - 1] - 1] = e.target.value;
    } else {
      profile[name] = e.target.value;
    }

    setUserProfile(profile);
  };

  useEffect(() => {
    if (type) setOption(type);
    if (type === "update") getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") return <Layout>...Loading</Layout>;
  if (status === "unauthenticated") router.push("/");

  //! Redirect back to profile if user refreshes page
  if (userProfile === "") router.push("/profile");

  //! New Account Profile Setup
  if (session && option === "create") {
    return (
      <>
        <Head>
          <title>HT - create account</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout className="flex flex-col items-center">
          <div className="w-fit">
            <h1
              className=" text-5xl pb-10 text-center underline
              md:text-4xl sm:text-3xl sm:pb-4 xs:text-2xl"
            >
              New User Profile Creation
            </h1>

            <h5>Please fill these fields to get started.</h5>
            <p>Fields with * are required</p>

            <form className="" onSubmit={(e) => handleSubmit(e)}>
              {/* Name */}
              <div
                className="grid grid-cols-2 justify-around py-4
                md:text-sm sm:grid-cols-1"
              >
                <label className="col-span-1" htmlFor="firstName">
                  *First Name:&nbsp;
                  <input
                    className="px-2 bg-blue-100"
                    type="text"
                    name="firstName"
                    placeholder="first name"
                    required
                  />
                </label>
                <label className="col-span-1 sm:my-2" htmlFor="lastName">
                  *Last Name:&nbsp;
                  <input
                    className="px-2 bg-blue-100"
                    type="text"
                    name="lastName"
                    placeholder="last name"
                    required
                  />
                </label>
              </div>
              <div
                className="grid grid-cols-2 pb-4
                md:text-sm sm:grid-cols-1"
              >
                {/* Birthday */}
                <label className="col-span-1" htmlFor="birthday">
                  *Birthday:&nbsp;
                  <input
                    className="px-2 text-center bg-blue-100"
                    type="date"
                    name="birthday"
                    required
                  />
                </label>
                {/* Height */}
                <div className="col-span-1 sm:my-2">
                  <span>*Height:&nbsp;</span>
                  <input
                    className="text-center mr-1 bg-blue-100"
                    type="number"
                    min="1"
                    max="10"
                    name="height_ft"
                    placeholder="5"
                    required
                  />
                  <label htmlFor="height_ft">ft. </label>
                  <input
                    className="text-center mr-1 bg-blue-100"
                    type="number"
                    min="0"
                    max="11"
                    name="height_in"
                    placeholder="0"
                    required
                  />
                  <label htmlFor="height_in">in.</label>
                </div>
              </div>
              <div className="flex flex-col md:text-sm">
                {/* Dietary Goals */}
                <label htmlFor="dietaryGoals">*Dietary Goals:</label>
                <ol className="flex sm:flex-col">
                  <li className="mr-8">
                    <input
                      className="p-2 bg-blue-100 md:text-sm"
                      type="text"
                      rows="4"
                      cols="40"
                      name="dietaryGoals1"
                      placeholder="Goal 1"
                      required
                    />
                  </li>
                  <li className="mr-8">
                    <input
                      className="p-2 bg-blue-100 md:text-sm"
                      type="text"
                      rows="4"
                      cols="40"
                      name="dietaryGoals2"
                      placeholder="(Optional)"
                    />
                  </li>
                  <li>
                    <input
                      className="p-2 bg-blue-100 md:text-sm"
                      type="text"
                      rows="4"
                      cols="40"
                      name="dietaryGoals3"
                      placeholder="(Optional)"
                    />
                  </li>
                </ol>
                {/* Dietary Restrictions */}
                <label htmlFor="dietaryRestrictions">
                  Dietary Restrictions (<em>optional</em>):
                </label>
                <textarea
                  className="p-2 bg-blue-100"
                  type="textbox"
                  rows="4"
                  cols="40"
                  name="dietaryRestrictions"
                />
                {/* Health Complications */}
                <label htmlFor="healthComplications">
                  Health Complications (<em>optional</em>):
                </label>
                <textarea
                  className="p-2 bg-blue-100"
                  type="textbox"
                  rows="4"
                  cols="40"
                  name="healthComplications"
                />
              </div>
              <div className="flex">
                <input
                  className="bg-blue-200 font-semibold border border-solid border-white p-2 my-4 rounded
                hover:bg-green-500 hover:border-black sm:text-sm"
                  type="submit"
                  value="Submit Profile"
                />
                <Link
                  href="/"
                  className="bg-blue-200 font-semibold ml-4 border border-solid border-white p-2 my-4 rounded
                hover:bg-red-500 hover:border-black sm:text-sm"
                >
                  Go Back
                </Link>
              </div>
            </form>
          </div>
        </Layout>
      </>
    );
  }

  //! Update User Profile
  if (session && option === "update" && userProfile.googleName) {
    return (
      <>
        <Head>
          <title>HT - update account</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout className="flex flex-col items-center">
          <div className="w-fit sm:text-sm">
            <h1
              className="text-5xl pb-10 text-center underline
              md:text-4xl sm:pb-4 sm:text-3xl"
            >
              Update Profile
            </h1>

            <h5>You can update any of these fields.</h5>
            <p>Fields with * are required</p>

            <form className="" onSubmit={(e) => handleSubmit(e)}>
              {/* Name */}
              <div
                className="grid grid-cols-2 justify-around py-4
                md:text-sm sm:grid-cols-1"
              >
                <label className="col-span-1" htmlFor="firstName">
                  *First Name:&nbsp;
                  <input
                    className="px-2 bg-blue-100"
                    type="text"
                    name="firstName"
                    placeholder="first name"
                    value={userProfile?.firstName}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </label>
                <label className="col-span-1 sm:my-2" htmlFor="lastName">
                  *Last Name:&nbsp;
                  <input
                    className="px-2 bg-blue-100"
                    type="text"
                    name="lastName"
                    placeholder="last name"
                    value={userProfile?.lastName}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </label>
              </div>
              <div
                className="grid grid-cols-2 pb-4
                md:text-sm sm:grid-cols-1"
              >
                {/* Birthday */}
                <label className="col-span-1" htmlFor="birthday">
                  *Birthday:&nbsp;
                  <input
                    className="px-2 text-center bg-blue-100"
                    type="date"
                    name="birthday"
                    value={userProfile?.birthday?.slice(0, 10)}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </label>
                {/* Height */}
                <div className="col-span-1 sm:my-2">
                  <span>*Height:&nbsp;</span>
                  <input
                    className="text-center mr-1 bg-blue-100"
                    type="number"
                    min="1"
                    max="10"
                    name="height_ft"
                    placeholder="5"
                    value={userProfile?.height?.height_ft}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <label htmlFor="height_ft">ft. </label>
                  <input
                    className="text-center mr-1 bg-blue-100"
                    type="number"
                    min="0"
                    max="11"
                    name="height_in"
                    placeholder="0"
                    value={userProfile?.height?.height_in}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <label htmlFor="height_in">in.</label>
                </div>
              </div>
              <div className="flex flex-col md:text-sm">
                {/* Dietary Goals */}
                <label htmlFor="dietaryGoals">*Dietary Goals:</label>
                <ol className="flex sm:flex-col">
                  <li className="mr-8">
                    <input
                      className="p-2 bg-blue-100 md:text-sm"
                      type="text"
                      rows="4"
                      cols="40"
                      name="dietaryGoals1"
                      placeholder="Goal 1"
                      value={userProfile?.dietaryGoals[0]}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </li>
                  <li className="mr-8">
                    <input
                      className="p-2 bg-blue-100 md:text-sm"
                      type="text"
                      rows="4"
                      cols="40"
                      name="dietaryGoals2"
                      placeholder="(Optional)"
                      value={userProfile?.dietaryGoals[1]}
                      onChange={(e) => handleChange(e)}
                    />
                  </li>
                  <li>
                    <input
                      className="p-2 bg-blue-100 md:text-sm"
                      type="text"
                      rows="4"
                      cols="40"
                      name="dietaryGoals3"
                      placeholder="(Optional)"
                      value={userProfile?.dietaryGoals[2]}
                      onChange={(e) => handleChange(e)}
                    />
                  </li>
                </ol>
                {/* Dietary Restrictions */}
                <label htmlFor="dietaryRestrictions">
                  Dietary Restrictions (<em>optional</em>):
                </label>
                <textarea
                  className="p-2 bg-blue-100"
                  type="textbox"
                  rows="4"
                  cols="40"
                  name="dietaryRestrictions"
                  value={userProfile.dietaryRestrictions}
                  onChange={(e) => handleChange(e)}
                />
                {/* Health Complications */}
                <label htmlFor="healthComplications">
                  Health Complications (<em>optional</em>):
                </label>
                <textarea
                  className="p-2 bg-blue-100"
                  type="textbox"
                  rows="4"
                  cols="40"
                  name="healthComplications"
                  value={userProfile.healthComplications}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex">
                <input
                  className="bg-blue-200 font-semibold border border-solid border-white p-2 my-4 rounded
                hover:bg-green-500 hover:border-black sm:text-sm"
                  type="submit"
                  value="Submit Profile"
                />
                <Link
                  href="/"
                  className="bg-blue-200 font-semibold ml-4 border border-solid border-white p-2 my-4 rounded
                hover:bg-red-500 hover:border-black sm:text-sm"
                >
                  Go Back
                </Link>
              </div>
            </form>
          </div>
        </Layout>
      </>
    );
  }
};

export default AccountCreation;

export async function getServerSideProps(ctx) {
  return {
    props: {
      type: ctx.query.type || null, //pass it to the page props
    },
  };
}
