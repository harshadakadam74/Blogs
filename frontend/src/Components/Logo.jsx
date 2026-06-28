import { Feather } from "lucide-react";
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
          rounded-2xl
          bg-gradient-to-br
          from-[#F58529]
          via-[#DD2A7B]
          to-[#8134AF]
          flex
          items-center
          justify-center
          shadow-lg
          group-hover:scale-110
          transition-all
          duration-300
        "
      >
        <Feather className="text-white" size={24} />
      </div>

      {/* Logo Text */}
      <div>
        <h1
          className="
            text-4xl
            font-black
            tracking-tight
            leading-none
          "
        >
          <span className="text-[#282222]">Script</span>
          <span
            className="
              bg-gradient-to-r
              from-[#F58529]
              via-[#DD2A7B]
              to-[#8134AF]
              bg-clip-text
              text-transparent
            "
          >
            ora
          </span>
        </h1>

        <p
          className="
            hidden
            sm:block
            text-[11px]
            font-semibold
            tracking-[0.25em]
            uppercase
            text-gray-500
            mt-1
          "
        >
          Share Your Story
        </p>
      </div>
    </div>
  );
}

export default Logo;