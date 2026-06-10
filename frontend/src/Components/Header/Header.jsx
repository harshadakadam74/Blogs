import { useState } from "react";
import { Container } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Feather, Plus, Settings } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <Container>
        <nav className="grid grid-cols-3 items-center h-20">
          {/* LEFT - Logo */}
          <div className="justify-self-start">
            <Link to="/" className="flex items-center gap-3 group sm:mr-34">
              <div
                className="
                  w-11 h-11 sm:w-12 sm:h-12
                  rounded-full
                  bg-linear-to-r
                  from-emerald-500
                  to-green-700
                  flex items-center justify-center
                  shadow-md
                "
              >
                <span className="text-white text-2xl font-bold">
                  <Feather />
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

          {/* CENTER - Navigation */}
          <div className="hidden lg:flex items-center justify-center gap-2">
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

          <div className="hidden lg:flex items-center justify-self-end gap-3">
            {authStatus && (
              <>
                <button
                  onClick={() => navigate("/add-post")}
                  className="
    flex items-center justify-center gap-2
    px-5 py-2.5
    rounded-xl
    bg-emerald-600
    text-white
    font-semibold
    hover:bg-emerald-700
    transition-all
    hover:scale-105
  "
                >
                  <Plus size={18} />
                  <span>Add Post</span>
                </button>

                <Link
                  to="/settings"
                  className="
    group
    flex items-center
    overflow-hidden
    border border-gray-200
    rounded-xl
    px-3 py-2.5
    hover:bg-gray-50
    transition-all
  "
                >
                  <Settings size={20} className="text-gray-700 flex-shrink-0" />

                  <span
                    className="
      max-w-0
      overflow-hidden
      whitespace-nowrap
      opacity-0
      ml-0
      group-hover:max-w-[100px]
      group-hover:opacity-100
      group-hover:ml-2
      transition-all
      duration-300
      text-gray-700
      font-medium
    "
                  >
                    Settings
                  </span>
                </Link>
              </>
            )}

            {!authStatus && (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="
          px-5 py-2.5
          rounded-xl
          border
          border-gray-200
        "
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="
          px-5 py-2.5
          rounded-xl
          bg-emerald-600
          text-white
        "
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
      md:hidden
      p-3
      rounded-2xl
      bg-emerald-100
      text-emerald-700
      w-12 h-12
      flex items-center justify-center
      shadow-sm
      hover:bg-emerald-200
      transition-all
      text-2xl
      
    "
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden py-4 w-full  border-t border-gray-100 bg-white shadow-xl rounded-b-3xl">
            <ul className="flex flex-col gap-3 px-4">
              <li>
                <button
                  onClick={() => {
                    navigate("/");
                    setMenuOpen(false);
                  }}
                  className="w-full text-center px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 shadow-sm hover:bg-slate-100 transition"
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
                      className="w-full text-center px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 shadow-sm hover:bg-slate-100 transition"
                    >
                      All Posts
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        navigate("/settings");
                        setMenuOpen(false);
                      }}
                      className="w-full text-center px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 shadow-sm hover:bg-slate-100 transition"
                    >
                      Settings
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        navigate("/add-post");
                        setMenuOpen(false);
                      }}
                      className="w-full text-center px-6 py-4 rounded-2xl bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 transition"
                    >
                      Add Post
                    </button>
                  </li>
                </>
              )}

              {!authStatus && (
                <>
                  <li>
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full text-center px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 shadow-sm hover:bg-slate-100 transition"
                    >
                      Login
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => navigate("/signup")}
                      className="w-full text-center px-6 py-4 rounded-2xl bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 transition"
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
