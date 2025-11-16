import  { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Terminal, ChevronDown } from "lucide-react";

export default function PromptHeroFixedV4() {
  const [openHistory, setOpenHistory] = useState(false);
  const allChips = [
    "functions as per context",
    "arrow expression",
    "file name of software",
    "Docker or container",
    "use camel-case",
    "component style",
    "optimize imports",
    "add tests",
  ];
  const visibleCountDefault = 4;
  const [showAllChips, setShowAllChips] = useState(false);

  const prompts = [
    "Refactor this function to be more declarative",
    "Extract repeated UI into a reusable React component",
    "Optimize loop to use map/filter instead of for",
    "Convert this function to async/await",
  ];
  const [typingIndex, setTypingIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const announceRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible((s) => !s), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let mounted = true;
    let charIdx = 0;
    let forward = true;
    let delayHandle;
    const run = () => {
      const current = prompts[typingIndex % prompts.length];
      if (!mounted) return;
      if (forward) {
        if (charIdx <= current.length) {
          setTyped(current.slice(0, charIdx));
          charIdx += 1;
          delayHandle = setTimeout(run, 40 + Math.random() * 40);
        } else {
          forward = false;
          delayHandle = setTimeout(run, 700);
        }
      } else {
        if (charIdx >= 0) {
          setTyped(current.slice(0, charIdx));
          charIdx -= 1;
          delayHandle = setTimeout(run, 22 + Math.random() * 20);
        } else {
          forward = true;
          setTypingIndex((i) => (i + 1) % prompts.length);
          delayHandle = setTimeout(run, 200);
        }
      }
    };
    if (!isFocused) run();
    return () => {
      mounted = false;
      clearTimeout(delayHandle);
    };
  }, [typingIndex, isFocused]);

  function ariaAnnounce(text) {
    if (announceRef.current) announceRef.current.textContent = text;
  }

  function simulateAssistantReply(userText) {
    return new Promise((resolve) => {
      const reply = `Suggestion: "${
        userText.length > 90 ? userText.slice(0, 90) + "…" : userText
      }" — consider breaking logic into small, well-named pure functions.`;
      setTimeout(() => resolve(reply), 700 + Math.random() * 700);
    });
  }

  async function handleGenerate() {
    if (isGenerating) return;
    const text = input.trim();
    if (!text) {
      inputRef.current?.focus();
      return;
    }

    const userMsg = { id: `u-${Date.now()}`, role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsGenerating(true);
    ariaAnnounce("Generating assistant response...");

    try {
      const reply = await simulateAssistantReply(text);
      const assistantMsg = {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: "",
      };
      setMessages((m) => [...m, assistantMsg]);
      await animateAssistantTyping(assistantMsg.id, reply);
      ariaAnnounce("Assistant response ready");
    } catch {
      ariaAnnounce("Failed to generate response");
      setMessages((m) => [
        ...m,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: "An error occurred while generating the response.",
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  }

  function animateAssistantTyping(id, fullText) {
    return new Promise((resolve) => {
      let idx = 0;
      const step = () => {
        idx++;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === id ? { ...msg, text: fullText.slice(0, idx) } : msg
          )
        );
        if (idx >= fullText.length) resolve(true);
        else setTimeout(step, 10 + Math.random() * 14);
      };
      step();
    });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  }

  function autoSizeTextarea(el) {
    if (!el) return;
    el.style.height = "auto";
    const h = el.scrollHeight;
    el.style.height = `${Math.min(h, 420)}px`;
  }
  useEffect(() => {
    autoSizeTextarea(inputRef.current);
  }, [input]);

  const bubbleIn = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.28 } },
  };

  const visibleChips = showAllChips
    ? allChips
    : allChips.slice(0, visibleCountDefault);

  return (
    <>
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        ref={announceRef}
      />

      <style>{`
        @keyframes blink-caret { 0% { opacity: 1 } 49% { opacity: 1 } 50% { opacity: 0 } 100% { opacity: 0 } }
        .gpt-caret { animation: blink-caret 1s steps(1) infinite; }
        @keyframes prompt-shimmer { 0% { transform: translateX(-6px); opacity: 0 } 60% { transform: translateX(0); opacity: 1 } 100% { transform: translateX(0); opacity: 1 } }
        .prompt-shimmer { animation: prompt-shimmer 520ms cubic-bezier(.2,.9,.3,1) both; }
        .gradient-placeholder{ background: linear-gradient(90deg,#79c7ff,#2fa8ff,#8ef); -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: 0 6px 30px rgba(45,150,255,0.09); }
      `}</style>

      <section
        id="prompt-hero"
        className="relative bg-black text-white py-12 sm:py-16"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(420px 200px at 6% 50%, rgba(6,120,220,0.08), transparent 12%), radial-gradient(420px 200px at 94% 48%, rgba(6,140,255,0.06), transparent 14%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4">
            <div
              className="inline-block px-3 py-0.5 rounded-full bg-slate-900/40 border border-sky-900/10 text-xs text-sky-200 mb-3"
              style={{ backdropFilter: "blur(6px)" }}
            >
              AI PROMPT
            </div>
            <h1 className="mx-auto text-center text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight max-w-2xl">
              More powerful with{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,#5fb4ff,#2fa8ff,#1bd1ff)",
                }}
              >
                Prompting
              </span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.05 }}
            className="rounded-2xl p-4 sm:p-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(6,10,15,0.94), rgba(8,12,18,0.86))",
              border: "1px solid rgba(60,130,200,0.04)",
              boxShadow: "0 18px 50px rgba(2,6,12,0.55)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <div className="shrink-0 flex items-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-linear-to-br from-sky-600 to-sky-400 shadow-md border border-sky-800/20">
                  <Terminal size={18} className="text-white" />
                </div>
              </div>

              <div className="relative flex-1">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    autoSizeTextarea(e.target);
                  }}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  rows={2}
                  placeholder=""
                  className="w-full resize-none rounded-xl px-4 py-3 text-base sm:text-lg text-slate-100 bg-black/10 border border-slate-800/30 focus:border-sky-500/40 focus:ring-1 focus:ring-sky-600/20 outline-none transition min-h-16 max-h-[420px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                  }}
                />

                {!isFocused && !input && (
                  <div className="absolute inset-0 px-4 py-3 pointer-events-none flex items-center">
                    <div className="flex-1">
                      <div
                        className="text-base sm:text-lg prompt-shimmer gradient-placeholder"
                        style={{ opacity: 0.98 }}
                      >
                        {typed}
                        <span
                          className="gpt-caret ml-1"
                          style={{
                            opacity: cursorVisible ? 1 : 0,
                            color: "transparent",
                          }}
                        >
                          |
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="shrink-0 flex items-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleGenerate()}
                  className="rounded-xl flex items-center justify-center bg-linear-to-br from-sky-500 to-blue-400 shadow-lg focus:outline-none"
                  aria-label="run prompt"
                  style={{ width: undefined }}
                >
                  <div className="w-14 h-14 sm:w-12 sm:h-12 flex items-center justify-center">
                    <ArrowRight size={18} className="text-black" />
                  </div>
                </motion.button>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-slate-300">Quick tweaks</div>
                {allChips.length > visibleCountDefault && (
                  <button
                    onClick={() => setShowAllChips((s) => !s)}
                    className="text-xs text-sky-300 flex items-center gap-2"
                  >
                    {showAllChips
                      ? "Show less"
                      : `+${allChips.length - visibleCountDefault} more`}
                    <ChevronDown size={14} />
                  </button>
                )}
              </div>

              <div className="sm:hidden -mx-2">
                <div className="flex gap-2 overflow-x-auto px-2 py-1">
                  {visibleChips.map((chip, idx) => (
                    <motion.button
                      key={idx}
                      whileTap={{ scale: 0.98 }}
                      className="shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/40 border border-slate-800/20 text-sm text-slate-100"
                    >
                      <span className="truncate max-w-40">{chip}</span>
                    </motion.button>
                  ))}
                </div>
                {showAllChips && (
                  <div className="mt-2 px-2">
                    {allChips.slice(visibleCountDefault).map((chip, i) => (
                      <div key={i} className="mb-2">
                        <button className="w-full text-left px-3 py-2 rounded-md bg-slate-900/30 border border-slate-800/20 text-sm text-slate-200">
                          {chip}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden sm:grid grid-cols-2 gap-3">
                {visibleChips.map((chip, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ translateY: -3 }}
                    className="flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-slate-900/40 border border-slate-800/20 text-slate-100 text-sm"
                  >
                    <span className="font-medium truncate">{chip}</span>
                    <button
                      type="button"
                      className="ml-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/12 border border-slate-700/20"
                      aria-label="open options"
                    >
                      <ChevronDown size={14} className="text-slate-200" />
                    </button>
                  </motion.div>
                ))}
                {!showAllChips && allChips.length > visibleCountDefault && (
                  <button
                    onClick={() => setShowAllChips(true)}
                    className="px-3 py-2 rounded-md border border-slate-800/20 text-sky-300"
                  >
                    Show more
                  </button>
                )}
                {showAllChips &&
                  allChips.slice(visibleCountDefault).map((chip, i) => (
                    <motion.div
                      key={`extra-${i}`}
                      whileHover={{ translateY: -3 }}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-slate-900/35 border border-slate-800/18 text-slate-100 text-sm"
                    >
                      <span className="font-medium truncate">{chip}</span>
                      <button
                        type="button"
                        className="ml-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/12 border border-slate-700/20"
                      >
                        <ChevronDown size={14} className="text-slate-200" />
                      </button>
                    </motion.div>
                  ))}
              </div>
            </div>

            <div className="mt-5 border-t border-slate-800/30 pt-5">
              <div className="space-y-3 max-w-full">
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0 }}
                      variants={bubbleIn}
                      className={`flex ${
                        m.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`px-4 py-2 rounded-lg max-w-[86%] wrap-break-word ${
                          m.role === "user"
                            ? "bg-sky-600/10 text-sky-100"
                            : "bg-slate-900/60 text-slate-100"
                        }`}
                        style={{ boxShadow: "0 6px 20px rgba(0,0,0,0.45)" }}
                      >
                        {m.role === "assistant" &&
                        m.text.length === 0 &&
                        isGenerating ? (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse delay-75" />
                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse delay-150" />
                          </div>
                        ) : (
                          <div
                            style={{ whiteSpace: "pre-wrap", lineHeight: 1.45 }}
                          >
                            {m.text}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <p className="text-center text-slate-300 mt-4 text-sm max-w-xl mx-auto">
                Recent prompts are stored in History — open it to revisit
                previous commands.
              </p>

              <div className="mt-4 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setOpenHistory(!openHistory)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-slate-700/30 text-slate-200"
                >
                  history <ArrowRight size={14} />
                </motion.button>
              </div>

              <AnimatePresence>
                {openHistory && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className="max-w-xl mx-auto text-slate-400 text-sm text-center">
                      Recent prompts will appear here.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
