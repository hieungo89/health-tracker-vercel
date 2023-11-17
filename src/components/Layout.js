const Layout = ({ children, className = "" }) => {
  return (
    <div className={`m-auto px-4 py-12 max-w-[1600px] ${className}`}>
      {children}
    </div>
  );
};

export default Layout;
