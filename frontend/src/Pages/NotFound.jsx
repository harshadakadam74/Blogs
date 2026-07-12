import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import Logo from "../Components/Logo";

const NotFound = () => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-5xl overflow-hidden rounded-4xl border border-pink-100/80 bg-white/80 shadow-[0_20px_80px_-20px_rgba(217,70,239,0.35)] backdrop-blur-xl">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-8 sm:p-10 lg:p-14">
            <div className="inline-flex items-center rounded-full border border-[#F58529]/20 bg-orange-50 px-3 py-1 text-sm font-semibold text-[#DD2A7B]">
              Oops! This page vanished
            </div>

            <h1 className="mt-6 text-6xl font-black tracking-tight text-slate-900 sm:text-7xl">
              404
            </h1>

            <h2 className="mt-4 text-2xl font-semibold text-slate-800 sm:text-3xl">
              The story you were looking for is not in Scriptora yet.
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              The page may have moved, been deleted, or never existed. Let’s bring you back to the feed so you can keep exploring.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02]"
              >
                <Home size={18} />
                Back to Home
              </Link>

              <Link
                to="/all-posts"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-[#DD2A7B] hover:text-[#DD2A7B]"
              >
                Explore posts
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="bg-linear-to-br from-[#FFF7ED] via-[#FDE7F3] to-[#F5E7FF] p-8 sm:p-10 lg:p-14">
            <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-lg">
              <div className="flex items-center justify-center">
                <Logo width="100%" />
              </div>

              <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Lost in the story?
                </p>
                <p className="mt-2 text-lg font-semibold leading-7">
                  Browse fresh posts, discover creators, or start your own chapter right away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
