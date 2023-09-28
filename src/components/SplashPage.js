import Layout from "@components/Layout";
import homeDisplay from "@images/home-focus.png";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Button from "@components/Button";

const cssStyles = {
  title: `font-semibold text-primary-light font-georgia text-9xl lg:text-8xl md:text-7xl sm:text-6xl xs:text-4xl`,
  headerLight: `self-center text-light text-center font-serif px-12 font-bold text-6xl lg:text-5xl md:text-4xl sm:text-3xl`,
  headerDark: `self-center text-dark text-center font-serif px-12 font-bold text-6xl lg:text-5xl md:text-4xl sm:text-3xl`,
  appDescription: `font-serif text-primary-light text-[1.25em] text-center mx-[8em] py-8 lg:text-lg md:text-base md:mx-[4em] sm:mx-[1em]`,
  contentText: `text-light text-lg font-mono py-[2em] lg:py-[1em] lg:text-base`,
  commitmentText: `text-light text-lg font-helvetica text-center w-[50%] py-[2em]
  lg:py-[1em] lg:text-base sm:w-[70%]`,
};

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
          <div className={cssStyles.title}>Health HQ</div>
          <p className={cssStyles.appDescription}>
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
          <div className={cssStyles.headerLight}>
            Welcome to Your Personal Health Tracker!
          </div>
          <div className="flex space-x-16 px-8 pt-[1em] md:flex-col md:space-x-0">
            <p className={cssStyles.contentText}>
              Tired of losing track of your health goals? We&#39;ve got your
              back! Our Health Tracker helps you record and monitor your sleep,
              exercise, weight, and meals like a pro.
            </p>
            <p className={cssStyles.contentText}>
              With our intuitive interface, tracking your habits couldn&#39;t be
              easier! Stay on top of your goals, identify patterns, and smash
              those personal milestones.
            </p>
            <p className={cssStyles.contentText}>
              Wave goodbye to spreadsheets and notebooks - it&#39;s time to
              revolutionize the way you manage your health journey for better
              well-being.
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full bg-gray-50 py-40 md:py-20">
          <div className={cssStyles.headerDark}>Track Your Health</div>
          <div className="grid grid-cols-2 m-12 sm:grid-cols-1">
            <TrackHealthContent
              title="Monitor Sleep"
              description="Catch those Z’s by keeping track of your sleep habits.
                Input hours and minutes to analyze your sleep cycles."
            />
            <TrackHealthContent
              title="Track Exercise"
              description="Keep hustlin’ and hit your fitness goals.
                Input exercise hours and minutes to stay on top."
            />
            <TrackHealthContent
              title="Watch Your Weight"
              description="Stay informed about your weight fluctuations.
                Input weight and time taken for real-time tracking."
            />
            <TrackHealthContent
              title="Manage Meals"
              description="Fine-tune your meal intakes.
                Search through a database for nutritional values of ingredients."
            />
            <TrackHealthContent
              title="Goal Setting"
              description="Set customized goals for yourself
                and track your progress effortlessly."
            />
            <TrackHealthContent
              title="Easy Updates"
              description="Got a change of heart?
                Updating your information is a piece of cake."
            />
          </div>
        </div>

        <div className="flex flex-col w-full bg-primary-light py-20 md:py-12">
          <div className={cssStyles.headerLight}>Get Started</div>
          <div className="flex flex-col items-center">
            <p className={cssStyles.commitmentText}>
              Ready to commit to a healthier lifestyle? Don&#39;t wait, sign up
              today, and let&#39;s make your health the number one priority.
            </p>
            <Button
              content="Sign in with Google"
              click={() => signIn("google")}
            />
          </div>
        </div>

        <div className="flex flex-col w-full bg-primary-light py-20 md:py-12">
          <div className={cssStyles.headerLight}>
            FUEL YOUR MOMENTUM WITH FRESH HEALTH TIPS
          </div>
          <form className="flex flex-col items-center space-y-4 pt-8">
            <input
              type="email"
              placeholder="name@email.com"
              className="bg-light text-dark px-4 min-h-[2em] w-[18em]
                md:w-[16em] sm:w-[12em]"
            />
            <Button content="Subscribe" />
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
