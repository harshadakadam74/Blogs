import React from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", name, className = "", ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="
            mb-2
            block
            text-sm
            font-semibold
            text-gray-700
          "
        >
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        {...props}
        className={`
          w-full
          rounded-2xl
          border
          border-gray-200
          bg-white
          px-5
          py-3.5
          text-gray-800
          placeholder:text-gray-400

          shadow-sm

          transition-all
          duration-300

          focus:border-pink-500
          focus:ring-4
          focus:ring-pink-200
          focus:outline-none

          hover:border-pink-300

          ${className}
        `}
      />
    </div>
  );
});

export default Input;