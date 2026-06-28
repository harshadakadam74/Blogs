import React, { useId } from "react";

function Select(
  {
    options = [],
    label,
    className = "",
    placeholder = "Select an option",
    error = false,
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      {/* Select */}
      <select
        id={id}
        ref={ref}
        className={`
          w-full
          px-4 py-2
          border
          rounded-xl
          bg-white
          outline-none
          transition-all duration-200

          ${error
            ? "border-red-400 focus:ring-red-400 focus:border-red-400"
            : "border-gray-300 focus:ring-pink-400 focus:border-pink-400"
          }

          focus:ring-2
          shadow-sm
          hover:shadow-md
          ${className}
        `}
        {...props}
      >
        {/* Placeholder */}
        <option value="" disabled>
          {placeholder}
        </option>

        {/* Options */}
        {options.map((option, index) => {
          const value =
            typeof option === "string" ? option : option.value;

          const label =
            typeof option === "string" ? option : option.label;

          return (
            <option key={value || index} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);