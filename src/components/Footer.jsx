import { useState } from "react";
import { FiLayers, FiCode } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FaTwitter, FaGithub, FaDiscord } from "react-icons/fa";

export default function Footer() {
  const [open, setOpen] = useState(null);

  const groups = [
    {
      title: "Product",
      items: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Integrations", href: "#integrations" },
      ],
    },
    {
      title: "Resources",
      items: [
        { label: "Guides", href: "#guides" },
        { label: "API", href: "#api" },
        { label: "Blog", href: "#blog" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About", href: "#about" },
        { label: "Careers", href: "#careers" },
        { label: "Contact", href: "#contact" },
      ],
    },
  ];

  const Logo = () => (
    <div className="relative inline-flex items-center gap-3">
      <div className="relative w-12 h-12 flex items-center justify-center rounded-3xl shadow-lg bg-linear-to-br from-[#06b6d4] via-[#3b82f6] to-[#7c3aed]">
        <FiLayers size={20} className="absolute text-white -translate-y-0.5" />
        <FiCode size={14} className="absolute text-white/90 translate-y-1" />
        <HiOutlineSparkles
          size={10}
          className="absolute text-white/80 top-1.5 right-[7px]"
        />
      </div>

      <div className="flex flex-col leading-tight">
        <span className="text-white font-bold text-lg tracking-tight">
          ProjectUI
        </span>
        <span className="text-slate-300 text-xs -mt-0.5">
          Design · Dev · Ship
        </span>
      </div>
    </div>
  );

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                Build polished interfaces faster with smart tooling
              </h3>

              <p className="mt-4 text-slate-300 max-w-lg">
                Ship components, docs and automation in one place — small
                footprint, big velocity.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#start"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 hover:bg-white/8 text-sm font-medium ring-1 ring-white/6"
                >
                  Get Started
                </a>

                <a
                  href="#docs"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm text-slate-200 hover:border-slate-300"
                >
                  Docs
                </a>
              </div>
            </div>

            <div className="hidden sm:grid grid-cols-3 gap-6 mt-10">
              {groups.map((g) => (
                <div
                  key={g.title}
                  className="bg-white/2 p-4 rounded-lg border border-white/6"
                >
                  <div className="uppercase text-xs text-sky-300 font-semibold mb-3">
                    {g.title}
                  </div>
                  <ul className="space-y-2 text-sm text-slate-200">
                    {g.items.map((it) => (
                      <li key={it.label}>
                        <a className="hover:text-white" href={it.href}>
                          {it.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="sm:hidden mt-6 space-y-3">
              {groups.map((g, idx) => {
                const isOpen = open === idx;
                return (
                  <div
                    key={g.title}
                    className="border border-slate-800 rounded-lg overflow-hidden bg-linear-to-b from-[#0b1220]/40 to-transparent"
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : idx)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-medium text-sm text-slate-100">
                        {g.title}
                      </span>

                      <svg
                        className={`w-4 h-4 transition-transform ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4">
                        <ul className="space-y-2 text-sm text-slate-200">
                          {g.items.map((it) => (
                            <li key={it.label}>
                              <a
                                className="hover:text-white block py-1"
                                href={it.href}
                              >
                                {it.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="border-t border-white/6 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-4">
                <div className="text-sm text-slate-400">Status</div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-xs">
                  Operational
                </div>
              </div>

              <div className="hidden sm:block text-slate-400 text-sm"></div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end gap-6">
            <div className="w-full flex items-center justify-center lg:justify-end">
              <div className="text-right lg:text-right">
                <div className="mb-3 lg:mb-0">
                  <Logo />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-center lg:justify-end gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white/4 hover:bg-white/8 transition"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white/4 hover:bg-white/8 transition"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white/4 hover:bg-white/8 transition"
                aria-label="Discord"
              >
                <FaDiscord />
              </a>
            </div>

            <div className="w-full flex items-center justify-center lg:justify-end">
              <form className="w-full max-w-sm flex items-center gap-2">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 rounded-md bg-white/3 placeholder-slate-400 text-sm text-white outline-none border border-white/6 focus:ring-2 focus:ring-white/8"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-md bg-linear-to-br from-[#06b6d4] to-[#7c3aed] text-xs font-semibold shadow-sm"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/6 text-sm text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              © {new Date().getFullYear()} ProjectUI. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <a className="hover:text-white" href="#terms">
                Terms
              </a>
              <a className="hover:text-white" href="#privacy">
                Privacy
              </a>
              <a className="hover:text-white" href="#support">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
