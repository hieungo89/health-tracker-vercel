import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";

const AccountCreation = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      googleName: session.user.name,
      email: session.user.email,
      image: session.user.image,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      birthday: e.target.birthday.value,
      height_ft: e.target.height_ft.value,
      height_in: e.target.height_in.value,
      dietary_goals: e.target.dietary_goals.value,
      dietary_restrictions: e.target.dietary_restrictions.value,
      health_complications: e.target.health_complications.value,
    };

    axios
      .post("./api/user", data)
      .then(() => router.push("/"))
      .catch((error) => console.log(error));
  };

  if (status === "loading") {
    return <Layout>...Loading</Layout>;
  }

  if (status === "unauthenticated") router.push("/");

  if (session) {
    return (
      <>
        <Head>
          <title>HT - create account</title>
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>

        <Layout className="flex flex-col items-center">
          <div className="w-fit">
            <h1 className=" text-5xl pb-20 text-center">
              New User Profile Creation
            </h1>

            <h5>Please fill these fields to get started.</h5>
            <p>Fields with * are required</p>

            <form className="" onSubmit={(e) => handleSubmit(e)}>
              {/* Name */}
              <div className="grid grid-cols-3 justify-around py-4">
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
                <label className="col-span-1" htmlFor="lastName">
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
              <div className="grid grid-cols-3 pb-4">
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
                <div className="col-span-1">
                  <span>*Height:&nbsp;</span>
                  <input
                    className="text-end bg-blue-100"
                    type="number"
                    min="1"
                    max="10"
                    name="height_ft"
                    placeholder="5"
                    required
                  />
                  <label htmlFor="height_ft">ft. </label>
                  <input
                    className="text-end bg-blue-100"
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
              <div className="flex flex-col">
                {/* Dietary Goals */}
                <label htmlFor="dietary_goals">*Dietary Goals:</label>
                <textarea
                  className="p-2 bg-blue-100"
                  type="text"
                  rows="4"
                  cols="40"
                  name="dietary_goals"
                  required
                />
                {/* Dietary Restrictions */}
                <label htmlFor="dietary_restrictions">
                  Dietary Restrictions (<em>optional</em>):
                </label>
                <textarea
                  className="p-2 bg-blue-100"
                  type="textbox"
                  rows="4"
                  cols="40"
                  name="dietary_restrictions"
                />
                {/* Health Complications */}
                <label htmlFor="health_complications">
                  Health Complications (<em>optional</em>):
                </label>
                <textarea
                  className="p-2 bg-blue-100"
                  type="textbox"
                  rows="4"
                  cols="40"
                  name="health_complications"
                />
              </div>
              <div className="flex">
                <input
                  className="bg-blue-200 border border-solid border-white p-2 my-4 rounded
                hover:bg-green-500 hover:border-black"
                  type="submit"
                  value="Submit Profile"
                />
                <Link
                  href="/"
                  className="bg-blue-200 ml-4 border border-solid border-white p-2 my-4 rounded
                hover:bg-red-500 hover:border-black"
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
