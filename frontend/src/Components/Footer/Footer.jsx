import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index";

function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden
        pt-24
        sm:pt-28
        pb-10
      

        bg-gradient-to-br
        from-[#d9e8c6]
        via-[#cfe3b0]
        to-[#b8d59b]

        dark:from-gray-900
        dark:via-gray-800
        dark:to-black

        transition-all
        duration-300
      "
    >
      {/* Background Blur Effects */}
      <div className="absolute top-10 left-10 w-52 h-52 bg-green-300/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-lime-200/30 rounded-full blur-3xl"></div>

       {/* Wave Design */}
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
    <svg
      className="relative block w-full h-20 sm:h-24 md:h-28"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="#ffffff"
        fillOpacity="1"
        d="M0,224L48,224C96,224,192,224,288,192C384,160,480,
        96,576,106.7C672,117,768,203,864,202.7C960,203,1056
        ,117,1152,90.7C1248,64,1344,96,1392,112L1440,128L1440
        ,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,
        0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      />
    </svg>
  </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-7xl ml-2 px-4">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-12
            text-center
            sm:text-left
          "
        >
          {/* Logo Section */}
          <div className="flex flex-col items-center sm:items-start">
            <div
              className="
                mb-5
                hover:scale-105
                duration-300
                cursor-pointer
              "
            >
              <Logo />
            </div>

            <p
              className="
                text-gray-700
                dark:text-gray-300
                leading-7
                max-w-xs
              "
            >
              &copy; Copyright 2026. All Rights Reserved by DevUI.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3
              className="
                tracking-px
                mb-6
                text-xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              Company
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="
                    text-gray-700
                    dark:text-gray-300
                    hover:text-green-700
                    dark:hover:text-lime-400
                    hover:scale-105
                    duration-300
                    inline-block
                  "
                >
                  Features
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="
                    text-gray-700
                    dark:text-gray-300
                    hover:text-green-700
                    dark:hover:text-lime-400
                    hover:scale-105
                    duration-300
                    inline-block
                  "
                >
                  Pricing
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="
                    text-gray-700
                    dark:text-gray-300
                    hover:text-green-700
                    dark:hover:text-lime-400
                    hover:scale-105
                    duration-300
                    inline-block
                  "
                >
                  Affiliate Program
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="
                    text-gray-700
                    dark:text-gray-300
                    hover:text-green-700
                    dark:hover:text-lime-400
                    hover:scale-105
                    duration-300
                    inline-block
                  "
                >
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3
              className="
                tracking-px
                mb-6
                text-xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              Support
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="
                    text-gray-700
                    dark:text-gray-300
                    hover:text-green-700
                    dark:hover:text-lime-400
                    hover:scale-105
                    duration-300
                    inline-block
                  "
                >
                  Account
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="
                    text-gray-700
                    dark:text-gray-300
                    hover:text-green-700
                    dark:hover:text-lime-400
                    hover:scale-105
                    duration-300
                    inline-block
                  "
                >
                  Help
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="
                    text-gray-700
                    dark:text-gray-300
                    hover:text-green-700
                    dark:hover:text-lime-400
                    hover:scale-105
                    duration-300
                    inline-block
                  "
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="
                    text-gray-700
                    dark:text-gray-300
                    hover:text-green-700
                    dark:hover:text-lime-400
                    hover:scale-105
                    duration-300
                    inline-block
                  "
                >
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              className="
                tracking-px
                mb-6
                text-xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              Legals
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="
                    text-gray-700
                    dark:text-gray-300
                    hover:text-green-700
                    dark:hover:text-lime-400
                    hover:scale-105
                    duration-300
                    inline-block
                  "
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="
                    text-gray-700
                    dark:text-gray-300
                    hover:text-green-700
                    dark:hover:text-lime-400
                    hover:scale-105
                    duration-300
                    inline-block
                  "
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="
                    text-gray-700
                    dark:text-gray-300
                    hover:text-green-700
                    dark:hover:text-lime-400
                    hover:scale-105
                    duration-300
                    inline-block
                  "
                >
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          className="
            mt-16
            pt-6
            mr-6
            border-t
            border-gray-400/50

            flex
            flex-col
            sm:flex-row
            justify-between
            items-center
            gap-4
          "
        >
          <p
            className="
              text-sm
              text-gray-700
              dark:text-gray-400
              text-center
            "
          >
            © 2026 DevUI. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm ">
            <Link
              to="/"
              className="
                text-gray-700
                dark:text-gray-300
                hover:text-black
                dark:hover:text-white
                duration-300
              "
            >
              Privacy
            </Link>

            <Link
              to="/"
              className="
                text-gray-700
                dark:text-gray-300
                hover:text-black
                dark:hover:text-white
                duration-300
              "
            >
              Terms
            </Link>

            <Link
              to="/"
              className="
                text-gray-700
                dark:text-gray-300
                hover:text-black
                dark:hover:text-white
                duration-300
              "
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;