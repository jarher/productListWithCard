export const Button = ({
  className,
  buttonHandler,
  ariaLabelText,
  children,
}) => {
  return (
    <button
      className={className}
      onClick={buttonHandler}
      aria-label={ariaLabelText}
      style={{ cursor: "pointer" }}
    >
      {children}
    </button>
  );
};
