const Layout = ({ children, className = "" }) => {
  return (
    <div className={`m-auto px-4 py-12 min-h-[90vh] bg-baby-blue ${className}`}>
      {children}
    </div>
  );
};

export default Layout;
