import Link from "next/link";

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

const FormSubmit = ({ name, className }) => (
  <input
    className={`text-light rounded self-center px-4 bg-secondary-dark min-h-[2em] w-[18em]
    hover:bg-light hover:text-dark
    md:w-[16em] sm:w-[12em] ${className}`}
    type="submit"
    value={name}
  />
);

const CancelButton = ({ text, className }) => (
  <Link
    href="/"
    className={`bg-baby-blue font-semibold p-[1rem] text-black rounded
hover:bg-warning hover:border-black sm:text-sm ${className}`}
  >
    {text}
  </Link>
);

export { Button, FormSubmit, CancelButton };
