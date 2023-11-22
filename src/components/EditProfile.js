import { LinkButton, SubmitButton } from "@components/Button";
import Layout from "@components/Layout";
import Head from "next/head";

const EditProfile = ({
  name,
  content,
  profile,
  handleChange,
  handleSubmit,
}) => {
  return (
    <>
      <Head>
        <title>HT - {name}</title>
        <meta name={name} content={content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className="flex flex-col items-center">
        <div className="w-fit">
          <h1 className="text-5xl pb-10 text-center underline md:text-4xl sm:text-3xl sm:pb-4 xs:text-2xl">
            {profile ? "Update Profile" : "New User Profile Creation"}
          </h1>

          <h5>
            {profile
              ? "You can update any of these fields."
              : "Please fill these fields to get started."}
          </h5>
          <p>Fields with * are required</p>

          <form className="" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="grid grid-cols-2 justify-around py-4 md:text-sm sm:grid-cols-1">
              <label className="col-span-1" htmlFor="firstName">
                *First Name:
                <input
                  className="mx-1 px-[1rem] bg-grey-80"
                  type="text"
                  name="firstName"
                  placeholder="first name"
                  value={profile && profile.firstName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="col-span-1 sm:my-2" htmlFor="lastName">
                *Last Name:
                <input
                  className="mx-1 px-[1rem] bg-grey-80"
                  type="text"
                  name="lastName"
                  placeholder="last name"
                  value={profile && profile.lastName}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="grid grid-cols-2 pb-4 md:text-sm sm:grid-cols-1">
              {/* Birthday */}
              <label className="col-span-1" htmlFor="birthday">
                *Birthday:
                <input
                  className="mx-1 px-[1rem] text-center bg-grey-80"
                  type="date"
                  name="birthday"
                  value={profile && profile.birthday?.slice(0, 10)}
                  onChange={handleChange}
                  max={new Date().toISOString().slice(0, 10)}
                  required
                />
              </label>
              {/* Height */}
              <div className="col-span-1 sm:my-2">
                <span>*Height:</span>
                <input
                  className="mx-1 pl-[1rem] text-center bg-grey-80"
                  type="number"
                  min="1"
                  max="10"
                  name="height_ft"
                  placeholder="5"
                  value={profile && profile.height?.height_ft}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="height_ft">ft. </label>
                <input
                  className="mx-1 pl-[1rem] text-center bg-grey-80"
                  type="number"
                  min="0"
                  max="11"
                  name="height_in"
                  placeholder="0"
                  value={profile && profile.height?.height_in}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="height_in">in.</label>
              </div>
            </div>
            <div className="flex flex-col md:text-sm">
              {/* Dietary Goals */}
              <label htmlFor="dietaryGoals">*Dietary Goals:</label>
              <ol className="flex sm:flex-col justify-between mr-0">
                <li>
                  <input
                    className="bg-grey-80 md:text-sm"
                    type="text"
                    name="dietaryGoals1"
                    placeholder="Goal 1"
                    value={profile && profile.dietaryGoals[0]}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <input
                    className="bg-grey-80 md:text-sm"
                    type="text"
                    name="dietaryGoals2"
                    placeholder="(Optional)"
                    value={profile && profile.dietaryGoals[1]}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <input
                    className="bg-grey-80 md:text-sm"
                    type="text"
                    name="dietaryGoals3"
                    placeholder="(Optional)"
                    value={profile && profile.dietaryGoals[2]}
                    onChange={handleChange}
                  />
                </li>
              </ol>
              {/* Dietary Restrictions */}
              <label htmlFor="dietaryRestrictions">
                Dietary Restrictions (<em>optional</em>):
              </label>
              <textarea
                className="p-2 bg-grey-80 md:text-sm"
                type="textbox"
                rows="4"
                cols="40"
                name="dietaryRestrictions"
                value={profile && profile.dietaryRestrictions}
                onChange={handleChange}
              />
              {/* Health Complications */}
              <label htmlFor="healthComplications">
                Health Complications (<em>optional</em>):
              </label>
              <textarea
                className="p-2 bg-grey-80 md:text-sm"
                type="textbox"
                rows="4"
                cols="40"
                name="healthComplications"
                value={profile && profile.healthComplications}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between mt-3">
              <LinkButton text="Return" href="/profile" />
              <SubmitButton text="Save" />
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default EditProfile;
