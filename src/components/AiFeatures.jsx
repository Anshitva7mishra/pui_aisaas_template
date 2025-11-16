import  { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Cpu, Code, CheckCircle } from "lucide-react";

function SimplePreview({ title, before, suggestion }) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-[11px] text-slate-400 uppercase tracking-wide">
            {title}
          </div>
        </div>

        <div className="ml-3 flex gap-2">
          <button
            onClick={() => setShowAfter(false)}
            className={`px-3 py-1 rounded text-sm transition-colors duration-150 ${
              !showAfter
                ? "bg-slate-700 text-white"
                : "bg-transparent border border-slate-700 text-slate-300"
            }`}
            aria-pressed={!showAfter}
          >
            Before
          </button>

          <button
            onClick={() => setShowAfter(true)}
            className={`px-3 py-1 rounded text-sm transition-colors duration-150 ${
              showAfter
                ? "bg-slate-600 text-white"
                : "bg-transparent border border-slate-700 text-slate-300"
            }`}
            aria-pressed={showAfter}
          >
            After
          </button>
        </div>
      </div>

      <div className="flex-1 rounded-md border border-slate-800 bg-[#06070a] p-3 sm:p-4 shadow-sm">
        <pre
          className="text-xs sm:text-sm leading-snug text-slate-300 font-mono whitespace-pre-wrap wrap-break-word overflow-auto"
          style={{
            maxHeight: 192, 
          }}
        >
          {showAfter ? suggestion : before}
        </pre>
      </div>

      <div className="mt-3 text-xs text-slate-400">
        Tip: Toggle After to view the AI suggestion.
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          pre {
            max-height: 240px !important;
          }
        }
        @media (min-width: 1024px) {
          pre {
            max-height: 280px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function AiFeatures() {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
  };

  const card = {
    hidden: { opacity: 0, y: 12, scale: 0.995 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    hover: { y: -6, scale: 1.01, transition: { duration: 0.18 } },
  };

  const cards = useMemo(
    () => [
      {
        id: 1,
        icon: <Cpu size={20} />,
        title: "Code inspector & Troubleshooter",
        desc: "Find common bugs and suggest fixes.",
        before: `// Bug: function called with one arg causes NaN or undefined behavior
function add(a, b) {
  return a + b
}

console.log(add(2)) // missing second arg, unexpected result`,
        suggestion: `// Fix: ensure both args are numbers and provide sensible defaults
function add(a, b) {
  return Number(a || 0) + Number(b || 0)
}

console.log(add(2, 0)) // fixed: default second arg`,
      },
      {
        id: 2,
        icon: <Code size={20} />,
        title: "Code Completion & Suggestions",
        desc: "Generate safer snippets with error handling.",
        before: `// Simple fetch without error handling
const fetchData = async () => {
  const res = await fetch('/api/data')
  const json = await res.json()
  return json
}`,
        suggestion: `// Improved fetch with try/catch and response validation
const fetchData = async () => {
  try {
    const res = await fetch('/api/data')
    if (!res.ok) throw new Error('Network response was not ok: ' + res.status)
    return await res.json()
  } catch (err) {
    console.error('fetchData error', err)
    return null
  }
}`,
      },
      {
        id: 3,
        icon: <CheckCircle size={20} />,
        title: "Follow your workflow in the Source",
        desc: "Add tests and CI-friendly checks.",
        before: `// Tests missing edge case for missing args
it('adds numbers', () => {
  expect(add(1,2)).toBe(3)
})`,
        suggestion: `// Added tests covering missing args + expected defaults
it('adds numbers with missing args', () => {
  expect(add(1)).toBe(1) // default second arg -> 0
})

it('adds numbers normally', () => {
  expect(add(1,2)).toBe(3)
})`,
      },
    ],
    []
  );

  return (
    <section className="bg-transparent text-white py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-white font-bold text-2xl sm:text-3xl md:text-4xl"
          >
            Unleash Your Dev Power With{" "}
            <span className="bg-linear-to-r from-[#3196ff] to-[#19d2ff] text-transparent bg-clip-text">
              AI
            </span>{" "}
            Precision
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08 }}
            className="text-slate-400 mt-3 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Context-aware assistance and inline suggestions that fit into your
            workflow.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          role="list"
          aria-label="Features"
        >
          {cards.map((c) => (
            <motion.article
              key={c.id}
              variants={card}
              whileHover={shouldReduceMotion ? undefined : "hover"}
              className="rounded-2xl p-4 sm:p-5 bg-linear-to-b from-[#071018]/30 to-transparent border border-slate-800 shadow-[0_6px_18px_rgba(3,7,18,0.45)]"
              role="listitem"
              aria-labelledby={`feature-${c.id}`}
            >
              <motion.div layout className="flex items-start gap-3 sm:gap-4">
                <motion.div
                  layout
                  className="flex-none p-2 rounded-lg bg-slate-900/40"
                  style={{
                    minWidth: 44,
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    className="p-1 rounded bg-slate-900/30"
                  >
                    {c.icon}
                  </motion.div>
                </motion.div>

                <div className="flex-1 min-w-0">
                  <motion.h3
                    layout
                    id={`feature-${c.id}`}
                    className="text-sm sm:text-base font-semibold text-white"
                  >
                    {c.title}
                  </motion.h3>
                  <motion.p layout className="text-slate-400 text-sm mt-1">
                    {c.desc}
                  </motion.p>
                </div>
              </motion.div>

              <motion.div layout className="mt-4">
                <SimplePreview
                  title={c.title}
                  before={c.before}
                  suggestion={c.suggestion}
                />
              </motion.div>

              <motion.div
                layout
                className="mt-4 flex items-center justify-between text-xs sm:text-sm text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <motion.span
                    layout
                    className="w-2 h-1 rounded bg-sky-500 inline-block"
                  />
                  <span>Live demo</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-xs sm:text-sm">
                    AI
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-xs sm:text-sm">
                    Beta
                  </span>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
