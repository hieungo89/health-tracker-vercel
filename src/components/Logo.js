import React from "react";
import Link from "next/link";
import logo from "../public/images/health.me.jpeg";
import Image from "next/image";

const Logo = ({ className, imgClass }) => {
  return (
    <Link
      href="/"
      className={`flex items-center justify-center text-black ${className}`}
    >
      <Image src={logo} alt="health.me logo" className={imgClass} />
      Health.me
    </Link>
  );
};

export default Logo;
