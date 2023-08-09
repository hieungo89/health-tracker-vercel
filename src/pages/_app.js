import "../styles/global.css";
import Head from "next/head";
import NavBar from "../components/NavBar";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { NextUIProvider } from "@nextui-org/react";

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
            <NextUIProvider>
              <NavBar />
              <Component {...pageProps} />
            </NextUIProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </main>
    </>
  );
}
