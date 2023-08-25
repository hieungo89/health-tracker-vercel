import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const AddHealthData = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleDataInput = async (e) => {
    e.preventDefault();

    const time24hr = e.target.weight_time.value;
    let time12hr;
    //* convert to Standard Time
    if (Number(time24hr.slice(0, 2)) === 0) {
      time12hr = "12" + time24hr.slice(2) + " AM";
    } else if (Number(time24hr.slice(0, 2)) === 12) {
      time12hr = time24hr + " PM";
    } else if (Number(time24hr.slice(0, 2)) > 12) {
      const convertedHour = Number(time24hr.slice(0, 2)) - 12;
      const minutes = time24hr.slice(2) + " PM";
      time12hr =
        convertedHour < 10
          ? "0" + convertedHour + minutes
          : convertedHour + minutes;
    } else {
      time12hr = time24hr + " AM";
    }

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
        weightTime: time12hr,
      },
    };

    await axios.post("/api/wellnessData", data);
    router.push("/profile");
  };

  return (
    <>
      <Head>
        <title>HT - Wellness</title>
        <meta
          name="Record wellness data"
          content="User can record sleep, exercise, and weight data per day."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className="flex flex-col items-center">
        <h1 className="underline md:text-4xl">Data Input</h1>

        {/* Instructions */}
        <div className="my-4 md:text-sm">
          <h4 className="md:text-lg">
            Please fill out ALL fields in order to record your data.
          </h4>
          <li className="md:text-sm">
            Put 0&apos;s for any data you <b>don&apos;t</b> want to record
          </li>
          <br />
          <em>
            <b className="text-red-600">*Warning: </b>Adding data on the same
            date will override the previous data.
          </em>
        </div>

        <form
          onSubmit={(e) => handleDataInput(e)}
          className="flex flex-col border rounded px-16 p-4 lg:px-12 md:px-8 sm:px-4 sm:text-sm"
        >
          {/* Date */}
          <div className="flex justify-between py-4 sm:py-2">
            <label htmlFor="date">Select Date: </label>
            <input
              type="date"
              name="date"
              max={new Date().toISOString().slice(0, 10)}
              required
              className="text-center"
            />
          </div>

          {/* Exercise */}
          <div className="flex justify-between py-4 sm:py-2">
            <label htmlFor="exercise">Exercise:</label>
            <div className="flex">
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
              </div>
              <div>
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
          </div>

          {/* Sleep */}
          <div className="flex justify-between py-4 sm:py-2">
            <label htmlFor="sleep">Sleep:</label>
            <div className="flex">
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
              </div>
              <div>
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
          </div>

          {/* Weight */}
          <div className="flex justify-between py-4 sm:py-2">
            <label htmlFor="weight">Weight:</label>
            <div className="xs:flex xs:flex-col">
              <span>
                <input
                  type="number"
                  min="0"
                  max="999"
                  name="weight"
                  required
                  className="text-end mx-2 xs:mx-0.5"
                />
                lbs,
              </span>
              <span>
                taken at
                <input
                  type="time"
                  name="weight_time"
                  required
                  className="text-end ml-2 xm:ml-0.5"
                />
              </span>
            </div>
          </div>

          <input
            className="text-2xl bg-white/70 p-2 border-2 rounded
            hover:border-black hover:bg-green-400
            md:text-lg sm:text-base"
            type="submit"
            value="Record Data"
          />
        </form>
        <button
          className="text-lg bg-white/70 text-gray-900 m-4 p-2 border rounded font
        hover:border-black hover:bg-green-400
        md:text-base sm:text-sm"
        >
          <Link href="/profile" className="text-black">
            Return to Profile
          </Link>
        </button>
      </Layout>
    </>
  );
};

export default AddHealthData;
