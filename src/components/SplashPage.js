import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import homeDisplay from "../../public/images/home-focus.png";
import Layout from "../components/Layout";

const SplashPage = () => {
  return (
    <>
      <Head>
        <title>Health Tracker</title>
        <meta name="home" content="Home page for app information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center pt-4 md:pt-2">
          <div
            className="font-semibold text-secondary-dark font-georgia text-9xl
              lg:text-8xl md:text-7xl sm:text-6xl xs:text-4xl"
          >
            Health HQ
          </div>
          <p
            className="font-serif text-primary-light text-[1.25em] text-center mx-[8em]
              lg:text-lg md:text-base md:mx-[4em] sm:mx-[1em]"
          >
            Welcome to your one-stop health tracking hub! Stay on top of your
            well-being with ease, as we help you record and track your sleep,
            exercise, weight, and meals.
          </p>
          <Image
            src={homeDisplay}
            alt="home display conents"
            className="w-full h-auto pt-4"
          />
        </div>

        <div className="flex flex-col w-full bg-secondary-dark py-40 md:py-32">
          <div
            className="self-center text-center font-serif px-12 font-bold text-6xl
              lg:text-5xl md:text-4xl sm:text-3xl"
          >
            Welcome to Your Personal Health Tracker!
          </div>
          <div className="flex space-x-16 px-8 pt-[1em] md:flex-col md:space-x-0">
            <p className="text-lg font-mono py-[2em] lg:py-[1em] lg:text-base">
              Tired of losing track of your health goals? We&#39;ve got your
              back! Our Health Tracker helps you record and monitor your sleep,
              exercise, weight, and meals like a pro.
            </p>
            <p className="text-lg font-mono py-[2em] lg:py-[1em] lg:text-base">
              With our intuitive interface, tracking your habits couldn&#39;t be
              easier! Stay on top of your goals, identify patterns, and smash
              those personal milestones.
            </p>
            <p className="text-lg font-mono py-[2em] lg:py-[1em] lg:text-base">
              Wave goodbye to spreadsheets and notebooks - it&#39;s time to
              revolutionize the way you manage your health journey for better
              well-being.
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full bg-gray-50 py-20 md:py-12">
          <div
            className="self-center text-center font-serif px-12 font-bold text-6xl
              lg:text-5xl md:text-4xl sm:text-3xl"
          >
            Track Your Health
          </div>
          <div className="grid grid-cols-2 m-12 sm:grid-cols-1">
            <TrackHealthContent
              title="Monitor Sleep"
              description="Catch those Z’s by keeping track of your sleep habits. Input
                hours and minutes to analyze your sleep cycles."
            />
            <TrackHealthContent
              title="Track Exercise"
              description="Keep hustlin’ and hit your fitness goals. Input exercise hours
                  and minutes to stay on top."
            />
            <TrackHealthContent
              title="Watch Your Weight"
              description="Stay informed about your weight fluctuations. Input weight and
                  time taken for real-time tracking."
            />
            <TrackHealthContent
              title="Manage Meals"
              description="Fine-tune your meal intakes. Search through a database for
                  nutritional values of ingredients."
            />
            <TrackHealthContent
              title="Goal Setting"
              description="Set customized goals for yourself and track your progress
                  effortlessly."
            />
            <TrackHealthContent
              title="Easy Updates"
              description="Got a change of heart? Updating your information is a piece of
                  cake."
            />
          </div>
        </div>

        <div className="flex flex-col w-full bg-primary-light py-20 md:py-12">
          <div
            className="self-center text-center font-georgia text-secondary-light px-12 font-bold text-6xl
              lg:text-5xl md:text-4xl sm:text-3xl"
          >
            Get Started
          </div>
          <div className="flex flex-col items-center">
            <p
              className="text-secondary-light text-lg font-helvetica text-center w-[50%] py-[2em]
                lg:py-[1em] lg:text-base sm:w-[70%]"
            >
              Ready to commit to a healthier lifestyle? Don&#39;t wait, sign up
              today, and let&#39;s make your health the number one priority.
            </p>
            <button
              className="text-3xl border border-solid rounded-lg self-center py-2 px-4 bg-secondary-dark
                hover:border-black hover:bg-green-500
                lg:text-2xl md:text-xl sm:text-base"
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </button>
          </div>
        </div>

        <div className="flex flex-col w-full bg-primary-light py-20 md:py-12">
          <div
            className="self-center text-center font-georgia text-secondary-light px-12 font-bold text-6xl
              lg:text-5xl md:text-4xl sm:text-3xl"
          >
            FUEL YOUR MOMENTUM WITH FRESH HEALTH TIPS
          </div>
          <form className="flex flex-col items-center space-y-4 pt-8">
            <input
              type="email"
              placeholder="name@email.com"
              className="bg-secondary-dark text-light px-4 min-h-[2em] w-[18em]
                md:w-[16em] sm:w-[12em]"
            />
            <button
              className="rounded self-center px-4 bg-secondary-light hover:bg-green-500 min-h-[2em] w-[18em]
              md:w-[16em] sm:w-[12em]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default SplashPage;

const TrackHealthContent = ({ title, description }) => {
  return (
    <div className="col-span-1 w-[75%] pb-[2em] sm:w-[80%]">
      <div className="font-semibold text-2xl font-helvetica md:text-lg">
        {title}
      </div>
      <p className="text-lg font-helvetica md:text-base">{description}</p>
    </div>
  );
};
