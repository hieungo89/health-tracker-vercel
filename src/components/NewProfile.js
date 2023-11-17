import Layout from "@components/Layout";
import Head from "next/head";
import Link from "next/link";

const NewProfile = ({ handleSubmit, NameField, GoalField, TextAreaField }) => {
  return (
    <>
      <Head>
        <title>HT - create account</title>
        <meta
          name="create account"
          content="New users need to create an account with all the info provided."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className="flex flex-col items-center">
        <div className="w-fit">
          <h1 className=" text-5xl pb-10 text-center underline md:text-4xl sm:text-3xl sm:pb-4 xs:text-2xl">
            New User Profile Creation
          </h1>

          <h5>Please fill these fields to get started.</h5>
          <p>Fields with * are required</p>

          <form className="" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="grid grid-cols-2 justify-around py-4 md:text-sm sm:grid-cols-1">
              <NameField label="firstName" text="First Name" />
              <NameField label="lastName" text="Last Name" />
            </div>
            <div className="grid grid-cols-2 pb-4md:text-sm sm:grid-cols-1">
              {/* Birthday */}
              <label className="col-span-1" htmlFor="birthday">
                *Birthday:
                <input
                  className="mx-1 px-3 text-center bg-blue-100"
                  type="date"
                  name="birthday"
                  max={new Date().toISOString().slice(0, 10)}
                  required
                />
              </label>
              {/* Height */}
              <div className="col-span-1 sm:my-2">
                <span>*Height:</span>
                <input
                  className="text-center mx-1 bg-blue-100"
                  type="number"
                  min="1"
                  max="10"
                  name="height_ft"
                  placeholder="5"
                  required
                />
                <label htmlFor="height_ft">ft. </label>
                <input
                  className="text-center mx-1 bg-blue-100"
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
                <GoalField name="dietaryGoals1" placeholder="Goal 1" required />
                <GoalField name="dietaryGoals2" placeholder="(Optional)" />
                <GoalField name="dietaryGoals3" placeholder="(Optional)" />
              </ol>
              {/* Dietary Restrictions */}
              <TextAreaField
                label="dietaryRestrictions"
                text="Dietary Restrictions"
              />
              {/* Health Complications */}
              <TextAreaField
                label="healthComplications"
                text="Health Complications"
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
};

export default NewProfile;
