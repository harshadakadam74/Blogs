import React, { useId } from "react";

function Select(
  {
    options = [],
    label,
    className = "",
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        ref={ref}
        className={`
          w-full
          px-4
          py-2
          border
          border-gray-300
          rounded-lg
          bg-white
          outline-none
          focus:ring-2
          focus:ring-green-500
          focus:border-green-500
          transition
          duration-200
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);