import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white pt-20 pb-32">
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 18%, rgba(3,8,12,0.72), transparent 14%), radial-gradient(60% 40% at 86% 8%, rgba(6,90,150,0.06), transparent 22%), linear-gradient(180deg, rgba(0,0,0,0.95), rgba(0,0,0,0.98))",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/55 border border-white/10 text-sm text-white/90 shadow-sm"
            style={{ backdropFilter: "blur(6px)" }}
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-linear-to-br from-sky-500/20 to-sky-400/10 border border-sky-700/20">
              <span className="text-sky-300">📦</span>
            </span>
            <span className="font-medium">Design with</span>
            <span className="ml-1 font-semibold text-sky-300">ProjectUI</span>
          </div>
        </div>

        <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight text-center">
          Deliver Interfaces Faster &nbsp;
          <span className="text-slate-200/90">Seamless</span> with{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg,#5fb4ff,#2fa8ff,#1bd1ff)",
            }}
          >
            AI
          </span>
        </h1>

        <p className="mt-4 text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-center">
          Plan with delight and intelligence while bringing ideas to production.
        </p>

        <div className="flex justify-center mt-8">
          <button
            className="px-10 py-3 rounded-full font-semibold text-black shadow-lg transition-transform duration-200"
            style={{
              background: "linear-gradient(90deg, #0D6EFD 0%, #00C6FF 100%)",
            }}
          >
            Get Started →
          </button>
        </div>

        <div className="mt-20" />

        <div className="hidden lg:flex relative w-full items-center justify-between gap-14 px-4">
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sky-500/10 blur-[180px]" />
          </div>

          <div className="relative flex items-center gap-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="z-20 bg-[#07101b] px-6 py-3 rounded-full border border-sky-500/30 shadow-[0_0_35px_rgba(56,189,248,0.35)] flex items-center gap-2"
            >
              <span className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
              <span className="text-[15px] font-medium">Sketch</span>
            </motion.div>

            <svg
              className="absolute -left-4 top-1/2 -translate-y-1/2 h-48 w-52"
              viewBox="0 0 200 200"
            >
              <defs>
                <linearGradient
                  id="leftFlow"
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                >
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                d="M10 100 C 70 20, 120 20, 180 70"
                stroke="url(#leftFlow)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />

              <path
                d="M10 100 C 70 180, 120 180, 180 130"
                stroke="url(#leftFlow)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            <div className="z-20 flex flex-col gap-8">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="rounded-2xl px-8 py-6 bg-[#07101b]/80 border border-sky-400/30 min-w-[260px]"
              >
                <p className="uppercase text-sky-300 tracking-[0.2em] font-medium">
                  ⚡ Planning
                </p>
                <p className="mt-2 text-slate-400 text-sm">
                  Quickly outline flows, sections, and user journeys before
                  building.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.15 }}
                className="rounded-2xl px-8 py-6 bg-[#07101b]/70 border border-sky-400/20 min-w-[260px]"
              >
                <p className="uppercase text-sky-200 tracking-[0.2em] font-medium">
                  🖊️ Sketch
                </p>
                <p className="mt-2 text-slate-400 text-sm">
                  Convert raw ideas into clean blocks you can later ship as UI.
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="relative rounded-[1.8rem] px-10 py-10 bg-[#07101b]/90 border border-sky-500/40 shadow-[0_0_60px_rgba(56,189,248,0.35)] w-[380px]"
          >
            <p className="uppercase text-sky-300 tracking-[0.25em] text-[13px]">
              Build and Prototype Faster
            </p>

            <p className="text-[12px] text-slate-400 mt-1 mb-6">
              Layout, content, and structure in one place.
            </p>

            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-3 mt-2">
                <div className="h-6 bg-slate-800/60 rounded-md" />
                <div className="h-4 bg-slate-800/50 rounded-md" />
                <div className="h-3 w-3/4 bg-slate-800/40 rounded-md" />

                <div className="mt-2 flex flex-col gap-1">
                  <div className="h-3 bg-slate-800/40 rounded-md" />
                  <div className="h-3 bg-slate-800/40 rounded-md" />
                  <div className="h-3 bg-slate-800/30 rounded-md w-4/5" />
                </div>
              </div>

              <div className="relative flex items-stretch">
                <div className="w-px bg-slate-700" />
                <div className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-0.5 bg-linear-to-b from-transparent via-sky-400/70 to-transparent blur-[2px]" />
              </div>

              <div className="w-32">
                <div className="relative h-20 bg-linear-to-br from-slate-900 to-black rounded-xl border border-slate-700/80 flex items-center justify-center overflow-hidden">
                  <div className="h-12 w-12 rounded-full border border-slate-500/80 flex items-center justify-center text-sm text-slate-300">
                    3D
                  </div>
                  <div className="absolute top-2 right-2 text-[10px] border border-slate-600/70 bg-slate-900/80 rounded-full px-1">
                    ✕
                  </div>
                </div>

                <div className="h-2 bg-slate-800/70 rounded-md mt-3" />
                <div className="h-2 bg-slate-800/50 rounded-md mt-2 w-4/5" />
                <div className="h-5 bg-slate-800/40 rounded-md mt-3" />
              </div>
            </div>
          </motion.div>

          <div className="relative flex items-center gap-10">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.23 }}
              className="px-8 py-6 rounded-2xl bg-[#07101b]/80 border border-sky-400/30 min-w-60"
            >
              <p className="uppercase text-sky-300 tracking-[0.25em] text-sm">
                IMPROVE
              </p>

              <ul className="mt-4 space-y-3 text-slate-300 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-emerald-400/70 bg-emerald-500/20 text-[10px] text-emerald-300 flex items-center justify-center">
                    1
                  </span>
                  Improved layout
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-emerald-400/70 bg-emerald-500/20 text-[10px] text-emerald-300 flex items-center justify-center">
                    2
                  </span>
                  Optimized sections
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border border-emerald-400/70 bg-emerald-500/20 text-[10px] text-emerald-300 flex items-center justify-center">
                    3
                  </span>
                  Faster iteration
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.28 }}
              className="px-8 py-6 rounded-2xl bg-[#07101b]/70 border border-sky-400/20 min-w-[220px]"
            >
              <p className="text-lg font-semibold">Build the</p>
              <p className="text-sky-300 text-sm">MVP, site, or app</p>

              <div className="mt-3 flex items-center gap-3 text-sm text-slate-300">
                <span className="w-7 h-7 rounded-full border border-sky-400/70 bg-sky-500/20 flex items-center justify-center text-sm">
                  🎵
                </span>
                Launch-ready handoff
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex lg:hidden flex-col items-center gap-10 mt-10">
          <div className="z-20 bg-[#07101b] px-6 py-3 rounded-full border border-sky-500/30 flex items-center gap-2 shadow-[0_0_35px_rgba(56,189,248,0.35)]">
            <span className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
            <span className="text-[15px] font-medium">Sketch</span>
          </div>

          <div className="rounded-2xl px-8 py-6 bg-[#07101b]/80 border border-sky-400/30 w-full max-w-sm">
            <p className="uppercase text-sky-300 tracking-[0.2em] font-medium">
              ⚡ Planning
            </p>
            <p className="mt-2 text-slate-400 text-sm">
              Quickly outline flows, sections, and user journeys before
              building.
            </p>
          </div>

          <div className="rounded-2xl px-8 py-6 bg-[#07101b]/70 border border-sky-400/20 w-full max-w-sm">
            <p className="uppercase text-sky-200 tracking-[0.2em] font-medium">
              🖊️ Sketch
            </p>
            <p className="mt-2 text-slate-400 text-sm">
              Convert raw ideas into clean blocks you can later ship as UI.
            </p>
          </div>

          <div className="rounded-[1.8rem] px-10 py-10 bg-[#07101b]/90 border border-sky-500/40 w-full max-w-sm">
            <p className="uppercase text-sky-300 tracking-[0.25em] text-[13px]">
              Build and Prototype Faster
            </p>

            <p className="text-[12px] text-slate-400 mt-1 mb-6">
              Layout, content, and structure in one place.
            </p>

            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-3 mt-2">
                <div className="h-6 bg-slate-800/60 rounded-md" />
                <div className="h-4 bg-slate-800/50 rounded-md" />
                <div className="h-3 w-3/4 bg-slate-800/40 rounded-md" />

                <div className="mt-2 flex flex-col gap-1">
                  <div className="h-3 bg-slate-800/40 rounded-md" />
                  <div className="h-3 bg-slate-800/40 rounded-md" />
                  <div className="h-3 bg-slate-800/30 rounded-md w-4/5" />
                </div>
              </div>

              <div className="relative flex items-stretch">
                <div className="w-px bg-slate-700" />
                <div className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-0.5 bg-linear-to-b from-transparent via-sky-400/70 to-transparent blur-[2px]" />
              </div>

              <div className="w-28">
                <div className="relative h-20 bg-linear-to-br from-slate-900 to-black rounded-xl border border-slate-700/80 flex items-center justify-center overflow-hidden">
                  <div className="h-12 w-12 rounded-full border border-slate-500/80 flex items-center justify-center text-sm text-slate-300">
                    3D
                  </div>
                  <div className="absolute top-2 right-2 text-[10px] border border-slate-600/70 bg-slate-900/80 rounded-full px-1">
                    ✕
                  </div>
                </div>

                <div className="h-2 bg-slate-800/70 rounded-md mt-3" />
                <div className="h-2 bg-slate-800/50 rounded-md mt-2 w-4/5" />
                <div className="h-5 bg-slate-800/40 rounded-md mt-3" />
              </div>
            </div>
          </div>

          <div className="px-8 py-6 rounded-2xl bg-[#07101b]/80 border border-sky-400/30 w-full max-w-sm">
            <p className="uppercase text-sky-300 tracking-[0.25em] text-sm">
              IMPROVE
            </p>

            <ul className="mt-4 space-y-3 text-slate-300 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border border-emerald-400/70 bg-emerald-500/20 text-[10px] flex items-center justify-center text-emerald-300">
                  1
                </span>
                Improved layout
              </li>

              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border border-emerald-400/70 bg-emerald-500/20 text-[10px] flex items-center justify-center text-emerald-300">
                  2
                </span>
                Optimized sections
              </li>

              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border border-emerald-400/70 bg-emerald-500/20 text-[10px] flex items-center justify-center text-emerald-300">
                  3
                </span>
                Faster iteration
              </li>
            </ul>
          </div>

          <div className="px-8 py-6 rounded-2xl bg-[#07101b]/70 border border-sky-400/20 w-full max-w-sm">
            <p className="text-lg font-semibold">Build the</p>
            <p className="text-sky-300 text-sm">MVP, site, or app</p>

            <div className="mt-3 flex items-center gap-3 text-sm text-slate-300">
              <span className="w-7 h-7 rounded-full border border-sky-400/70 bg-sky-500/20 flex items-center justify-center text-sm">
                🎵
              </span>
              Launch-ready handoff
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
