import { GraduationCap, Lightbulb, FlaskConical, Briefcase, DoorOpen, Handshake, Users, Globe2, Target } from "lucide-react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import FlowSteps from "../components/FlowSteps";
import Reveal from "../components/Reveal";

const highlights = [
    { icon: GraduationCap, title: "Quality Technology Education", text: "Learning designed around what industry actually needs — not outdated syllabi." },
    { icon: Lightbulb, title: "Innovation", text: "Emerging technologies explored through practical, hands-on work." },
    { icon: FlaskConical, title: "Practical Learning", text: "Skills built by doing — labs, projects and real problem solving." },
    { icon: Briefcase, title: "Real-World Experience", text: "Exposure to how technology is delivered in actual organisations." },
    { icon: DoorOpen, title: "Employment Opportunities", text: "Connecting skills to genuine pathways into the technology industry." },
    { icon: Handshake, title: "Industry Collaboration", text: "Working alongside businesses so learning stays relevant and current." },
    { icon: Users, title: "Inclusive Growth", text: "Opening technology careers to local, rural and underserved communities." },
    { icon: Globe2, title: "Digital Economy", text: "Contributing to a stronger, future-ready digital economy for all." },
];

const Vision = () => (
    <>
        <SEO
            title="Vision & Mission | GK Nexergy"
            description="Building a future-ready technology ecosystem — quality technology education, innovation, practical learning and inclusive growth."
        />
        <PageHero
            eyebrow="Vision & Mission"
            titleLines={["Building a Future-Ready", "Technology Ecosystem"]}
            description="Our vision is a connected ecosystem where quality technology education, innovation and real-world experience create opportunity — for individuals, for businesses and for the wider digital economy."
            testId="vision-hero"
        />

        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-28" data-testid="vision-highlights">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {highlights.map((h, i) => (
                    <Reveal key={h.title} delay={(i % 4) * 0.08}>
                        <div className="h-full rounded-2xl border border-amber-600/20 bg-[#fbf7f0] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-white/10 dark:bg-card/90 dark:hover:border-emerald-400/40 flex flex-col">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300 shrink-0 mb-4">
                                <h.icon className="h-5 w-5" strokeWidth={1.8} />
                            </div>
                            <h3 className="font-display text-base font-bold text-ink dark:text-white">{h.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 flex-1">{h.text}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>


        <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 sm:py-20" data-testid="vision-mission">
            <Reveal>
                <div className="relative overflow-hidden grid gap-8 rounded-3xl border border-amber-600/20 bg-gradient-to-br from-[#fbf7f0] to-[#f5ede2] p-8 dark:border-emerald-500/20 dark:from-card dark:to-[#0e1017] sm:p-12 lg:grid-cols-12 shadow-lg shadow-amber-900/5 dark:shadow-black/50">
                    <div className="lg:col-span-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/25 mb-4">
                            <Target className="h-6 w-6" strokeWidth={2} />
                        </div>
                        <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink dark:text-white sm:text-3xl">
                            Our Mission
                        </h2>
                    </div>
                    <div className="lg:col-span-8 flex items-center">
                        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200 sm:text-lg font-medium">
                            To train people with industry-relevant technology skills, build dependable software and digital solutions for businesses, and help organisations transform through the right use of AI, data, cloud and automation — connecting people, technology and business to create lasting opportunity for communities.
                        </p>
                    </div>
                </div>
            </Reveal>
        </section>
        <CTABand />
    </>
);

export default Vision;
