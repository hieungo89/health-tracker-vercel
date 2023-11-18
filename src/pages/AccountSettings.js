import EditProfile from "@components/EditProfile";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";

const AccountCreation = ({ type }) => {
  const [option, setOption] = useState("");
  const [userProfile, setUserProfile] = useState({});

  const { data: session } = useSession();
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
      .then(() => router.push("/profile"))
      .catch((error) => console.log(error));
  };

  const getUserData = useCallback(async () => {
    const { data } = await axios.get(`/api/user?email=${session?.user.email}`);
    setUserProfile(data);
  }, [session]);

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
  }, [getUserData, type]);

  //! Redirect back to profile if user refreshes page
  if (userProfile === "") router.push("/profile");

  //! New Account Profile Setup
  if (session && option === "create")
    return (
      <EditProfile
        name="Create Account"
        content="New users need to create an account with all the info provided."
        handleSubmit={(e) => handleSubmit(e)}
      />
    );

  //! Update User Profile
  if (session && option === "update" && userProfile.googleName)
    return (
      <EditProfile
        name="Update Account"
        content="Current user can update their account info."
        profile={userProfile}
        handleChange={(e) => handleChange(e)}
        handleSubmit={(e) => handleSubmit(e)}
      />
    );
};

export default AccountCreation;

export async function getServerSideProps(ctx) {
  return {
    props: {
      type: ctx.query.type || null, //pass it to the page props
    },
  };
}
