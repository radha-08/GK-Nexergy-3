import Marquee from "react-fast-marquee";
import { Sparkles } from "lucide-react";

const EditorialMarquee = ({ className = "" }) => (
    <div
        className={`relative overflow-hidden border-y border-[#dfd5c4] bg-gradient-to-r from-[#f0e6d6]/95 via-[#fbf7f0] to-[#f0e6d6]/95 py-6 sm:py-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_20px_-4px_rgba(120,53,15,0.06)] dark:border-emerald-500/25 dark:from-[#08090d] dark:via-[#12141c] dark:to-[#08090d] dark:shadow-[0_12px_36px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] ${className}`}
        data-testid="editorial-marquee"
    >
        {/* Subtle background ambient glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,150,105,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.14)_0%,transparent_70%)]" />

        {/* Gradient edge mask to smoothly fade in/out at left and right */}
        <div
            style={{
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
        >
            <Marquee speed={34} gradient={false} pauseOnHover={false}>
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="mx-8 sm:mx-12 flex items-center gap-8 sm:gap-12">
                        {/* Phrase with rich typography and glowing gradient accent */}
                        <div className="flex items-center gap-2.5 sm:gap-3.5 font-display text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-wide uppercase">
                            <span className="text-stone-900 dark:text-white">
                                Your
                            </span>
                            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-amber-300 dark:drop-shadow-[0_0_20px_rgba(16,185,129,0.45)]">
                                IT Success
                            </span>
                            <span className="text-stone-800 dark:text-white/90">
                                Designed
                            </span>
                            <span className="text-emerald-700 dark:text-emerald-400 dark:drop-shadow-[0_0_15px_rgba(16,185,129,0.35)]">
                                Blueprint
                            </span>
                        </div>

                        {/* Luxury divider element */}
                        <div className="flex items-center gap-2.5 opacity-90">
                            <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-emerald-500/50 dark:to-emerald-400/60" />
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 border border-emerald-300/80 text-emerald-700 shadow-sm dark:bg-emerald-950/80 dark:border-emerald-500/40 dark:text-emerald-300 dark:shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                                <Sparkles className="h-3.5 w-3.5" />
                            </div>
                            <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-emerald-500/50 dark:to-emerald-400/60" />
                        </div>
                    </div>
                ))}
            </Marquee>
        </div>
    </div>
);

export default EditorialMarquee;
