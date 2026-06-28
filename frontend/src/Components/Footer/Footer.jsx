import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index";
import { Feather } from "lucide-react";

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
    from-[#3A0D1F]
    via-[#5A1730]
    to-[#7A2643]

    text-[#FDF7F3]

    dark:from-[#120812]
    dark:via-[#1C1020]
    dark:to-[#090909]

    transition-all
    duration-300
  "
    >
      {/* Top Glow */}
      <div
        className="
    absolute
    -top-16
    -left-16
    w-72
    h-72
    rounded-full
    bg-gradient-to-br
    from-[#F58529]/25
    via-[#DD2A7B]/20
    to-[#8134AF]/15
    blur-[120px]
  "
      ></div>

      {/* Bottom Glow */}
      <div
        className="
    absolute
    -bottom-16
    -right-16
    w-80
    h-80
    rounded-full
    bg-gradient-to-tr
    from-[#8134AF]/20
    via-[#DD2A7B]/15
    to-[#F58529]/25
    blur-[140px]
  "
      ></div>

      {/* Wave Design */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-20 sm:h-24 md:h-28"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#FFF8F6"
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
          {/* Logo Section */}
          <div className="flex flex-col items-center sm:items-start">
            <div
              className="
      flex
      items-center
      gap-3
      mb-5
      cursor-pointer
      hover:scale-105
      transition-all
      duration-300
    "
            >
              {/* Logo Icon */}
              <div
                className="
        w-12
        h-12
        rounded-2xl
        bg-gradient-to-br
        from-[#F58529]
        via-[#DD2A7B]
        to-[#8134AF]
        flex
        items-center
        justify-center
        shadow-lg
      "
              >
                <Feather className="text-white" size={22} />
              </div>

              {/* Logo Text */}
              <div>
                <h1 className="text-3xl font-black leading-none">
                  <span className="text-white">Script</span>
                  <span className="bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent">
                    ora
                  </span>
                </h1>

                <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/70">
                  Share Your Story
                </p>
              </div>
            </div>

            <p
              className="
      text-[#F3E7E2]
      leading-7
      max-w-xs
    "
            >
              © 2026 <span className="font-semibold">Scriptora</span>.<br />
              Share Your Story with the world.
              <br />
              All Rights Reserved.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3
              className="
      mb-6
      text-xl
      font-bold
      text-[#FFF8F6]
    "
            >
              Company
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/about"
                  className="
          text-[#F3E7E2]
          hover:text-[#F58529]
          transition-all
          duration-300
        "
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/careers"
                  className="
          text-[#F3E7E2]
          hover:text-[#DD2A7B]
          transition-all
          duration-300
        "
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  to="/blog"
                  className="
          text-[#F3E7E2]
          hover:text-[#8134AF]
          transition-all
          duration-300
        "
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="
          text-[#F3E7E2]
          hover:text-[#F58529]
          transition-all
          duration-300
        "
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3
              className="
      mb-6
      text-xl
      font-bold
      text-[#FFF8F6]
    "
            >
              Support
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/account"
                  className="
          text-[#F3E7E2]
          hover:text-[#F58529]
          transition-all
          duration-300
          inline-block
        "
                >
                  My Account
                </Link>
              </li>

              <li>
                <Link
                  to="/help"
                  className="
          text-[#F3E7E2]
          hover:text-[#DD2A7B]
          transition-all
          duration-300
          inline-block
        "
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="
          text-[#F3E7E2]
          hover:text-[#8134AF]
          transition-all
          duration-300
          inline-block
        "
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="
          text-[#F3E7E2]
          hover:text-[#F58529]
          transition-all
          duration-300
          inline-block
        "
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              className="
      mb-6
      text-xl
      font-bold
      text-[#FFF8F6]
    "
            >
              Legal
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/terms"
                  className="
          text-[#F3E7E2]
          hover:text-[#F58529]
          transition-all
          duration-300
          inline-block
        "
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="
          text-[#F3E7E2]
          hover:text-[#DD2A7B]
          transition-all
          duration-300
          inline-block
        "
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/cookies"
                  className="
          text-[#F3E7E2]
          hover:text-[#8134AF]
          transition-all
          duration-300
          inline-block
        "
                >
                  Cookie Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/community-guidelines"
                  className="
          text-[#F3E7E2]
          hover:text-[#F58529]
          transition-all
          duration-300
          inline-block
        "
                >
                  Community Guidelines
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
    border-t
    border-white/15
    mr-4

    flex
    flex-col
    sm:flex-row
    justify-between
    items-center
    gap-5
  "
        >
          <p
            className="
      text-sm
      text-[#F3E7E2]
      text-center
    "
          >
            © 2026 <span className="font-semibold">Scriptora</span>. Share Your
            Story. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/privacy"
              className="
        text-[#F3E7E2]
        hover:text-[#F58529]
        transition-all
        duration-300
      "
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="
        text-[#F3E7E2]
        hover:text-[#DD2A7B]
        transition-all
        duration-300
      "
            >
              Terms
            </Link>

            <Link
              to="/cookies"
              className="
        text-[#F3E7E2]
        hover:text-[#8134AF]
        transition-all
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
