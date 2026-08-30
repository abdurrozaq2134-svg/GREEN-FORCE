import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';

const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Services', href: '#', hasDropdown: true },
    { label: 'Reviews', href: '#' },
    { label: 'Contact us', href: '#' },
];

export default function NeuralynLanding() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const testimonialRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollY: scrollYHero } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });

    const { scrollY: scrollYTestimonial } = useScroll({
        target: containerRef,
        offset: ['start end', 'end center'],
    });

    const heroTextY = useTransform(scrollYHero, [0, 1], [0, -200]);
    const heroTextOpacity = useTransform(scrollYHero, [0, 0.5], [1, 0]);
    const dashboardImageY = useTransform(scrollYHero, [0, 1], [0, -250]);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans antialiased" style={{ backgroundColor: 'hsl(0 0% 0%)', color: 'hsl(0 0% 100%)' }}>
            <style jsx global>{`
                :root {
                    --background: 0 0% 0%;
                    --foreground: 0 0% 100%;
                    --muted: 0 0% 5%;
                    --muted-foreground: 0 0% 65%;
                    --card: 0 0% 5%;
                    --card-foreground: 0 0% 100%;
                    --border: 0 0% 20%;
                    --hero-subtitle: 210 17% 95%;
                    --radius: 0.5rem;
                }
                .liquid-glass {
                    background: rgba(255, 255, 255, 0.01);
                    background-blend-mode: luminosity;
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                    border: none;
                    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
                    position: relative;
                    overflow: hidden;
                }
                .liquid-glass::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: inherit;
                    padding: 1.4px;
                    background: linear-gradient(180deg,
                        rgba(255,255,255,0.45) 0%,
                        rgba(255,255,255,0.15) 20%,
                        rgba(255,255,255,0) 40%,
                        rgba(255,255,255,0) 60%,
                        rgba(255,255,255,0.15) 80%,
                        rgba(255,255,255,0.45) 100%);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    pointer-events: none;
                }
            `}</style>

            {/* Section 1: Hero */}
            <section
                ref={sectionRef}
                className="relative overflow-hidden min-h-screen flex flex-col"
                style={{ height: '100vh' }}
            >
                {/* Navbar */}
                <nav className="fixed top-0 left-0 right-0 z-50 px-8 md:px-28 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-12 md:gap-20">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="Neuralyn logo" className="w-8 h-8" />
                            <span className="text-xl font-bold tracking-tight">Neuralyn</span>
                        </div>
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                                >
                                    {link.label}
                                    {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="default" className="rounded-lg text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 transition-opacity">
                            Sign In
                        </Button>
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="flex flex-col items-center justify-center mt-16 md:mt-20 px-4 text-center relative z-10 flex-1">
                    {/* Tag Pill */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0 }}
                        className="liquid-glass px-3 py-2 rounded-lg mb-6 inline-flex items-center gap-2"
                        style={{ style: { backgroundColor: 'rgba(255,255,255,0.01)' } }}
                    >
                        <span className="bg-foreground text-background rounded-md text-sm font-medium px-2 py-0.5">
                            New
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                            Say Hello to Corewave v3.2
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-medium tracking-[-2px] leading-tight md:leading-[1.15] mb-3"
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 500,
                        }}
                    >
                        <span className="block">Your Insights.</span>
                        <span className="block font-serif italic font-normal" style={{ fontFamily: 'Instrument Serif, serif' }}>
                            One Clear Overview.
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg font-normal leading-6 mb-8 max-w-2xl"
                        style={{
                            color: 'hsl(var(--hero-subtitle))',
                            opacity: 0.9,
                        }}
                    >
                        Neuralyn helps teams track metrics, goals,<br />
                        and progress with precision.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-foreground text-background rounded-full px-8 py-3.5 text-base font-medium"
                        style={{
                            backgroundColor: 'hsl(var(--foreground))',
                            color: 'hsl(var(--background))',
                        }}
                    >
                        Get Started for Free
                    </motion.button>
                </div>

                {/* Dashboard + Video Area */}
                <div
                    ref={testimonialRef}
                    className="relative w-screen -ml-[calc(50vw-50%)] aspect-video overflow-hidden"
                    style={{
                        width: '100vw',
                        marginLeft: 'calc(-50vw + 50%)',
                        aspectRatio: '16/9',
                    }}
                >
                    {/* Background Video */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ zIndex: 0 }}
                    >
                        <source
                            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
                            type="video/mp4"
                        />
                    </video>

                    {/* Dashboard Image with Parallax */}
                    <motion.img
                        src="/hero-dashboard.png"
                        alt="Neuralyn Dashboard"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-5xl w-[90%] rounded-2xl"
                        style={{
                            mixBlendMode: 'luminosity',
                            zIndex: 1,
                        }}
                        style={dashboardImageY}
                    />

                    {/* Bottom Gradient Fade */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-30"
                        style={{
                            background: 'linear-gradient(to top, hsl(0 0% 0%), transparent)',
                        }}
                    />
                </div>

                {/* Parallax Motion Values */}
                <motion.div
                    style={{
                        y: heroTextY,
                        opacity: heroTextOpacity,
                    }}
                />
                <motion.div style={dashboardImageY} />
            </section>

            {/* Section 2: Testimonial */}
            <section
                ref={containerRef}
                className="relative min-h-screen py-24 md:py-32 px-8 md:px-28"
                style={{ backgroundColor: 'hsl(0 0% 0%)' }}
            >
                <div className="max-w-3xl mx-auto flex flex-col items-start gap-10">
                    {/* Quote Symbol */}
                    <img
                        src="/quote-symbol.png"
                        alt="Quote symbol"
                        className="w-14 h-10 object-contain"
                    />

                    {/* Testimonial Text with Scroll Reveal */}
                    <motion.div className="flex flex-wrap">
                        {testimonialWords.map((word, i) => (
                            <motion.span
                                key={i}
                                className="mr-[0.3em]"
                                style={{
                                    color: 'hsl(0 0% 100%)',
                                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                                    fontWeight: 500,
                                    lineHeight: 1.2,
                                }}
                                initial={{ opacity: 0.2, color: 'hsl(0 0% 35%)' }}
                                animate={{
                                    opacity: [0.2, 1],
                                    color: ['hsl(0 0% 35%)', 'hsl(0 0% 100%)'],
                                }}
                                transition={{
                                    duration: 0.8,
                                    delay: i * 0.05,
                                }}
                                style={{
                                    opacity: useTransform(scrollYTestimonial, [i / totalWords, (i + 1) / totalWords], [0.2, 1]),
                                    color: useTransform(scrollYTestimonial, [i / totalWords, (i + 1) / totalWords], ['hsl(0 0% 35%)', 'hsl(0 0% 100%)']),
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                        <span className="text-muted-foreground ml-2" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 500, lineHeight: 1.2 }}>
                            &ldquo;
                        </span>
                    </motion.div>

                    {/* Author Row */}
                    <div className="flex items-center gap-4">
                        <img
                            src="/testimonial-avatar.png"
                            alt="Brooklyn Simmons"
                            className="w-14 h-14 rounded-full border-[3px] border-foreground object-cover"
                        />
                        <div>
                            <p className="text-base font-semibold leading-7">Brooklyn Simmons</p>
                            <p className="text-sm font-normal leading-5 text-muted-foreground">Product Manager</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

const testimonialText = "Neuralyn revolutionized how we handle financial insights using smart analytics. We are now driving better outcomes quicker than we ever imagined! Neuralyn revolutionized how we handle financial insights using smart analytics.";

const testimonialWords = testimonialText.split(' ');
const totalWords = testimonialWords.length;