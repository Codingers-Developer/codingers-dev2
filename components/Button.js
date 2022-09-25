export default function Button({ eventHandler, className, children }) {
  return (
    <button
      onClick={eventHandler}
      className={`${
        className && className
      } rounded-md font-mono fonst-semibold h-8 shadow-lg focus:outline-none focus:ring-2 ring-1 ring-rose-300 transition duration-500`}
    >
      {children}
    </button>
  );
}
