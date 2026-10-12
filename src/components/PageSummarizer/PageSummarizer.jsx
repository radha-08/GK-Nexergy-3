import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  X,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Compass,
  Clock,
  Layers,
} from "lucide-react";
import { getPageSummary } from "../../data/pageSummaries";
import "./PageSummarizer.css";

export const PageSummarizer = ({ theme = "light" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const modalContentRef = useRef(null);

  // Get current page summary dynamically based on route
  const summary = getPageSummary(location.pathname);

  // Stop speech if pathname changes
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [location.pathname]);

  // Global event listener so external triggers (Navbar button, etc.) can open this
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-page-summarizer", handleOpen);
    window.openPageSummarizer = handleOpen;
    return () => {
      window.removeEventListener("open-page-summarizer", handleOpen);
      delete window.openPageSummarizer;
    };
  }, []);

  // Keyboard shortcut: Press Escape to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Audio Speech synthesis
  const toggleSpeech = () => {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported by your browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare clear text to speak
    const speechText = `${summary.title}. ${summary.whatItIs} How it will be useful: ${summary.howItIsUseful
      .map((item) => `${item.target}: ${item.benefit}`)
      .join(" ")}`;

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Copy summary to clipboard
  const handleCopy = () => {
    const textToCopy = `📌 GK NEXERGY PAGE BRIEF: ${summary.title} (${summary.route})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${summary.subtitle}

📖 WHAT THIS PAGE IS:
${summary.whatItIs}

💡 HOW IT WILL BE USEFUL:
${summary.howItIsUseful.map((item) => `• ${item.target}: ${item.benefit}`).join("\n")}

⚡ KEY HIGHLIGHTS:
${summary.keyHighlights.map((hl) => `• ${hl}`).join("\n")}
`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const isDark = theme === "dark";

  return (
    <>
      {/* ── FLOATING LAUNCH TRIGGER PILL (Bottom-Left) ───────── */}
      <motion.button
        type="button"
        data-testid="page-summarizer-toggle"
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Open page summary"
        className="page-summary-floating-pill"
        title="Click to view brief of what this page is & how it is useful"
      >
        <div className="summary-pill-sparkle-box">
          <Sparkles className="h-3.5 w-3.5 summary-sparkle-icon" />
        </div>
        <div className="summary-pill-text-group">
          <span className="summary-pill-label">Page Brief</span>
          <span className="summary-pill-sub">{summary.eyebrow}</span>
        </div>
      </motion.button>

      {/* ── INTERACTIVE SUMMARY MODAL DIALOG ────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="page-summary-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <motion.div
              ref={modalContentRef}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="page-summary-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="page-summary-title"
            >
              {/* Top Accent Gradient Bar */}
              <div className="page-summary-topbar" />

              {/* Header */}
              <div className="page-summary-header">
                <div className="summary-title-wrapper">
                  <div className="summary-eyebrow-row">
                    <span className="summary-eyebrow-badge">
                      <Sparkles className="h-3 w-3" />
                      <span>{summary.eyebrow}</span>
                    </span>
                    <span className="summary-time-pill">
                      <Clock className="h-3 w-3" />
                      <span>{summary.readingTime}</span>
                    </span>
                  </div>

                  <h2 id="page-summary-title" className="page-summary-title">
                    {summary.title}
                  </h2>
                  <p className="page-summary-subtitle">{summary.subtitle}</p>
                </div>

                {/* Header Action Tools */}
                <div className="summary-tools-row">
                  {/* Text-to-Speech Button */}
                  <button
                    type="button"
                    onClick={toggleSpeech}
                    className={`summary-tool-btn ${isSpeaking ? "active-speech" : ""}`}
                    title={isSpeaking ? "Stop listening" : "Listen to audio summary"}
                    aria-label={isSpeaking ? "Stop voice" : "Read aloud"}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Listen</span>
                      </>
                    )}
                  </button>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="summary-tool-btn"
                    title="Copy summary to clipboard"
                    aria-label="Copy summary"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="hidden sm:inline">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (isSpeaking && window.speechSynthesis) {
                        window.speechSynthesis.cancel();
                        setIsSpeaking(false);
                      }
                      setIsOpen(false);
                    }}
                    className="summary-close-btn"
                    aria-label="Close page brief"
                    title="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Modal Body */}
              <div className="page-summary-body">
                {/* 1. What This Page Is */}
                <section className="summary-section">
                  <div className="summary-section-heading">
                    <div className="summary-section-icon emerald">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <h3>What this page is</h3>
                  </div>
                  <p className="summary-paragraph">{summary.whatItIs}</p>
                </section>

                {/* 2. How It Will Be Useful */}
                <section className="summary-section">
                  <div className="summary-section-heading">
                    <div className="summary-section-icon amber">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <h3>How it will be useful to you</h3>
                  </div>
                  <div className="summary-usefulness-grid">
                    {summary.howItIsUseful.map((item, idx) => (
                      <div key={idx} className="usefulness-card">
                        <span className="usefulness-target-badge">
                          {item.target}
                        </span>
                        <p className="usefulness-text">{item.benefit}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3. Key Highlights */}
                <section className="summary-section">
                  <div className="summary-section-heading">
                    <div className="summary-section-icon emerald">
                      <Compass className="h-4 w-4" />
                    </div>
                    <h3>Key Highlights & Features</h3>
                  </div>
                  <ul className="summary-highlights-list">
                    {summary.keyHighlights.map((hl, idx) => (
                      <li key={idx} className="highlight-item">
                        <span className="highlight-dot" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 4. Action Recommendation */}
                {summary.action && (
                  <div className="summary-action-banner">
                    <div className="summary-action-text">
                      <span className="summary-action-label">Recommended Next Action</span>
                      <span className="summary-action-desc">
                        {summary.action.label}
                      </span>
                    </div>

                    {summary.action.isExternal ? (
                      <a
                        href={summary.action.to}
                        className="summary-action-btn"
                        onClick={() => setIsOpen(false)}
                      >
                        <span>Take Action</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <Link
                        to={summary.action.to}
                        className="summary-action-btn"
                        onClick={() => setIsOpen(false)}
                      >
                        <span>Go There</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="page-summary-footer">
                <span className="summary-route-tag">
                  Current Page: <strong>{location.pathname}</strong>
                </span>
                <span className="summary-brand-note">
                  GK Nexergy • Real-Time Page Intelligence
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageSummarizer;
