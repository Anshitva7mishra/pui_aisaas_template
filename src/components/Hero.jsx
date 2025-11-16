import  { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Zap, ImageIcon, CheckCircle, Box, ArrowRight } from "lucide-react";

export default function Hero({ onNodeClick } = {}) {
  const nodesLeft = [
    {
      id: "planning",
      title: "Planning",
      subtitle: "PoC / Specs",
      icon: <Zap size={16} />,
    },
    {
      id: "sketch",
      title: "Sketch",
      subtitle: "UI",
      icon: <ImageIcon size={14} />,
    },
  ];
  const nodesRight = [
    {
      id: "improve",
      title: "Improve",
      subtitle: "Optimize",
      icon: <CheckCircle size={14} />,
    },
    {
      id: "build",
      title: "Build the",
      subtitle: "messs app",
      icon: <Box size={14} />,
    },
  ];

  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const leftIconRefs = useRef([]);
  const rightIconRefs = useRef([]);

  const [svgSize, setSvgSize] = useState({ w: 1200, h: 380 });
  const [paths, setPaths] = useState({});
  const [hoverLeft, setHoverLeft] = useState(null);
  const [hoverRight, setHoverRight] = useState(null);

  function buildBezierPath(x1, y1, x2, y2) {
    const dx = Math.max(40, Math.abs(x2 - x1) * 0.36);
    const goingRight = x2 > x1;
    const cp1x = x1 + (goingRight ? dx : -dx);
    const cp2x = x2 - (goingRight ? dx : -dx);
    return `M ${x1} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${x2} ${y2}`;
  }

  useLayoutEffect(() => {
    if (!containerRef.current || !centerRef.current) return;
    const compute = () => {
      const cont = containerRef.current.getBoundingClientRect();
      const center = centerRef.current.getBoundingClientRect();
      const centerLeftX = Math.round(center.left - cont.left + 8);
      const centerRightX = Math.round(center.right - cont.left - 8);
      const centerMidY = Math.round(center.top - cont.top + center.height / 2);
      const getIconCenter = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return [
          Math.round(r.left - cont.left + r.width / 2),
          Math.round(r.top - cont.top + r.height / 2),
        ];
      };
      const lTop = getIconCenter(leftIconRefs.current[0]);
      const lBottom = getIconCenter(leftIconRefs.current[1]);
      const rTop = getIconCenter(rightIconRefs.current[0]);
      const rBottom = getIconCenter(rightIconRefs.current[1]);
      setPaths({
        leftTop: buildBezierPath(
          lTop?.[0],
          lTop?.[1],
          centerLeftX,
          centerMidY - 6
        ),
        leftTopPt: lTop,
        leftBottom: buildBezierPath(
          lBottom?.[0],
          lBottom?.[1],
          centerLeftX,
          centerMidY + 26
        ),
        leftBottomPt: lBottom,
        rightTop: buildBezierPath(
          rTop?.[0],
          rTop?.[1],
          centerRightX,
          centerMidY - 6
        ),
        rightTopPt: rTop,
        rightBottom: buildBezierPath(
          rBottom?.[0],
          rBottom?.[1],
          centerRightX,
          centerMidY + 26
        ),
        rightBottomPt: rBottom,
      });
      setSvgSize({ w: Math.round(cont.width), h: Math.round(cont.height) });
    };
    compute();
    let ro = new ResizeObserver(compute);
    ro.observe(containerRef.current);
    ro.observe(centerRef.current);
    leftIconRefs.current.forEach((el) => el && ro.observe(el));
    rightIconRefs.current.forEach((el) => el && ro.observe(el));
    const t = setTimeout(compute, 150);
    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, []);

  function handleNodeClick(id) {
    if (typeof onNodeClick === "function") onNodeClick(id);
  }

  const nodeBtnClass =
    "relative w-full bg-black/45 border border-sky-800/18 rounded-2xl px-3 py-2 flex items-center gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:scale-[1.02] transition-transform duration-150";

  const baseStroke = {
    stroke: "url(#strokeGrad)",
    strokeWidth: 2.2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
    opacity: 0.96,
  };

  const page = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, when: "beforeChildren" },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={page}
      className="relative overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 18%, rgba(3,8,12,0.72), transparent 14%), radial-gradient(60% 40% at 86% 8%, rgba(6,90,150,0.06), transparent 22%), linear-gradient(180deg, rgba(0,0,0,0.95), rgba(0,0,0,0.98))",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-12">
        <motion.div variants={item} className="text-center mb-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/55 border border-white/10 text-sm text-white/90 shadow-sm"
            style={{ backdropFilter: "blur(6px)" }}
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-linear-to-br from-sky-500/20 to-sky-400/10 border border-sky-700/20">
              <Box size={14} className="text-sky-300" />
            </span>
            <span className="font-medium">Design with</span>
            <span className="ml-1 font-semibold text-sky-300">ProjectUI</span>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="text-center max-w-4xl mx-auto px-2"
        >
          <motion.h1
            variants={item}
            className="text-white text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight"
          >
            Deliver Interfaces Faster &amp;{" "}
            <span className="text-slate-200/90">Seamless with</span>{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,#5fb4ff,#2fa8ff,#1bd1ff)",
              }}
            >
              AI
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-white/80 text-base sm:text-lg md:text-xl max-w-2xl mx-auto"
          >
            Plan with delight and intelligence while bringing ideas to
            production.
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNodeClick("get-started")}
              className="w-full sm:w-auto max-w-xs mx-auto sm:mx-0 inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-semibold text-black shadow-lg transition-transform duration-200 cursor-pointer"
              style={{
                background: "linear-gradient(90deg, #0D6EFD 0%, #00C6FF 100%)",
              }}
            >
              Get Started
              <motion.span whileHover={{ x: 6 }} className="flex items-center">
                <ArrowRight size={18} className="text-black" />
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="mt-12 hidden lg:flex justify-center relative">
          <div className="relative w-full max-w-6xl py-12" ref={containerRef}>
            <svg
              className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              viewBox={`0 0 ${svgSize.w} ${svgSize.h}`}
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="glowSmall">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="strokeGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#33b7ff" stopOpacity="0.98" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.98" />
                </linearGradient>
              </defs>

              {paths.leftTop && (
                <motion.path
                  d={paths.leftTop}
                  {...baseStroke}
                  filter="url(#glowSmall)"
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: 1,
                    strokeWidth: hoverLeft === 0 ? 3.2 : 2.2,
                    opacity: hoverLeft === 0 ? 1 : 0.96,
                  }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.12 }}
                />
              )}

              {paths.leftTopPt && (
                <motion.circle
                  cx={paths.leftTopPt[0]}
                  cy={paths.leftTopPt[1]}
                  r={5.6}
                  fill="#0ea5e9"
                  stroke="#031821"
                  strokeWidth={1.6}
                  animate={
                    hoverLeft === 0
                      ? { scale: [1, 1.18, 1], opacity: [1, 0.9, 1] }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={
                    hoverLeft === 0
                      ? { duration: 0.9, repeat: Infinity }
                      : { duration: 0.2 }
                  }
                />
              )}

              {paths.leftBottom && (
                <motion.path
                  d={paths.leftBottom}
                  {...baseStroke}
                  filter="url(#glowSmall)"
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: 1,
                    strokeWidth: hoverLeft === 1 ? 3.2 : 2.2,
                    opacity: hoverLeft === 1 ? 1 : 0.96,
                  }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.22 }}
                />
              )}

              {paths.leftBottomPt && (
                <motion.circle
                  cx={paths.leftBottomPt[0]}
                  cy={paths.leftBottomPt[1]}
                  r={5.6}
                  fill="#0ea5e9"
                  stroke="#031821"
                  strokeWidth={1.6}
                  animate={
                    hoverLeft === 1
                      ? { scale: [1, 1.18, 1], opacity: [1, 0.9, 1] }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={
                    hoverLeft === 1
                      ? { duration: 0.9, repeat: Infinity }
                      : { duration: 0.2 }
                  }
                />
              )}

              {paths.rightTop && (
                <motion.path
                  d={paths.rightTop}
                  {...baseStroke}
                  filter="url(#glowSmall)"
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: 1,
                    strokeWidth: hoverRight === 0 ? 3.2 : 2.2,
                    opacity: hoverRight === 0 ? 1 : 0.96,
                  }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.32 }}
                />
              )}

              {paths.rightTopPt && (
                <motion.circle
                  cx={paths.rightTopPt[0]}
                  cy={paths.rightTopPt[1]}
                  r={5.6}
                  fill="#0ea5e9"
                  stroke="#031821"
                  strokeWidth={1.6}
                  animate={
                    hoverRight === 0
                      ? { scale: [1, 1.18, 1], opacity: [1, 0.9, 1] }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={
                    hoverRight === 0
                      ? { duration: 0.9, repeat: Infinity }
                      : { duration: 0.2 }
                  }
                />
              )}

              {paths.rightBottom && (
                <motion.path
                  d={paths.rightBottom}
                  {...baseStroke}
                  filter="url(#glowSmall)"
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: 1,
                    strokeWidth: hoverRight === 1 ? 3.2 : 2.2,
                    opacity: hoverRight === 1 ? 1 : 0.96,
                  }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.42 }}
                />
              )}

              {paths.rightBottomPt && (
                <motion.circle
                  cx={paths.rightBottomPt[0]}
                  cy={paths.rightBottomPt[1]}
                  r={5.6}
                  fill="#0ea5e9"
                  stroke="#031821"
                  strokeWidth={1.6}
                  animate={
                    hoverRight === 1
                      ? { scale: [1, 1.18, 1], opacity: [1, 0.9, 1] }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={
                    hoverRight === 1
                      ? { duration: 0.9, repeat: Infinity }
                      : { duration: 0.2 }
                  }
                />
              )}
            </svg>

            <div className="grid grid-cols-12 gap-4 relative z-20 h-full items-center">
              <div className="col-span-12 md:col-span-4 flex flex-col items-start pl-6 md:pl-10 justify-center h-full">
                <div className="w-full max-w-[18rem] space-y-8">
                  {nodesLeft.map((n, i) => (
                    <motion.button
                      key={n.id}
                      variants={item}
                      initial="hidden"
                      animate="show"
                      onMouseEnter={() => setHoverLeft(i)}
                      onMouseLeave={() => setHoverLeft(null)}
                      onClick={() => handleNodeClick(n.id)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.12 }}
                      className={nodeBtnClass}
                    >
                      <div
                        ref={(el) => (leftIconRefs.current[i] = el)}
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-black/65 border border-sky-800/18 ring-1 ring-sky-900/20 z-10"
                      >
                        <div className="text-sky-300">{n.icon}</div>
                      </div>

                      <div className="text-left flex-1">
                        <div className="text-white font-semibold text-sm">
                          {n.title}
                        </div>
                        <div className="text-xs text-white/60 mt-0.5">
                          {n.subtitle}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="col-span-12 md:col-span-4 flex justify-center items-center h-full">
                <motion.div
                  ref={centerRef}
                  variants={item}
                  initial="hidden"
                  animate="show"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.45 }}
                  className="relative w-[320px] sm:w-[360px] md:w-[420px] h-[220px] sm:h-60 md:h-[280px] rounded-2xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.016) 0%, rgba(255,255,255,0.008) 60%, rgba(0,0,0,0.22) 100%)",
                    border: "1.6px solid rgba(59,130,246,0.12)",
                    boxShadow:
                      "0 18px 80px rgba(2,6,12,0.72), inset 0 1px 0 rgba(255,255,255,0.02), inset 0 -12px 40px rgba(0,0,0,0.45)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <div className="text-center">
                    <div
                      className="text-5xl font-extrabold tracking-tight"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg,#5fb4ff,#2fa8ff,#1bd1ff)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      PUI
                    </div>
                    <div className="mt-2 text-xs text-white/60">
                      ProjectUI — Design System
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="col-span-12 md:col-span-4 flex flex-col items-start pl-6 md:pl-10 justify-center h-full">
                <div className="w-full max-w-[18rem] space-y-8">
                  {nodesRight.map((n, i) => (
                    <motion.button
                      key={n.id}
                      variants={item}
                      initial="hidden"
                      animate="show"
                      onMouseEnter={() => setHoverRight(i)}
                      onMouseLeave={() => setHoverRight(null)}
                      onClick={() => handleNodeClick(n.id)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.12 }}
                      className={nodeBtnClass}
                    >
                      <div
                        ref={(el) => (rightIconRefs.current[i] = el)}
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-black/65 border border-sky-800/18 ring-1 ring-sky-900/20 z-10"
                      >
                        <div className="text-emerald-300">{n.icon}</div>
                      </div>

                      <div className="text-left flex-1">
                        <div className="text-white font-semibold text-sm">
                          {n.title}
                        </div>
                        <div className="text-xs text-white/60 mt-0.5">
                          {n.subtitle}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 -bottom-9 z-0 w-80 h-12 rounded-full blur-3xl bg-sky-700/10" />
          </div>
        </div>

        <motion.div
          variants={item}
          className="mt-8 sm:mt-10 flex flex-col items-center gap-4"
        >
          <div className="text-white/70 text-sm">
            Design Seamless Interfaces — Build Tools
          </div>

          <div className="w-full max-w-4xl mt-2 flex flex-wrap items-center justify-center gap-4 text-white/40 text-sm px-4">
            <div className="opacity-80 px-2">Webflow</div>
            <div className="opacity-80 px-2">codect</div>
            <div className="opacity-80 px-2">OpenAI</div>
            <div className="opacity-80 px-2">HubSpot</div>
            <div className="opacity-80 px-2">deepsot</div>
            <div className="opacity-80 px-2">framer</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
