import React, { useState } from "react";
import { Container, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <Container>
        <nav className="grid grid-cols-3 items-center h-20">

          {/* LEFT - Logo */}
          <div className="justify-self-start">
            <Link to="/" className="flex items-center gap-3 group ml-2 sm:ml-7">
              <div
                className="
                  w-11 h-11 sm:w-12 sm:h-12
                  rounded-full
                  bg-gradient-to-r
                  from-emerald-500
                  to-green-700
                  flex items-center justify-center
                  shadow-md
                "
              >
                <span className="text-white text-2xl font-bold">
                  S
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black leading-none">
                  <span className="text-amber-600">Script</span>
                  <span className="text-emerald-600">ora</span>
                </h1>

                <p className="hidden sm:block text-[10px] tracking-[0.25em] uppercase text-gray-500 font-semibold mt-1">
                  Share Your Story
                </p>
              </div>
            </Link>
          </div>

          {/* CENTER */}
          <div className="hidden md:flex items-center justify-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="
                px-5 py-2 rounded-xl
                font-semibold text-lg
                text-gray-700
                hover:bg-emerald-50
                hover:text-emerald-600
                transition-all
              "
            >
              Home
            </button>

            {authStatus && (
              <button
                onClick={() => navigate("/all-posts")}
                className="
                  px-5 py-2 rounded-xl
                  font-semibold text-lg
                  text-gray-700
                  hover:bg-emerald-50
                  hover:text-emerald-600
                  transition-all
                "
              >
                All Posts
              </button>
            )}
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center justify-self-end gap-3">

            {!authStatus ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="
                    px-5 py-2.5 rounded-xl
                    border border-gray-200
                    text-gray-700
                    hover:bg-gray-50
                  "
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="
                    px-5 py-2.5 rounded-xl
                    bg-emerald-600
                    text-white
                    hover:bg-emerald-700
                  "
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                {/* Profile */}
                <button
                  onClick={() => navigate("/profile")}
                  className="
                    px-5 py-2.5 rounded-xl
                    border border-emerald-200
                    text-emerald-700
                    font-semibold
                    hover:bg-emerald-50
                    transition-all
                  "
                >
                  Profile
                </button>

                {/* Add Post */}
                <button
                  onClick={() => navigate("/add-post")}
                  className="
                    px-5 py-2.5 rounded-xl
                    bg-emerald-600
                    font-semibold
                    text-white
                    shadow-md
                    hover:bg-emerald-700
                  "
                >
                  Add Post
                </button>

                {/* Logout */}
                <LogoutBtn />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              md:hidden
              sm:ml-7
             
              p-2
              rounded-xl
              bg-emerald-50
              text-emerald-700
              w-10 h-10
              flex items-center justify-center
              shadow-sm
              hover:bg-emerald-100
              transition-all
              
             
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <ul className="flex flex-col gap-2">

              <li>
                <button
                  onClick={() => {
                    navigate("/");
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-5 py-4 rounded-xl bg-white border border-gray-100 shadow-sm"
                >
                  Home
                </button>
              </li>

              {authStatus && (
                <>
                  <li>
                    <button
                      onClick={() => {
                        navigate("/all-posts");
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-5 py-4 rounded-xl bg-white border border-gray-100 shadow-sm"
                    >
                      All Posts
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-5 py-4 rounded-xl bg-white border border-gray-100 shadow-sm"
                    >
                       Profile
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        navigate("/add-post");
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-5 py-4 rounded-xl bg-emerald-600 text-white shadow-sm"
                    >
                       Add Post
                    </button>
                  </li>

                  <li>
                    <LogoutBtn />
                  </li>
                </>
              )}

              {!authStatus && (
                <>
                  <li>
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full text-left px-5 py-4 rounded-xl bg-white border border-gray-100 shadow-sm"
                    >
                      Login
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => navigate("/signup")}
                      className="w-full text-left px-5 py-4 rounded-xl bg-emerald-600 text-white shadow-sm"
                    >
                      Sign Up
                    </button>
                  </li>
                </>
              )}

            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;