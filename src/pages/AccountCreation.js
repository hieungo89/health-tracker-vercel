import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const AccountCreation = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      age: e.target.age.value,
      birthday: e.target.birthday.value,
      height_ft: e.target.height_ft.value,
      height_in: e.target.height_in.value,
      dietary_goals: e.target.dietary_goals.value,
      dietary_restrictions: e.target.dietary_restrictions.value,
      health_complications: e.target.health_complications.value,
    };

    axios
      .post("./api/user", data)
      .then((response) => router.push("/"))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Head>
        <title>HT - create account</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main>
        <Layout className="flex flex-col">
          <h1 className="self-center text-5xl pb-20">Account Creation</h1>

          <h5>Please fill these fields to get started.</h5>
          <p>Fields with * are required</p>

          <form className="" onSubmit={(e) => handleSubmit(e)}>
            {/* Name */}
            <div className="grid grid-cols-3 justify-around py-4">
              <label className="col-span-1">
                *username:&nbsp;
                <input
                  className="px-2 bg-blue-100"
                  type="text"
                  name="username"
                  placeholder="username"
                  required
                />
              </label>
              <label className="col-span-1">
                *First Name:&nbsp;
                <input
                  className="px-2 bg-blue-100"
                  type="text"
                  name="firstName"
                  placeholder="first name"
                  required
                />
              </label>
              <label className="col-span-1">
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
              {/* Age */}
              <label className="col-span-1">
                *Age:&nbsp;
                <input
                  className="px-2 text-end bg-blue-100"
                  type="number"
                  name="age"
                  min="1"
                  max="100"
                  placeholder="1"
                  required
                />
                years old
              </label>
              {/* Birthday */}
              <label className="col-span-1">
                *Birthday:&nbsp;
                <input
                  className="px-2 text-end bg-blue-100"
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
                  placeholder="1"
                  required
                />
                <label className="">ft. </label>
                <input
                  className="text-end bg-blue-100"
                  type="number"
                  min="0"
                  max="11"
                  name="height_in"
                  placeholder="0"
                  required
                />
                <label className="">in.</label>
              </div>
            </div>
            <div className="flex flex-col">
              {/* Dietary Goals */}
              <label>*Dietary Goals:</label>
              <textarea
                className="p-2 bg-blue-100"
                type="text"
                rows="4"
                cols="40"
                name="dietary_goals"
                required
              />
              {/* Dietary Restrictions */}
              <label>
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
              <label>
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
            <input
              className="bg-blue-200 border border-solid border-white p-2 my-4 rounded
              hover:bg-green-400 hover:border-black"
              type="submit"
              value="CREATE PROFILE"
            />
          </form>

          <Link
            href="/"
            className="my-16 border border-solid border-white p-2 w-fit rounded hover:bg-green-400 hover:border-black"
          >
            Return to Home
          </Link>
        </Layout>
      </main>
    </>
  );
};

export default AccountCreation;
