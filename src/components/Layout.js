import React from "react";

const Layout = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-blue-300 w-full min-h-screen inline-block p-12 ${className}`}
    >
      {children}
    </div>
  );
};

export default Layout;
