import React from "react";

function Logo({ width = "auto" }) {
  return (
    <div
      className="flex items-center gap-3 group"
      style={{ width }}
    >
     {/* Logo Icon */}
  <div
    className="
      w-12 h-12
      rounded-full
      bg-gradient-to-br
      from-green-500
      via-emerald-600
      to-green-800
      flex items-center justify-center
      shadow-lg
      group-hover:scale-110
      transition-all duration-300
    "
  >
    <span className="text-white text-3xl font-bold">
      S
    </span>
  </div>

  {/* Logo Text */}
  <div>
<h1
  className="
    text-4xl
    font-black
    tracking-tight
    text-yellow-600
  "
>
  Script<span className="text-green-700">ora</span>
</h1>

    <p
      className="
        hidden sm:block
        text-xs
        font-medium
        tracking-widest
        uppercase
        text-gray-500
      "
    >
      Share Your Story
    </p>
  </div>
    </div>
  );
}

export default Logo;