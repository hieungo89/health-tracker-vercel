import { Home, Profile, SignIn, SignOut } from "@components/Icons";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const cssClass = {
  icon: "flex space-x-2 px-2 hover:underline hover:underline-offset-2 text-black md:text-sm",
};

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <aside className="p-4 lg:p-2">
      <div className="flex justify-between md:justify-between">
        <Link href="/" className={cssClass.icon}>
          <Home /> HTA Home
        </Link>

        {session ? (
          <div className="flex">
            <Link href="/profile" className={`${cssClass.icon}`}>
              <Profile /> Profile
            </Link>
            <button onClick={() => signOut()} className={`${cssClass.icon}`}>
              <SignOut /> Sign-out
            </button>
          </div>
        ) : (
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/profile",
              })
            }
            className={`${cssClass.icon}`}
          >
            <SignIn /> Sign-in
          </button>
        )}
      </div>
    </aside>
  );
};

export default NavBar;
