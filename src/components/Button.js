import Link from "next/link";

const Button = ({ content, className, handleClick }) => (
  <button
    className={`text-light rounded self-center bg-secondary-dark min-h-[2em] w-[18em]
    hover:bg-light hover:text-dark md:w-[16em] sm:w-[12em] ${className}`}
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

const CancelButton = ({ text, href, className }) => (
  <Link
    href={href}
    className={`bg-secondary-dark text-white font-semibold p-[1rem] rounded
hover:bg-blue-green hover:text-black sm:text-sm ${className}`}
  >
    {text}
  </Link>
);

const SubmitButton = ({ text, className }) => (
  <input
    className={`bg-secondary-dark text-light font-semibold p-[1rem] rounded hover:bg-success hover:text-dark sm:text-sm ${className}`}
    type="submit"
    value={text}
  />
);

export { Button, FormSubmit, CancelButton, SubmitButton };
