import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, ChevronDown, X } from "lucide-react";
import { FiLayers, FiCode } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Icon = (
    <div className="relative w-11 h-11 flex items-center justify-center rounded-2xl shadow-md bg-linear-to-br from-[#8AD0DA] via-[#479ED3] to-[#3BD7C0]">
      <FiLayers size={20} className="absolute text-white -translate-y-0.5" />
      <FiCode size={15} className="absolute text-white/90 translate-y-1" />
      <HiOutlineSparkles
        size={10}
        className="absolute text-white/80 top-1.5 right-[7px]"
      />
    </div>
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="backdrop-blur-md bg-black/30 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(false)}
                aria-label="Home"
                className="flex items-center gap-3 focus:outline-none cursor-pointer"
              >
                {Icon}
                <span
                  className="font-extrabold text-lg sm:text-xl tracking-tight text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg,#8AD0DA,#479ED3,#3BD7C0,#70EA7B)",
                  }}
                >
                  ProjectUI
                </span>
              </button>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="hidden show-menu-from-600 lg:hidden">
                <button
                  onClick={() => setOpen((s) => !s)}
                  aria-expanded={open}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 hover:bg-white/12 transition-colors duration-150 font-medium cursor-pointer"
                >
                  <span>Menu</span>
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ChevronDown size={16} />
                  </motion.span>
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-8 text-sm text-slate-200/80">
                <a className="hover:text-white cursor-pointer">HOME</a>
                <a className="hover:text-white cursor-pointer">ABOUT US</a>
                <a className="hover:text-white cursor-pointer">SUPPORT</a>
                <a className="hover:text-white cursor-pointer">CONTACT</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden show-actions-from-600 lg:hidden">
                <button className="px-4 py-2 rounded-full bg-linear-to-r from-blue-500 to-sky-400 text-black font-semibold shadow cursor-pointer">
                  Get Started
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-3">
                <button className="px-4 py-2 rounded-full bg-linear-to-r from-blue-500 to-sky-400 text-black font-semibold shadow cursor-pointer">
                  Get Started
                </button>
              </div>

              <div className="show-on-mobile lg:hidden">
                <button
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                  className="p-2 rounded-md bg-white/10 hover:bg-white/18 transition-colors duration-150 cursor-pointer"
                >
                  <MenuIcon className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setOpen(false)}
            />

            <div className="show-on-mobile">
              <motion.div
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="fixed inset-x-0 top-0 z-50 mx-4 mt-6 bg-linear-to-b from-[#08101f]/95 to-black rounded-2xl shadow-2xl p-6"
              >
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/18 rounded-md cursor-pointer"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                  {Icon}
                  <span
                    className="font-extrabold text-lg tracking-tight text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg,#8AD0DA,#479ED3,#3BD7C0,#70EA7B)",
                    }}
                  >
                    ProjectUI
                  </span>
                </div>

                <nav className="flex flex-col gap-5 mb-8">
                  <a className="text-white text-lg hover:text-sky-300">Home</a>
                  <a className="text-white text-lg hover:text-sky-300">
                    About Us
                  </a>
                  <a className="text-white text-lg hover:text-sky-300">
                    Support
                  </a>
                  <a className="text-white text-lg hover:text-sky-300">
                    Contact
                  </a>
                </nav>

                <button className="w-full py-3 rounded-full bg-linear-to-r from-blue-500 to-sky-400 text-black font-semibold shadow-lg text-center cursor-pointer">
                  Get Started
                </button>
              </motion.div>
            </div>

            <div className="hidden show-menu-from-600 lg:hidden">
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260 }}
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
              >
                <div className="w-full max-w-md bg-linear-to-b from-[#08101f]/95 to-black rounded-2xl shadow-2xl p-6 relative">
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/18 rounded-md"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11">{Icon}</div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <a className="text-white text-lg hover:text-sky-300">
                      Home
                    </a>
                    <a className="text-white text-lg hover:text-sky-300">
                      About Us
                    </a>
                    <a className="text-white text-lg hover:text-sky-300">
                      Support
                    </a>
                    <a className="text-white text-lg hover:text-sky-300">
                      Contact
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
