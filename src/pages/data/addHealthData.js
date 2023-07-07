import Head from "next/head";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const AddHealthData = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleDataInput = async (e) => {
    e.preventDefault();
    const data = {
      email: session.user.email,
      date: e.target.date.value,
      exercise: {
        exercise_hr: e.target.exercise_hr.value,
        exercise_min: e.target.exercise_min.value,
      },
      sleep: {
        sleep_hr: e.target.sleep_hr.value,
        sleep_min: e.target.sleep_min.value,
      },
      weight: {
        weightData: e.target.weight.value,
        weightTime: e.target.weight_time.value,
      },
    };

    await axios.post("/api/wellnessData", data);
    router.push("/profile");
  };

  if (status === "loading") {
    return <Layout>...Loading</Layout>;
  }

  if (status === "unauthenticated") router.push("/");

  return (
    <>
      <Head>
        <title>Health Tracker - Wellness</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className="flex flex-col items-center">
        <h1 className="text-4xl underline">Data Input</h1>

        <div className="my-4 p-4">
          <h4>Please fill out ALL fields in order to record your data.</h4>
          <li>
            Put 0's for any data you <b>don't</b> want to record
          </li>
          <br />
          <em>
            *Warning: Adding data on the same date will override the previous
            data.
          </em>
        </div>

        <form
          onSubmit={(e) => handleDataInput(e)}
          className="flex flex-col border rounded px-16 p-4"
        >
          <div className="grid grid-cols-2 py-4">
            <label>Select Date: </label>
            <input type="date" name="date" required className="text-center" />
          </div>
          <div className="grid grid-cols-2 py-4">
            <label>Exercise:</label>
            <div>
              <input
                type="number"
                min="0"
                max="23"
                name="exercise_hr"
                required
                className="text-end mx-2"
              />
              Hours
              <input
                type="number"
                min="0"
                max="59"
                name="exercise_min"
                required
                className="text-end mx-2"
              />
              Minutes
            </div>
          </div>
          <div className="grid grid-cols-2 py-4">
            <label>Sleep:</label>
            <div>
              <input
                type="number"
                min="0"
                max="23"
                name="sleep_hr"
                required
                className="text-end mx-2"
              />
              Hours
              <input
                type="number"
                min="0"
                max="59"
                name="sleep_min"
                required
                className="text-end mx-2"
              />
              Minutes
            </div>
          </div>
          <div className="flex justify-between py-4">
            <label>Weight:</label>
            <div>
              <input
                type="number"
                min="0"
                max="1000"
                name="weight"
                required
                className="text-end mx-2"
              />
              lbs, taken at
              <input
                type="time"
                name="weight_time"
                required
                className="text-end ml-2"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button className="p-2 border rounded hover:border-black hover:bg-green-400">
              <Link href="/profile">RETURN</Link>
            </button>
            <input
              className="p-2 border rounded hover:border-black hover:bg-green-400"
              type="submit"
              value="ADD DATA"
            />
          </div>
        </form>
      </Layout>
    </>
  );
};

export default AddHealthData;
