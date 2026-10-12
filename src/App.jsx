import { useEffect, useState, useCallback } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIChatbot from "@/components/AIChatbot/AIChatbot";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Vision from "@/pages/Vision";
import Why from "@/pages/Why";
import Industries from "@/pages/Industries";
import Solutions from "@/pages/Solutions";
import SolutionDetail from "@/pages/SolutionDetail";
import Academy from "@/pages/Academy";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Projects from "@/pages/Projects";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import PageSummarizer from "@/components/PageSummarizer/PageSummarizer";

import Landing from "@/pages/Landing";

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 120);
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);
    return null;
};

const useSmoothScroll = () => {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
        let raf;
        const loop = (time) => {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
        };
    }, []);
};

const Shell = ({ theme, onToggleTheme }) => {
    const { pathname } = useLocation();
    const isLanding = pathname === "/" || pathname === "/landing";

    return (
        <div className="flex min-h-screen flex-col">
            <ScrollToTop />
            {!isLanding && <Navbar theme={theme} onToggleTheme={onToggleTheme} />}
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/company" element={<About />} />
                    <Route path="/vision" element={<Vision />} />
                    <Route path="/why-gk-nexergy" element={<Why />} />
                    <Route path="/industries" element={<Industries />} />
                    <Route path="/solutions" element={<Solutions />} />
                    <Route path="/solutions/:slug" element={<SolutionDetail />} />
                    <Route path="/academy" element={<Academy />} />
                    <Route path="/academy/courses" element={<Courses />} />
                    <Route path="/academy/:slug" element={<CourseDetail />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </main>
            {!isLanding && <Footer theme={theme} />}
            {!isLanding && <AIChatbot theme={theme} />}
            <PageSummarizer theme={theme} />
        </div>
    );
};

function App() {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem("gk-theme");
        return saved === "light" ? "light" : "dark";
    });
    useSmoothScroll();

    useEffect(() => {
        const isDark = theme === "dark";
        document.documentElement.classList.toggle("dark", isDark);
        document.documentElement.classList.toggle("light", !isDark);
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("gk-theme", theme);
    }, [theme]);

    const onToggleTheme = useCallback(
        () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
        []
    );

    return (
        <BrowserRouter>
            <Shell theme={theme} onToggleTheme={onToggleTheme} />
        </BrowserRouter>
    );
}

export default App;
