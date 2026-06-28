import React from "react";

function Button({
  children,
  type = "button",
  bgColor = `
    bg-gradient-to-r
    from-[#F58529]
    via-[#DD2A7B]
    to-[#8134AF]
  `,
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2

        px-6
        py-3

        rounded-2xl
        font-semibold
        tracking-wide

        shadow-lg
        transition-all
        duration-300

        hover:scale-[1.03]
        hover:shadow-2xl
        hover:brightness-110

        active:scale-95

        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100

        ${bgColor}
        ${textColor}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;