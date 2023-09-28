import React from "react";

const Layout = ({ children, className = "" }) => {
  return (
    <div className={`w-full min-h-screen inline-block ${className}`}>
      {children}
    </div>
  );
};

export default Layout;
