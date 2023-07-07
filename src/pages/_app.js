import "../styles/global.css";
import Head from "next/head";
import NavBar from "../components/NavBar";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
// import { SessionProvider, useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="../../public/favicon.ico" />
      </Head>
      <main>
        <SessionProvider session={session}>
          <NextIntlClientProvider message={pageProps.messages}>
            {/* <Auth> */}
            <NavBar />
            <Component {...pageProps} />
            {/* </Auth> */}
          </NextIntlClientProvider>
        </SessionProvider>
      </main>
    </>
  );
}

// function Auth({ children }) {
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const isUser = !!session?.user;
//   const loading = status === "loading";

//   useEffect(() => {
//     if (!loading) {
//       if (!isUser) {
//         router.push("/");
//       }
//     }
//   }, [isUser, loading]);

//   if (loading) {
//     return <h3>Loading...</h3>;
//   }

//   if (!loading && isUser) {
//     return <>{children}</>;
//   }
//   return null;
// }
