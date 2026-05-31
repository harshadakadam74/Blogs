import React from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", name, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm text-gray-600">
          {label}
        </label>
      )}

      <input
        ref={ref}
        name={name}
        type={type}
        {...props}
        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
});

export default Input;