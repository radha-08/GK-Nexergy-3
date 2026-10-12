import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const CTABand = ({
    title = "Let's Build What Comes Next.",
    text = "Whether you want to build technology, develop talent or transform your business let's start the conversation.",
    primary = { label: "Talk to Us", to: "/contact" },
    secondary = { label: "Explore Academy", to: "/academy" },
    showStackButton = true,
}) => (
    <section className="relative overflow-hidden bg-[#ebe3d6] dark:bg-[#08090d] border-t border-amber-600/20 dark:border-emerald-500/20 transition-colors duration-300" data-testid="cta-band">
        {/* Ambient Glow Layers - No dark blue */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(217,119,6,0.12)_0%,transparent_50%),radial-gradient(circle_at_20%_80%,rgba(5,150,105,0.12)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.16)_0%,transparent_50%),radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.16)_0%,transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-grid-light opacity-25" />
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-amber-500/15 dark:bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-emerald-500/15 dark:bg-purple-500/15 blur-3xl" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
            <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-600/25 bg-amber-500/10 dark:border-emerald-500/30 dark:bg-emerald-500/10 px-3.5 py-1 text-xs font-bold tracking-wider text-amber-900 dark:text-emerald-300 uppercase mb-4 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Transform With Us
                </div>
                <h2 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
                    <span className="bg-gradient-to-r from-[#1c1917] via-[#059669] to-[#d97706] dark:from-white dark:via-emerald-200 dark:to-emerald-400 bg-clip-text text-transparent">
                        {title}
                    </span>
                </h2>
            </Reveal>

            <Reveal delay={0.12}>
                <p className="mt-6 max-w-3xl text-lg sm:text-xl lg:text-2xl leading-relaxed text-stone-700 dark:text-slate-300 font-normal">
                    {text}
                </p>
            </Reveal>

            <Reveal delay={0.22}>
                <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 items-center">
                    <Link
                        to={primary.to}
                        data-testid="cta-band-primary"
                        className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 dark:from-emerald-500 dark:via-teal-600 dark:to-emerald-600 px-8 py-3.5 font-display text-sm font-bold text-white transition-all duration-300 hover:from-emerald-500 hover:to-teal-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-600/30 text-center shadow-md shadow-emerald-950/20"
                    >
                        {primary.label}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </Link>

                    {secondary && (
                        <Link
                            to={secondary.to}
                            data-testid="cta-band-secondary"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-400/40 bg-[#fbf7f0] dark:bg-white/5 dark:border-white/20 backdrop-blur-md px-7 py-3.5 font-display text-sm font-bold text-[#1c1917] dark:text-white transition-all duration-300 hover:border-emerald-600/50 hover:text-emerald-800 dark:hover:bg-white/10 dark:hover:text-emerald-200 text-center hover:scale-[1.02] shadow-xs"
                        >
                            {secondary.label}
                        </Link>
                    )}

                    {showStackButton && (
                        <Link
                            to="/home#pages-stack-section"
                            data-testid="cta-band-stack"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-600/30 text-amber-900 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 dark:border-emerald-400/30 dark:text-emerald-200 px-6 py-3.5 font-display text-sm font-bold transition-all duration-300 text-center hover:scale-[1.02]"
                        >
                            <span>Back to Stack of Cards</span>
                        </Link>
                    )}
                </div>
            </Reveal>
        </div>
    </section>
);

export default CTABand;