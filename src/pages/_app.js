import Footer from "@components/Footer";
import NavBar from "@components/NavBar";
import ProtectedRoute from "@components/ProtectedRoute";
import * as ga from "@lib/ga";
import { NextUIProvider } from "@nextui-org/react";
import "@styles/global.css";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="@public/favicon.ico" />
      </Head>
      <main>
        <SessionProvider session={session}>
          <NextIntlClientProvider message={pageProps.messages}>
            <ProtectedRoute>
              <NextUIProvider>
                <NavBar />
                <Component {...pageProps} />
                <Footer />
              </NextUIProvider>
            </ProtectedRoute>
          </NextIntlClientProvider>
        </SessionProvider>
      </main>
    </>
  );
}
