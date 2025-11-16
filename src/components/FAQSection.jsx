import  { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, Plus, Minus } from "lucide-react";

const DEFAULT_TABS = [
  "Docs 4",
  "Plugins",
  "Automations",
  "Pricing",
  "Community",
];

const DEFAULT_QS = [
  {
    q: "Do I have to open Port 22 to use on site?",
    a: "No. Netlink documents for engineers are securely available over HTTPS on standard ports (443 or 80). If you’re behind a corporate firewall, outgoing HTTPS is usually sufficient.",
  },
  {
    q: "From what platform can I cancel my subscription?",
    a: "You can cancel from the billing section inside your account dashboard. For team plans, only admins can manage billing and cancellations.",
  },
  {
    q: "Can I cancel my docs without prior notice?",
    a: "Yes — docs access ends immediately on cancellation. For enterprise agreements, please check contract terms or contact support for migration help.",
  },
  {
    q: "If I add users after generation, will they see docs?",
    a: "New users will see generated docs according to their assigned role and permission settings. Manage access from the team settings page.",
  },
  {
    q: "Is my data secure?",
    a: "We use TLS for data-in-transit and AES-256 for data-at-rest. We also support role-based access controls and audit logs for enterprise customers.",
  },
];

export default function FAQSection({ fetchUrl, initialOpen = 0 }) {
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState(initialOpen);
  const [items, setItems] = useState(DEFAULT_QS);
  const [loading, setLoading] = useState(Boolean(fetchUrl));
  const [error, setError] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!fetchUrl) return;
    let mounted = true;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fetch(fetchUrl, { method: "GET" });
        if (!res.ok) throw new Error("Fetch failed: " + res.status);
        const data = await res.json();
        if (!mounted) return;
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
          setOpenIndex(0);
        } else {
          setError("No data returned");
        }
      } catch (err) {
        setError(err.message || "Failed to load FAQs");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fetchUrl]);

  const toggle = (i) => setOpenIndex((cur) => (cur === i ? -1 : i));

  const headingVars = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 8 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.04 * i, duration: 0.34 },
    }),
  };

  return (
    <section className="relative overflow-hidden py-20 bg-black text-white">
      <style>{`
        .neon-glow {
          box-shadow:
            0 8px 40px rgba(3,7,18,0.7),
            0 2px 8px rgba(24,120,255,0.06),
            inset 0 1px 0 rgba(255,255,255,0.02);
        }
        .focus-ring:focus-visible {
          outline: none;
          box-shadow: 0 0 0 4px rgba(59,130,246,0.12), 0 0 0 1px rgba(59,130,246,0.6);
          border-radius: 8px;
        }
        @keyframes gradShift {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        .ai-badge-anim {
          background: linear-gradient(135deg, #1fb6ff 0%, #1f8eff 30%, #19d2ff 60%, #48c6ff 100%);
          background-size: 300% 300%;
          animation: gradShift 6s ease-in-out infinite;
        }
      `}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 500px at 10% 85%, rgba(5,18,35,0.7) 0%, transparent 18%), radial-gradient(900px 400px at 90% 20%, rgba(6,20,40,0.55) 0%, transparent 18%), linear-gradient(180deg, rgba(0,0,0,0.55), rgba(3,6,10,0.9))",
        }}
      />

      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 rounded-full bg-linear-to-r from-sky-500 to-blue-400 text-black font-medium text-sm"
          >
            FAQ
          </motion.span>
          <motion.h2
            variants={headingVars}
            initial="hidden"
            animate="show"
            className="mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight max-w-3xl mx-auto"
          >
            Frequently Asked Question
          </motion.h2>
          <motion.div
            variants={headingVars}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.08 }}
            className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm"
          >
            Have more unanswered questions? Reach out to our support team — we
            answer quickly.
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-center gap-6 mb-6 flex-wrap justify-center lg:justify-start">
            {DEFAULT_TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => setActiveTab(i)}
                className={`relative px-3 pb-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                  i === activeTab
                    ? "text-white after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-0.5 after:bg-sky-500"
                    : "text-slate-400 hover:text-white"
                } focus-ring`}
                aria-pressed={i === activeTab}
              >
                {t}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-8 text-center text-slate-400">Loading FAQs…</div>
          ) : error ? (
            <div className="py-6 text-center text-rose-400">
              Failed to load FAQs — showing defaults.
            </div>
          ) : null}

          <div className="space-y-4">
            {items.map((it, i) => {
              const isOpen = i === openIndex;
              return (
                <motion.div
                  key={it.q}
                  initial="hidden"
                  animate="show"
                  variants={itemVars}
                  custom={i}
                  className="rounded-2xl border border-slate-800 bg-linear-to-b from-[#07101a]/35 to-transparent p-6 neon-glow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <button
                      id={`faq-btn-${i}`}
                      onClick={() => toggle(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          toggle(i);
                        }
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          const next = (i + 1) % items.length;
                          document.getElementById(`faq-btn-${next}`)?.focus();
                        }
                        if (e.key === "ArrowUp") {
                          e.preventDefault();
                          const prev = (i - 1 + items.length) % items.length;
                          document.getElementById(`faq-btn-${prev}`)?.focus();
                        }
                      }}
                      aria-expanded={isOpen}
                      className="flex-1 text-left flex gap-4 items-start focus-ring"
                    >
                      <span className="w-11 h-11 flex items-center justify-center rounded-md bg-slate-900/40 mt-0.5">
                        <Check size={16} className="text-sky-400" />
                      </span>
                      <span className="text-sm sm:text-base text-slate-100 leading-relaxed">
                        {it.q}
                      </span>
                    </button>

                    <motion.button
                      onClick={() => toggle(i)}
                      whileTap={{ scale: 0.96 }}
                      className="w-10 h-10 rounded-md bg-slate-900/30 flex items-center justify-center focus-ring"
                      aria-label={isOpen ? "Collapse" : "Expand"}
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </motion.button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.26 }}
                        className="mt-4 text-sm text-slate-300 overflow-hidden"
                      >
                        <p className="pl-16 pr-3 leading-relaxed">{it.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-semibold"
          >
            Take the Shortcut way to Production
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08 }}
            className="mt-4 text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Train and automate your team in their editor instead of slow-runtime
            compilers—no infra overhead, no waiting.
          </motion.p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              whileHover={!shouldReduceMotion ? { scale: 1.03 } : {}}
              whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
              href="#get-started"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 sm:px-8 sm:py-3 bg-linear-to-r from-[#0ea5ff] via-[#22c1ff] to-[#3dd5ff] text-black font-semibold shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/30"
            >
              Get Started
            </motion.a>

            <motion.a
              whileHover={!shouldReduceMotion ? { y: -3 } : {}}
              whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
              href="#automation"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 sm:px-8 sm:py-3 border border-slate-700 text-slate-200 hover:text-white hover:border-slate-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-600/30 bg-linear-to-b from-black/40 to-transparent"
            >
              Automation ⤓
            </motion.a>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="text-xs text-slate-500">
              Trusted by teams for fast delivery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
