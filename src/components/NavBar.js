import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Home, Profile, SignIn, SignOut } from "./Icons";

const cssClass = {
  icon: "flex space-x-2 px-2 hover:underline hover:underline-offset-2 text-black lg:text-sm",
};

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <aside className="p-4 bg-blue-300 lg:p-2">
      <div className="flex justify-end">
        <Link href="/" className={cssClass.icon}>
          <Home /> Home
        </Link>

        {session ? (
          <>
            <Link href="/profile" className={cssClass.icon}>
              <Profile /> Profile
            </Link>
            <button onClick={() => signOut()} className={cssClass.icon}>
              <SignOut /> Sign-out
            </button>
          </>
        ) : (
          <button onClick={() => signIn()} className={cssClass.icon}>
            <SignIn /> Sign-in
          </button>
        )}
      </div>
    </aside>
  );
};

export default NavBar;
