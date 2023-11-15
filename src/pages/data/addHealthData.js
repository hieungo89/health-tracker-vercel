import Layout from "@components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@components/Button";

const cssStyles = {
  formContainer: `flex flex-col rounded px-16 mb-4 p-4 lg:px-12 md:px-8 sm:px-4 sm:text-sm`,
  inputCategory: `flex justify-between py-4 sm:py-2`,
};

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
        <title>HTA - Wellness</title>
        <meta
          name="Record wellness data"
          content="User can record sleep, exercise, and weight data per day."
        />
      </Head>

      <Layout className="flex flex-col items-center bg-baby-blue">
        <h1 className="underline font-trebuchet md:text-4xl">Data Input</h1>

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
          className={cssStyles.formContainer}
        >
          {/* Date */}
          <div className={cssStyles.inputCategory}>
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
          <div className={cssStyles.inputCategory}>
            <label htmlFor="exercise">Exercise:</label>
            <div className="flex">
              <TimeLabels label="exercise_hr" timeType="Hours" />
              <TimeLabels label="exercise_min" timeType="Minutes" />
            </div>
          </div>

          {/* Sleep */}
          <div className={cssStyles.inputCategory}>
            <label htmlFor="sleep">Sleep:</label>
            <div className="flex">
              <TimeLabels label="sleep_hr" timeType="Hours" />
              <TimeLabels label="sleep_min" timeType="Minutes" />
            </div>
          </div>

          {/* Weight */}
          <div className={cssStyles.inputCategory}>
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
            className={`text-light rounded self-center px-4 bg-secondary-dark min-h-[2em] w-[18em]
            hover:bg-light hover:text-dark
            md:w-[16em] sm:w-[12em]`}
            type="submit"
            value="Record Data"
          />
        </form>
        <Button
          content="Return to Profile"
          handleClick={() => router.push("/profile")}
        />
      </Layout>
    </>
  );
};

export default AddHealthData;

const TimeLabels = ({ label, timeType }) => (
  <>
    <input
      type="number"
      min="0"
      max={timeType === "hour" ? "23" : "59"}
      name={label}
      required
      className="text-end mx-2"
    />
    {timeType}
  </>
);
