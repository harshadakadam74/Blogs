import { useState } from "react";
import { Container, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Plus, Settings } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="
  sticky
  top-0
  z-50
  backdrop-blur-xl
  bg-white/80
  border-b
  border-[#EFE7DF]
  shadow-sm
"
    >
      <Container>
        <nav className="grid grid-cols-3 items-center h-20">
          {/* LEFT - Logo */}
          <div className="justify-self-start">
            <Link to="/" className="flex items-center gap-3 group sm:mr-34">
             
               <Logo/>
              </Link>
           
          </div>

          {/* CENTER - Navigation */}
          <div className="hidden lg:flex items-center justify-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="
px-5
py-2
rounded-full
text-gray-700
font-semibold
hover:bg-gray-100
transition
"
            >
              Home
            </button>

            {authStatus && (
              <button
                onClick={() => navigate("/all-posts")}
                className="
px-5
py-2
rounded-full
text-gray-700
font-semibold
hover:bg-gray-100
transition
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
                  onClick={() => navigate("/ai-studio")}
                  className="
    px-5
    py-2
    rounded-full
    text-gray-700
    font-semibold
    hover:bg-gray-100
    transition
  "
                >
                  AI Studio
                </button>

                <button
                  onClick={() => navigate("/add-post")}
                  className="
    flex items-center gap-2
    px-5
    py-2.5
    rounded-full
    text-white
    font-semibold
    bg-linear-to-r
    from-[#F58529]
    via-[#DD2A7B]
    to-[#8134AF]
    shadow-md
    hover:scale-105
    transition-all
  "
                >
                  <Plus size={18} />
                  Add Post
                </button>

                <Link
                  to="/settings"
                  className="
    w-11
    h-11
    rounded-full
    bg-gray-100
    hover:bg-gray-200
    flex
    items-center
    justify-center
    transition
  "
                >
                  <Settings size={20} className="text-gray-700" />
                </Link>
              </>
            )}

            {!authStatus && (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="
    px-5
    py-2.5
    rounded-full
    border
    border-gray-300
    hover:bg-gray-100
    font-medium
    transition
  "
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="
    px-5
    py-2.5
    rounded-full
    text-white
    font-semibold
    bg-linear-to-r
    from-[#F58529]
    via-[#DD2A7B]
    to-[#8134AF]
    shadow-md
    hover:scale-105
    transition-all
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
    w-11
    h-11
    flex
    items-center
    justify-center
    rounded-full

    bg-linear-to-r
    from-[#F58529]
    via-[#DD2A7B]
    to-[#8134AF]

    text-white
    shadow-lg

    hover:scale-105
    active:scale-95

    transition-all
    duration-300
  "
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div
            className="
      md:hidden
      py-4
      w-full
      border-t
      border-[#F3E7E2]
      bg-[#FFF8F6]
      shadow-xl
      rounded-b-3xl
    "
          >
            <ul className="flex flex-col gap-3 px-4">
              <li>
                <button
                  onClick={() => {
                    navigate("/");
                    setMenuOpen(false);
                  }}
                  className="
            w-full
            text-center
            px-6
            py-4
            rounded-2xl
            bg-white
            border
            border-[#F3E7E2]
            text-[#2B2B2B]
            shadow-sm
            hover:bg-[#FDF1EC]
            hover:text-[#DD2A7B]
            transition
          "
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
                      className="
                w-full
                text-center
                px-6
                py-4
                rounded-2xl
                bg-white
                border
                border-[#F3E7E2]
                text-[#2B2B2B]
                shadow-sm
                hover:bg-[#FDF1EC]
                hover:text-[#DD2A7B]
                transition
              "
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
                      className="
                w-full
                text-center
                px-6
                py-4
                rounded-2xl
                bg-white
                border
                border-[#F3E7E2]
                text-[#2B2B2B]
                shadow-sm
                hover:bg-[#FDF1EC]
                hover:text-[#DD2A7B]
                transition
              "
                    >
                      Settings
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        navigate("/ai-studio");
                        setMenuOpen(false);
                      }}
                      className="
                w-full
                text-center
                px-6
                py-4
                rounded-2xl
                text-gray-700
                font-semibold
                bg-white
                border
                border-[#F3E7E2]
                shadow-sm
                hover:bg-[#FDF1EC]
                hover:text-[#DD2A7B]
                transition
              "
                    >
                      AI Studio
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        navigate("/add-post");
                        setMenuOpen(false);
                      }}
                      className="
                w-full
                text-center
                px-6
                py-4
                rounded-2xl
                text-white
                font-semibold
                bg-linear-to-r
                from-[#F58529]
                via-[#DD2A7B]
                to-[#8134AF]
                shadow-lg
                hover:opacity-90
                transition
              "
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
                      onClick={() => {
                        navigate("/login");
                        setMenuOpen(false);
                      }}
                      className="
                w-full
                text-center
                px-6
                py-4
                rounded-2xl
                bg-white
                border
                border-[#F3E7E2]
                text-[#2B2B2B]
                shadow-sm
                hover:bg-[#FDF1EC]
                hover:text-[#DD2A7B]
                transition
              "
                    >
                      Login
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        navigate("/signup");
                        setMenuOpen(false);
                      }}
                      className="
                w-full
                text-center
                px-6
                py-4
                rounded-2xl
                text-white
                font-semibold
                bg-linear-to-r
                from-[#F58529]
                via-[#DD2A7B]
                to-[#8134AF]
                shadow-lg
                hover:opacity-90
                transition
              "
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
