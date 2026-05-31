import React, { useState } from "react";
import { Container, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Sign-up",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
   <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-green-100 shadow-sm">
  <Container>
    <nav className="flex items-center justify-between py-3">
{/* Logo */}
<Link
  to="/"
  className="flex items-center gap-3 group"
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
</Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-3">
        {navItems.map(
          (item) =>
            item.active && (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className={`
                    px-5 py-2
                    rounded-full
                    font-medium
                    transition-all
                    duration-300
                    ${
                      item.name === "Add Post"
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:scale-105"
                        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                    }
                  `}
                >
                  {item.name}
                </button>
              </li>
            )
        )}

        {authStatus && (
          <li>
            <LogoutBtn />
          </li>
        )}
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-green-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-green-700"
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

    {/* Mobile Menu */}
    {menuOpen && (
      <div className="md:hidden py-4">
        <ul className="flex flex-col gap-2">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setMenuOpen(false);
                    }}
                    className="
                      w-full
                      text-left
                      px-4
                      py-3
                      rounded-xl
                      bg-gray-50
                      hover:bg-green-500
                      hover:text-white
                      transition-all
                    "
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}

          {authStatus && (
            <li className="mt-2">
              <LogoutBtn />
            </li>
          )}
        </ul>
      </div>
    )}
  </Container>
</header>
  );
}

export default Header;