import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-green-500",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-5 py-2.5
        rounded-lg
        font-medium
        shadow-md
        transition-all
        duration-300
        hover:scale-105
        active:scale-95
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