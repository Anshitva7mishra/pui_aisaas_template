import  { useEffect, useRef, useState } from "react";
import { motion, } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Jens Daisen",
    role: "Frontend Developer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww",
    text: "Super seamless experience. The interface is super intuitive — results are amazing overall. Amazing. Wow.",
  },
  {
    id: 2,
    name: "Randy Yuzy",
    role: "Product Designer",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    text: "The interface looks professional and user friendly. Another-unique experience I've never seen before.",
  },
  {
    id: 3,
    name: "Leo Productions",
    role: "Creator",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=800&auto=format&fit=crop",
    text: "To deliver reliable products is one of the key capabilities — all necessary tools in one place.",
  },
  {
    id: 4,
    name: "Ardino Lee",
    role: "Fullstack Engineer",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop",
    text: "Saved us countless hours. The editor integrations are snappy and predictable.",
  },
];

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    priceSuffix: "/month",
    tagline: "Intelligence for everyday tasks",
    perks: [
      "Access to PUI",
      "Limited file uploads",
      "Limited and slower image generation",
      "Limited memory and context",
      "Limited deep research",
    ],
    cta: "Current",
    disabled: true,
  },
  {
    id: "go",
    name: "Go",
    price: 0,
    oldPrice: 399,
    priceSuffix: "/month (first 12 months)",
    tagline: "More access to popular features",
    perks: [
      "Expanded access to PUI",
      "Expanded messaging and uploads",
      "Expanded and faster image creation",
      "Longer memory and context",
      "Projects, tasks, custom PUIs",
    ],
    cta: "Upgrade",
    featured: true,
  },
  {
    id: "plus",
    name: "Plus",
    price: 1999,
    priceSuffix: "/month (incl. GST)",
    tagline: "More access to advanced intelligence",
    perks: [
      "PUI with advanced reasoning",
      "Expanded messaging and uploads",
      "Expanded and faster image creation",
      "Expanded memory and context",
      "Projects, tasks, custom PUIs",
    ],
    cta: "Select Plus",
  },
  {
    id: "pro",
    name: "Pro",
    price: 19900,
    priceSuffix: "/month (incl. GST)",
    tagline: "Full access to the best of ProjectUI",
    perks: [
      "PUI with pro reasoning",
      "Unlimited messages and uploads",
      "Unlimited and faster image creation",
      "Maximum memory and context",
      "Expanded projects, tasks, custom PUIs",
    ],
    cta: "Contact Sales",
  },
];

export default function ProductLandingPage() {
  const [billing, setBilling] = useState("monthly");
  const marqueeRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq =
      typeof window !== "undefined"
        ? window.matchMedia?.("(prefers-reduced-motion: reduce)")
        : null;
    if (mq?.matches) setReducedMotion(true);
    const handler = (e) => setReducedMotion(e.matches);
    mq?.addEventListener?.("change", handler);

    const checkMobile = () => {
      const w = window.innerWidth;
      setIsMobile(w < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      mq?.removeEventListener?.("change", handler);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const marqueeDisabled = reducedMotion || isMobile;
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <main className="bg-black min-h-screen text-white antialiased">
      <style>{`
        @keyframes marqueeX {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-track {
          display:flex;
          gap:1rem;
          align-items:stretch;
          will-change: transform;
          animation-name: marqueeX;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-duration: 28s;
        }

        .marquee-paused { animation-play-state: paused !important; }

        .card-base { background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border: 1px solid rgba(255,255,255,0.06); }

        @media (max-width: 640px) {
          .marquee-track { gap: 0.6rem; animation-duration: 34s; }
        }
      `}</style>

      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-10 md:pt-14">
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold">
              Honest review from dev & designer
            </h2>
            <p className="text-slate-400 mt-3">
              Real feedback from people shipping interfaces with our tooling —
              quick iteration, better results.
            </p>
          </div>

          <div className="ml-auto flex items-end gap-3">
            <div className="text-4xl md:text-5xl font-extrabold text-sky-400 leading-none">
              92%
            </div>
            <div className="text-sm md:text-base text-slate-300 leading-tight">
              Professional satisfaction
            </div>
          </div>
        </header>

        <div className="mb-12">
          {marqueeDisabled ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <motion.article
                  key={t.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32 }}
                  className="p-5 rounded-2xl card-base shadow-lg"
                >
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 w-20 h-28 rounded-xl overflow-hidden bg-slate-900/10">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-lg">
                        {t.name}
                      </div>
                      <div className="text-sky-300 text-sm mt-1">{t.role}</div>
                      <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                        {t.text}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div
              className="overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <div
                ref={marqueeRef}
                className={`marquee-track ${isPaused ? "marquee-paused" : ""}`}
                role="list"
                aria-label="Customer testimonials"
              >
                {marqueeItems.map((t, idx) => (
                  <motion.article
                    key={`${t.id}-${idx}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: (idx % TESTIMONIALS.length) * 0.03,
                    }}
                    className="shrink-0 w-[340px] sm:w-[360px] md:w-[380px] lg:w-[420px] p-5 rounded-2xl card-base shadow-lg"
                    whileHover={{ scale: 1.03, y: -6 }}
                    role="listitem"
                    aria-label={`${t.name} testimonial`}
                  >
                    <div className="flex gap-4 items-start">
                      <div className="shrink-0 w-24 h-32 rounded-xl overflow-hidden bg-slate-900/10">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold text-lg truncate">
                          {t.name}
                        </div>
                        <div className="text-sky-300 text-sm mt-1">
                          {t.role}
                        </div>
                        <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                          {t.text}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-900/40 text-sky-300 text-sm mb-3">
            Plans
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Choose your plan
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((p) => {
            const featured = !!p.featured;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32 }}
                className="rounded-2xl p-6 relative overflow-hidden card-base"
                whileHover={{
                  scale: p.disabled ? 1 : 1.02,
                  boxShadow: "0 30px 80px rgba(3,8,20,0.7)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs text-sky-300 font-semibold uppercase">
                      {p.name}
                    </div>
                    <div className="text-sm text-slate-300 mt-1">
                      {p.tagline}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-extrabold text-slate-100">
                      <span className="text-lg align-top mr-1">₹</span>
                      {p.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {p.priceSuffix}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="h-0.5 bg-white/5 rounded-full" />
                </div>

                <ul
                  className={`mt-5 space-y-3 text-sm text-slate-300 ${
                    p.id === "go"
                      ? "max-h-full overflow-visible"
                      : "max-h-44 overflow-auto pr-3"
                  }`}
                >
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3">
                      <div className="mt-1">
                        <Check
                          size={16}
                          className={featured ? "text-white" : "text-sky-400"}
                        />
                      </div>
                      <div className="leading-snug">{perk}</div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <button
                    disabled={p.disabled}
                    className={`w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-full ${
                      p.disabled
                        ? "bg-transparent border border-white/6 text-slate-500 cursor-not-allowed"
                        : featured
                        ? "bg-linear-to-br from-sky-500 to-blue-400 text-black font-semibold shadow-lg hover:scale-[1.01] cursor-pointer"
                        : "bg-transparent border border-white/6 text-slate-200 hover:bg-white/6 cursor-pointer"
                    }`}
                    aria-label={p.cta}
                  >
                    <span>{p.cta}</span>
                    {featured && <ArrowRight size={16} />}
                  </button>
                </div>

                {p.id === "free" && (
                  <div className="mt-3 text-xs text-slate-400">
                    Great to get started — upgrade anytime.
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
