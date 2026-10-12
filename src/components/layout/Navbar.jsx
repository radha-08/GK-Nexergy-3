import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
    ChevronDown,
    ChevronRight,
    Menu,
    X,
    Sun,
    Moon,
    ArrowRight,
    Languages,
    Globe,
    Bot,
    Sparkles,
    Check,
    CheckCheck,
    Copy,
    Building2,
    Code2,
    GraduationCap,
    FolderGit2,
    Users,
    PhoneCall,
    Layers,
} from "lucide-react";
import { MEGA_COMPANY, MEGA_SOLUTIONS, MEGA_ACADEMY } from "../../data/site";
import { SUPPORTED_LANGUAGES, setGlobalPageLanguage, getInitialLanguage } from "../../utils/translator";

const Navbar = ({ theme, onToggleTheme }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langModalOpen, setLangModalOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(() => getInitialLanguage());
    const [scrolled, setScrolled] = useState(false);
    const langDropdownRef = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setMobileOpen(false);
        setLangModalOpen(false);
    }, [location.pathname]);

    // Handle scroll state for navbar shadow
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close language dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
                setLangModalOpen(false);
            }
        };
        if (langModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [langModalOpen]);

    const handleSelectLanguage = (langCode) => {
        setSelectedLang(langCode);
        setGlobalPageLanguage(langCode);
        setLangModalOpen(false);
    };

    const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLang) || SUPPORTED_LANGUAGES[0];

    return (
        <header
            className="fixed top-0 inset-x-0 w-full z-50 backdrop-blur-2xl transition-all duration-300"
            data-testid="main-navbar"
            style={{
                border: "none",
                background:
                    theme === "dark"
                        ? "linear-gradient(180deg, rgba(14, 16, 23, 0.98) 0%, rgba(8, 9, 13, 0.99) 100%)"
                        : "linear-gradient(180deg, rgba(247, 240, 230, 0.96) 0%, rgba(238, 230, 218, 0.98) 100%)",
                boxShadow:
                    theme === "dark"
                        ? "0 4px 25px rgba(0, 0, 0, 0.65), 0 0 20px 0 rgba(16, 185, 129, 0.1)"
                        : "0 4px 20px -2px rgba(120, 53, 15, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.03)",
                borderBottom:
                    theme === "dark"
                        ? "1px solid rgba(16, 185, 129, 0.2)"
                        : "1px solid rgba(217, 119, 6, 0.2)",
            }}
        >
            <div className="mx-auto max-w-7xl px-2.5 xs:px-4 sm:px-6 lg:px-8">
                
                {/* Full-Length Header Row */}
                <div className="flex h-14 sm:h-20 items-center justify-between gap-1.5 xs:gap-2.5 sm:gap-4">
                    {/* LEFT – Brand Logo & Tag */}
                    <div className="flex items-center gap-2 xs:gap-3 min-w-0">
                        <Link
                            to="/"
                            data-testid="nav-logo"
                            className="flex shrink-0 items-center transition-transform duration-200 hover:scale-[1.03]"
                        >
                            {/* Brand Logo – dynamic for light and dark mode */}
                            <img
                                src={theme === "dark" ? "/images/gklogo-dark.png" : "/images/gklogo.png"}
                                alt="GK Nexergy Logo"
                                className="navbar-logo h-6 xs:h-7 sm:h-9 w-auto max-w-[105px] xs:max-w-[130px] sm:max-w-none object-contain"
                                style={{
                                    border: "none",
                                }}
                            />
                        </Link>

                        {/* Subtle Desktop Status Tag */}
                        <div className="hidden xl:flex items-center gap-2 pl-3">
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-emerald-500/10 border border-amber-600/20 dark:border-emerald-500/25 shadow-xs">
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                                <span className="text-[10.5px] font-extrabold tracking-wider uppercase text-amber-900 dark:text-emerald-300">
                                    Enterprise &bull; Academy
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT – Actions Island */}
                    <div className="flex shrink-0 items-center gap-1.5 xs:gap-2 sm:gap-2.5">
                        
                        {/* 1. LANGUAGE TRANSLATOR BUTTON & CLEAN DROPDOWN */}
                        <div className="relative" ref={langDropdownRef}>
                            <button
                                data-testid="nav-language-btn"
                                onClick={() => setLangModalOpen((v) => !v)}
                                aria-label="Translate Entire Website"
                                title="Select Website Language"
                                className={`flex h-8 xs:h-9 items-center gap-1 xs:gap-1.5 px-2 xs:px-3 sm:px-3.5 rounded-full transition-all cursor-pointer font-display text-[11px] xs:text-xs font-bold shadow-sm ${
                                    langModalOpen
                                        ? "bg-emerald-600 text-white shadow-emerald-600/30 scale-[1.02]"
                                        : theme === "dark"
                                        ? "text-slate-200 hover:text-emerald-400"
                                        : "text-stone-800 hover:text-emerald-700"
                                }`}
                                style={{
                                    border: theme === "dark" ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid rgba(217, 119, 6, 0.25)",
                                    backgroundColor:
                                        langModalOpen
                                            ? undefined
                                            : theme === "dark"
                                            ? "rgba(18, 20, 29, 0.9)"
                                            : "rgba(245, 238, 228, 0.95)",
                                }}
                            >
                                <Languages className={`h-3 xs:h-3.5 w-3 xs:w-3.5 ${langModalOpen ? "text-white" : theme === "dark" ? "text-emerald-400" : "text-amber-700"}`} />
                                <span className="uppercase tracking-wider text-[10px] xs:text-[11px] font-extrabold flex items-center gap-1">
                                    <span className="hidden xs:inline">{currentLangObj.flag}</span>
                                    <span>{selectedLang.toUpperCase()}</span>
                                </span>
                                <ChevronDown className={`h-2.5 xs:h-3 w-2.5 xs:w-3 transition-transform duration-200 ${langModalOpen ? "rotate-180 text-white" : "text-stone-400"}`} />
                            </button>

                            {/* Dropdown Menu - Clean attached dropdown */}
                            <AnimatePresence>
                                {langModalOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.18, ease: "easeOut" }}
                                        className="fixed xs:absolute right-2.5 xs:right-0 top-16 xs:top-full mt-2 z-[9999] rounded-2xl border p-3.5 xs:p-4 shadow-2xl"
                                        style={{
                                            width: "min(320px, calc(100vw - 20px))",
                                            maxWidth: "calc(100vw - 20px)",
                                            backgroundColor: theme === "dark" ? "#0f1118" : "#fbf7f0",
                                            borderColor: theme === "dark" ? "rgba(16, 185, 129, 0.3)" : "rgba(217, 119, 6, 0.25)",
                                            boxShadow:
                                                theme === "dark"
                                                    ? "0 25px 60px -12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(16, 185, 129, 0.15)"
                                                    : "0 20px 45px -10px rgba(120, 53, 15, 0.12), 0 4px 16px rgba(0, 0, 0, 0.05)",
                                            backdropFilter: "blur(20px)",
                                        }}
                                    >
                                        {/* Upward Triangle Arrow */}
                                        <div
                                            className="hidden xs:block absolute -top-2 right-6 h-3.5 w-3.5 rotate-45 border-l border-t pointer-events-none"
                                            style={{
                                                backgroundColor: theme === "dark" ? "#0f1118" : "#fbf7f0",
                                                borderColor: theme === "dark" ? "rgba(16, 185, 129, 0.3)" : "rgba(217, 119, 6, 0.25)",
                                            }}
                                        />

                                        {/* Dropdown Header */}
                                        <div
                                            className="flex items-center justify-between pb-3 border-b relative z-10"
                                            style={{
                                                borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "#dfd5c4",
                                            }}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <div
                                                    className="flex h-8 w-8 items-center justify-center rounded-xl"
                                                    style={{
                                                        backgroundColor: theme === "dark" ? "rgba(16, 185, 129, 0.2)" : "rgba(5, 150, 105, 0.12)",
                                                        color: theme === "dark" ? "#34d399" : "#059669",
                                                    }}
                                                >
                                                    <Globe className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <h4
                                                        className="font-display text-sm font-bold leading-tight"
                                                        style={{
                                                            color: theme === "dark" ? "#f8fafc" : "#1c1917",
                                                        }}
                                                    >
                                                        Translate Total Page
                                                    </h4>
                                                    <p
                                                        className="text-[11px] leading-tight mt-0.5"
                                                        style={{
                                                            color: theme === "dark" ? "#94a3b8" : "#78716c",
                                                        }}
                                                    >
                                                        Instant whole-page live translation
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setLangModalOpen(false)}
                                                className="rounded-lg p-1.5 transition-colors cursor-pointer"
                                                style={{
                                                    color: theme === "dark" ? "#94a3b8" : "#78716c",
                                                    backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)",
                                                }}
                                                aria-label="Close language selector"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {/* Language Selector Grid */}
                                        <div className="mt-3 relative z-10">
                                            <label
                                                className="text-[10px] font-extrabold uppercase tracking-wider mb-2 block"
                                                style={{
                                                    color: theme === "dark" ? "#34d399" : "#78716c",
                                                }}
                                            >
                                                Select Page Language:
                                            </label>
                                            <div
                                                className="grid grid-cols-2 gap-1.5 max-h-60 overflow-y-auto pr-1"
                                                style={{
                                                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                                }}
                                            >
                                                {SUPPORTED_LANGUAGES.map((lang) => {
                                                    const isSel = selectedLang === lang.code;
                                                    return (
                                                        <button
                                                            key={lang.code}
                                                            onClick={() => {
                                                                handleSelectLanguage(lang.code);
                                                            }}
                                                            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-left"
                                                            style={{
                                                                backgroundColor: isSel
                                                                    ? (theme === "dark" ? "#10b981" : "#059669")
                                                                    : theme === "dark"
                                                                    ? "rgba(255, 255, 255, 0.05)"
                                                                    : "#f5ede2",
                                                                color: isSel
                                                                    ? "#ffffff"
                                                                    : theme === "dark"
                                                                    ? "#e2e8f0"
                                                                    : "#1c1917",
                                                                border: isSel
                                                                    ? "1px solid #10b981"
                                                                    : theme === "dark"
                                                                    ? "1px solid rgba(255, 255, 255, 0.08)"
                                                                    : "1px solid #dfd5c4",
                                                                boxShadow: isSel ? "0 4px 14px rgba(5, 150, 105, 0.4)" : "none",
                                                            }}
                                                        >
                                                            <span className="flex items-center gap-2 min-w-0">
                                                                <span className="text-base leading-none shrink-0">{lang.flag}</span>
                                                                <span className="truncate text-[11.5px]">{lang.native}</span>
                                                            </span>
                                                            {isSel && <Check className="h-3.5 w-3.5 text-white shrink-0 ml-1" />}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Bottom Footer */}
                                        <div
                                            className="mt-3 pt-2.5 border-t flex justify-between items-center text-[11px] relative z-10"
                                            style={{
                                                borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "#dfd5c4",
                                                color: theme === "dark" ? "#94a3b8" : "#78716c",
                                            }}
                                        >
                                            <span>Active: <strong style={{ color: theme === "dark" ? "#34d399" : "#059669" }}>{currentLangObj.label}</strong></span>
                                            <button
                                                onClick={() => {
                                                    handleSelectLanguage("en");
                                                }}
                                                className="font-bold hover:underline cursor-pointer"
                                                style={{
                                                    color: theme === "dark" ? "#34d399" : "#059669",
                                                }}
                                            >
                                                Reset (English)
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* 2. THEME SWITCHER */}
                        <button
                            data-testid="theme-toggle"
                            onClick={onToggleTheme}
                            aria-label="Toggle light and dark theme"
                            className="flex h-8 w-8 xs:h-9 xs:w-9 items-center justify-center rounded-full transition-all hover:scale-105 cursor-pointer shadow-sm shrink-0"
                            style={{
                                border: theme === "dark" ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid rgba(217, 119, 6, 0.25)",
                                backgroundColor: theme === "dark" ? "rgba(18, 20, 29, 0.9)" : "rgba(245, 238, 228, 0.95)",
                                color: theme === "dark" ? "#e2e8f0" : "#292524",
                            }}
                        >
                            {theme === "dark" ? (
                                <Sun className="h-3.5 xs:h-4 w-3.5 xs:w-4 text-emerald-400" />
                            ) : (
                                <Moon className="h-3.5 xs:h-4 w-3.5 xs:w-4 text-amber-700" />
                            )}
                        </button>

                        {/* PAGE SUMMARY / BRIEF TRIGGER BUTTON */}
                        <button
                            data-testid="nav-page-summary-btn"
                            onClick={() => {
                                window.dispatchEvent(new CustomEvent("open-page-summarizer"));
                                window.openPageSummarizer?.();
                            }}
                            aria-label="Open AI Page Brief"
                            title="Open AI Page Brief"
                            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-display text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-sm shrink-0"
                            style={{
                                backgroundColor: theme === "dark" ? "rgba(18, 20, 29, 0.9)" : "rgba(245, 238, 228, 0.95)",
                                color: theme === "dark" ? "#34d399" : "#059669",
                                border: theme === "dark" ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid rgba(217, 119, 6, 0.25)",
                            }}
                        >
                            <Sparkles className="h-3.5 w-3.5" style={{ color: theme === "dark" ? "#10b981" : "#059669" }} />
                            <span>Page Brief</span>
                        </button>

                        {/* 3. STACK OF CARDS QUICK NAV */}
                        <Link
                            to="/home#pages-stack-section"
                            data-testid="nav-stack-btn"
                            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full font-display text-xs font-bold transition-all hover:scale-105"
                            style={{
                                backgroundColor: theme === "dark" ? "rgba(18, 20, 29, 0.9)" : "rgba(245, 238, 228, 0.95)",
                                color: theme === "dark" ? "#34d399" : "#047857",
                                border: theme === "dark" ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid rgba(217, 119, 6, 0.25)",
                            }}
                        >
                            <Layers className={`h-3.5 w-3.5 ${theme === "dark" ? "text-emerald-400" : "text-emerald-600"}`} />
                            <span>Stack of Cards</span>
                        </Link>

                        {/* 4. CTA BUTTON */}
                        <a
                            href="https://forms.gle/GCqvWiWqxwvDSzoZ6"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="nav-cta"
                            className="group hidden md:inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 font-display text-xs sm:text-xs font-extrabold text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]"
                            style={{
                                border: "none",
                                background:
                                    theme === "dark"
                                        ? "linear-gradient(135deg, #059669 0%, #10b981 50%, #8b5cf6 100%)"
                                        : "linear-gradient(135deg, #047857 0%, #059669 50%, #d97706 100%)",
                                boxShadow:
                                    theme === "dark"
                                        ? "0 0 22px rgba(16, 185, 129, 0.4), 0 4px 16px rgba(139, 92, 246, 0.3)"
                                        : "0 4px 18px rgba(5, 150, 105, 0.25)",
                            }}
                        >
                            <span>Start a Conversation</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>

                        {/* 5. HAMBURGER MENU BUTTON */}
                        <button
                            data-testid="main-menu-toggle"
                            onClick={() => setMobileOpen((v) => !v)}
                            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                            className={`flex h-8 xs:h-9 sm:h-9.5 items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3.5 sm:px-4 rounded-full transition-all cursor-pointer font-display text-[11px] xs:text-xs font-extrabold uppercase tracking-wider shadow-sm shrink-0 ${
                                mobileOpen
                                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/35 scale-[1.02]"
                                    : theme === "dark"
                                    ? "text-slate-200 hover:text-emerald-400"
                                    : "text-stone-800 hover:text-emerald-700"
                            }`}
                            style={{
                                border: theme === "dark" ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid rgba(217, 119, 6, 0.25)",
                                backgroundColor:
                                    mobileOpen
                                        ? undefined
                                        : theme === "dark"
                                        ? "rgba(18, 20, 29, 0.9)"
                                        : "rgba(245, 238, 228, 0.95)",
                            }}
                        >
                            <span className="hidden xs:inline">{mobileOpen ? "Close" : "Menu"}</span>
                            {mobileOpen ? (
                                <X className="h-3.5 w-3.5" />
                            ) : (
                                <Menu className="h-3.5 w-3.5" />
                            )}
                        </button>
                    </div>

                </div>

            </div>

            {/* ========================================================= */}
            {/* FULL RESPONSIVE FLOATING HAMBURGER FLYOUT MENU             */}
            {/* ========================================================= */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        className="pointer-events-auto mx-auto max-w-7xl px-2 xs:px-3 sm:px-6 lg:px-8 mt-2 max-h-[calc(100vh-70px)] overflow-y-auto z-[99999]"
                        data-testid="flyout-menu"
                    >
                        <div
                            className="rounded-2xl sm:rounded-3xl border p-3.5 xs:p-5 sm:p-8 shadow-2xl backdrop-blur-2xl"
                            style={{
                                background:
                                    theme === "dark"
                                        ? "linear-gradient(180deg, rgba(14, 16, 24, 0.98) 0%, rgba(9, 10, 15, 0.99) 100%)"
                                        : "linear-gradient(180deg, rgba(251, 247, 240, 0.98) 0%, rgba(245, 237, 225, 0.99) 100%)",
                                borderColor:
                                    theme === "dark"
                                        ? "rgba(16, 185, 129, 0.25)"
                                        : "rgba(217, 119, 6, 0.25)",
                                boxShadow:
                                    theme === "dark"
                                        ? "0 30px 70px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(16, 185, 129, 0.15)"
                                        : "0 25px 50px -12px rgba(120, 53, 15, 0.12)",
                            }}
                        >
                            
                            {/* Grid Navigation Sections */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
                                
                                {/* Column 1: Core Hubs */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-emerald-600" />
                                        <h4 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                                            Core Destinations
                                        </h4>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        {[
                                            { label: "Home", to: "/home", desc: "Main Ecosystem Overview" },
                                            { label: "Stack of Cards", to: "/home#pages-stack-section", desc: "Interactive Ecosystem Deck" },
                                            { label: "Company & Vision", to: "/about", desc: "Our Story & Visakhapatnam Hub" },
                                            { label: "Why GK Nexergy", to: "/why-gk-nexergy", desc: "Pod Delivery & 100% IP Ownership" },
                                        ].map((item) => (
                                            <Link
                                                key={item.to}
                                                to={item.to}
                                                className="group flex flex-col p-2.5 rounded-xl hover:bg-[#ede5d8] dark:hover:bg-slate-800/60 transition-all"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                <span className="font-display text-sm font-bold text-stone-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400 transition-colors">
                                                    {item.label}
                                                </span>
                                                <span className="text-[11px] text-stone-600 dark:text-slate-400">
                                                    {item.desc}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Column 2: Solutions & Engineering */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                        <h4 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                                            Enterprise Solutions
                                        </h4>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        {[
                                            { label: "Software Development", to: "/solutions/software-development", desc: "Web Apps & Custom Microservices" },
                                            { label: "Mobile Applications", to: "/solutions/mobile-development", desc: "iOS & Android Cross-Platform" },
                                            { label: "AI & Process Automation", to: "/solutions/ai-automation", desc: "Generative AI & Data Pipelines" },
                                            { label: "All Solutions Overview", to: "/solutions", desc: "Explore Complete Service Portfolio" },
                                        ].map((item) => (
                                            <Link
                                                key={item.to}
                                                to={item.to}
                                                className="group flex flex-col p-2.5 rounded-xl hover:bg-[#ede5d8] dark:hover:bg-slate-800/60 transition-all"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                <span className="font-display text-sm font-bold text-stone-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400 transition-colors">
                                                    {item.label}
                                                </span>
                                                <span className="text-[11px] text-stone-600 dark:text-slate-400">
                                                    {item.desc}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Column 3: Academy & Ecosystem */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                                        <h4 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
                                            Nexergy Academy
                                        </h4>
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        {[
                                            { label: "Academy Overview", to: "/academy", desc: "Industry Readiness & Mentorship" },
                                            { label: "Cyber Security & Hacking", to: "/academy/cyber-security", desc: "16-Week Intensive Defense Labs" },
                                            { label: "Delivered Projects", to: "/projects", desc: "Real Client Case Studies & ROI" },
                                            { label: "Careers & Hiring", to: "/careers", desc: "Join Visakhapatnam Agile Pods" },
                                        ].map((item) => (
                                            <Link
                                                key={item.to}
                                                to={item.to}
                                                className="group flex flex-col p-2.5 rounded-xl hover:bg-[#ede5d8] dark:hover:bg-slate-800/60 transition-all"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                <span className="font-display text-sm font-bold text-stone-900 group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400 transition-colors">
                                                    {item.label}
                                                </span>
                                                <span className="text-[11px] text-stone-600 dark:text-slate-400">
                                                    {item.desc}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Column 4: AI Quick Launch Card */}
                                <div className="rounded-2xl bg-gradient-to-br from-emerald-600/15 via-amber-600/10 to-emerald-500/5 p-4 sm:p-5 border border-emerald-500/25 dark:border-emerald-500/35 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                                                AI Smart Hub
                                            </span>
                                        </div>
                                        <h5 className="font-display text-base font-extrabold text-stone-900 dark:text-white">
                                            Ask AI Assistant
                                        </h5>
                                        <p className="text-xs text-stone-600 dark:text-slate-300 mt-1 leading-relaxed">
                                            Our real-time AI Assistant knows everything about GK Nexergy services, academy courses, and can navigate directly to any page for you.
                                        </p>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <button
                                            onClick={() => {
                                                setMobileOpen(false);
                                                window.dispatchEvent(new CustomEvent('open-page-summarizer'));
                                                window.openPageSummarizer?.();
                                            }}
                                            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl border border-emerald-600/30 dark:border-emerald-500/40 bg-[#fbf7f0] dark:bg-slate-800/60 text-stone-900 dark:text-white font-display text-xs font-bold hover:border-emerald-500 dark:hover:border-emerald-400 transition-all cursor-pointer"
                                        >
                                            <span className="flex items-center gap-2">
                                                <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                                <span>Page Brief & Summary</span>
                                            </span>
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </button>

                                        <button
                                            onClick={() => {
                                                setMobileOpen(false);
                                                window.dispatchEvent(new CustomEvent('open-gk-chatbot'));
                                            }}
                                            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-display text-xs font-bold shadow-md hover:bg-emerald-700 transition-all cursor-pointer"
                                        >
                                            <span>Ask AI Assistant</span>
                                            <Bot className="h-3.5 w-3.5" />
                                        </button>

                                        <Link
                                            to="/home#pages-stack-section"
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl border border-amber-600/30 dark:border-slate-700 bg-[#fbf7f0] dark:bg-slate-800/50 text-stone-900 dark:text-white font-display text-xs font-bold hover:border-emerald-500 dark:hover:border-emerald-400 transition-all cursor-pointer"
                                        >
                                            <span>Explore AI Stack of Cards</span>
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>
                                </div>

                            </div>

                            {/* Bottom Bar in Menu */}
                            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 dark:text-slate-400">
                                <span>GK Nexergy &bull; One Company. Two Powerful Ecosystems.</span>
                                <div className="flex items-center gap-4">
                                    <Link to="/contact" onClick={() => setMobileOpen(false)} className="hover:text-emerald-700 dark:hover:text-emerald-400 font-medium">
                                        Contact Us
                                    </Link>
                                    <Link to="/careers" onClick={() => setMobileOpen(false)} className="hover:text-emerald-700 dark:hover:text-emerald-400 font-medium">
                                        Careers
                                    </Link>
                                    <a
                                        href="https://forms.gle/GCqvWiWqxwvDSzoZ6"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
                                    >
                                        Inquire Now &rarr;
                                    </a>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;