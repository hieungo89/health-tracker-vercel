const Button = ({ content, className, handleClick }) => (
  <button
    className={`text-light rounded self-center px-4 bg-secondary-dark min-h-[2em] w-[18em]
    hover:bg-light hover:text-dark
    md:w-[16em] sm:w-[12em] ${className}`}
    onClick={handleClick}
  >
    {content}
  </button>
);

export default Button;
