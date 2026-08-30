import { useEffect, useRef } from 'react';
import danish from '../../svg/danish.svg';
import danish2 from '../../svg/danish-2.svg';
import dsanish2 from '../../svg/dsanish-2.svg';
import group5 from '../../svg/group-5.svg';
import image from '../../svg/image.svg';
import poweredBy from '../../svg/powered-by.svg';
import vector from '../../svg/vector.svg';
import vector14 from '../../svg/vector-14.svg';
import vector251 from '../../svg/vector-25-1.svg';

const decorativeImages = [
    {
        src: danish2,
        alt: '',
        className: 'absolute top-[368px] left-[1129px] w-[484px] h-[423px] opacity-30 float',
        style: { animationDelay: '0.5s' },
    },
    {
        src: dsanish2,
        alt: '',
        className: 'absolute w-[35.95%] h-[29.57%] top-[70.43%] left-[64.05%] opacity-25 float-delay-2',
    },
    {
        src: vector251,
        alt: '',
        className: 'absolute top-[674px] left-[1322px] w-[648px] h-[459px] opacity-20',
    },
    {
        src: danish,
        alt: '',
        className: 'absolute w-full h-[32.53%] top-[67.47%] left-0 opacity-15',
    },
    {
        src: vector,
        alt: '',
        className: 'absolute w-[47.44%] h-[24.91%] top-[75.09%] left-[52.56%] opacity-20 float',
        style: { animationDelay: '1s' },
    },
];

/**
 * Low-poly character illustration (inline SVG, green palette).
 * Based on: young man with green beanie, spiky green hair, pale skin,
 * angular eyes, green jacket, holding a green lizard/dragon.
 */
function LowPolyCharacter() {
    return (
        <svg
            viewBox="0 0 500 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-full h-full"
        >
            <defs>
                <linearGradient id="grad-jacket" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#436850" />
                    <stop offset="100%" stopColor="#12372A" />
                </linearGradient>
                <linearGradient id="grad-hair" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
                <linearGradient id="grad-beanie" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a4d1a" />
                    <stop offset="100%" stopColor="#12372A" />
                </linearGradient>
            </defs>

            {/* Body / Jacket */}
            <polygon points="220,300 280,310 270,470 230,480" fill="url(#grad-jacket)" />
            <polygon points="230,440 270,450 250,560 200,540" fill="#12372A" />
            <polygon points="250,440 300,480 250,520 220,470" fill="#12372A" />
            <polygon points="225,460 245,470 245,500 215,490" fill="#436850" />
            <polygon points="260,470 278,485 270,510 245,495" fill="#436850" />

            {/* Head (pale) */}
            <polygon points="200,260 240,255 220,310" fill="#dcfce7" />
            <polygon points="240,255 260,265 220,310" fill="#bbf7d0" />
            <polygon points="220,260 260,265 260,295 220,295" fill="#dcfce7" />
            <polygon points="260,265 280,290 260,295" fill="#bbf7d0" />
            <polygon points="200,260 220,310 200,295" fill="#bbf7d0" />

            {/* Ear */}
            <polygon points="205,275 220,280 210,295" fill="#bbf7d0" />

            {/* Beanie */}
            <polygon points="190,240 270,235 260,265 200,270" fill="url(#grad-beanie)" />
            <polygon points="200,270 260,265 250,285 210,290" fill="#12372A" />

            {/* Spiky hair */}
            <polygon points="200,225 215,210 230,230" fill="url(#grad-hair)" />
            <polygon points="230,215 245,205 260,225" fill="url(#grad-hair)" />
            <polygon points="265,215 275,200 285,220" fill="url(#grad-hair)" />
            <polygon points="185,235 175,215 195,225" fill="url(#grad-hair)" />
            <polygon points="170,245 155,225 180,240" fill="url(#grad-hair)" />

            {/* Eyes (angular) */}
            <polygon points="218,292 232,290 236,298 222,300" fill="#12372A" />
            <polygon points="242,292 256,290 260,298 246,300" fill="#12372A" />
            <polygon points="224,294 228,293 230,296" fill="#dcfce7" />
            <polygon points="248,294 252,293 254,296" fill="#dcfce7" />

            {/* Mouth */}
            <path d="M230,305 Q240,308 250,305" stroke="#16a34a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Neck */}
            <polygon points="245,310 255,310 255,330 245,330" fill="#bbf7d0" />

            {/* Arms */}
            <polygon points="200,330 215,345 210,380 195,370" fill="url(#grad-jacket)" />
            <polygon points="215,345 235,360 210,385 195,375" fill="#12372A" />
            <polygon points="285,330 300,340 295,375 280,370" fill="#436850" />
            <polygon points="300,340 312,355 295,380 285,375" fill="#12372A" />

            {/* Hands */}
            <polygon points="198,368 210,375 208,383 196,378" fill="#dcfce7" />
            <polygon points="282,370 295,378 293,388 280,380" fill="#dcfce7" />

            {/* Lizard held in left hand */}
            <g transform="translate(175, 388)">
                <polygon points="20,8 35,10 40,22 25,25" fill="url(#grad-hair)" />
                <polygon points="25,25 40,22 30,30 15,28" fill="#4ade80" />
                <polygon points="15,28 5,35 10,22 20,25" fill="#16a34a" />
                <polygon points="40,12 55,10 58,18 42,20" fill="url(#grad-hair)" />
                <polygon points="48,6 52,2 56,8" fill="#12372A" />
                <polygon points="50,6 54,1 58,8" fill="#12372A" />
                <polygon points="50,15 53,14 54,17 51,18" fill="#12372A" />
            </g>

            {/* Jacket collar */}
            <polygon points="240,310 260,310 270,325 230,325" fill="#12372A" />
        </svg>
    );
}

/**
 * GreenCreativeLanding — Full-page animated landing page.
 *
 * Visual: gradient background (cream → sage → forest → dark),
 * staggered hero text "LETS CREATE OUR DESIGN INTO WEBSITES",
 * "Create New Website" CTA with glow, floating decorative SVGs,
 * low-poly character illustration, particle canvas, parallax layers.
 */
export default function GreenCreativeLanding() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) return;

        /* ---------- Particle canvas ---------- */
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);

            const particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
            for (let i = 0; i < 80; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speed: Math.random() * 0.35 + 0.1,
                    opacity: Math.random() * 0.3 + 0.08,
                });
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (const p of particles) {
                    p.y += p.speed;
                    if (p.y > canvas.height) {
                        p.y = -5;
                        p.x = Math.random() * canvas.width;
                    }
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(34, 197, 94, ${p.opacity})`;
                    ctx.fill();
                }
                requestAnimationFrame(animate);
            }
            animate();
        }

        /* ---------- Staggered word reveal ---------- */
        const textContainer = textRef.current;
        if (textContainer) {
            const spans = textContainer.querySelectorAll('span[data-word]');
            spans.forEach((span, i) => {
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                }, 300 + i * 120);
            });
        }
    }, []);

    return (
        <main className="relative w-full min-h-screen bg-hero-gradient text-foreground font-sans antialiased overflow-x-hidden">
            {/* Particle canvas */}
            <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />

            {/* Parallax background layers */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-10 w-20 h-20 opacity-20">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="40,5 75,40 40,75 5,40" fill="#22c55e" />
                    </svg>
                </div>
                <div className="absolute top-2/3 right-1/4 w-16 h-16 opacity-15">
                    <svg width="64, 64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="32,3 58,30 46,58 18,58 4,30" fill="#4ade80" />
                    </svg>
                </div>
                <div className="absolute bottom-1/4 left-1/3 w-24 h-24 opacity-10">
                    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="48,2 82,32 70,82 26,82 14,32" fill="#16a34a" />
                    </svg>
                </div>
            </div>

            {/* Low-poly character (background, right side) */}
            <div className="fixed bottom-0 right-0 w-[500px] h-[700px] opacity-60 pointer-events-none z-0 hidden lg:block">
                <LowPolyCharacter />
            </div>

            {/* Hero section */}
            <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20 pb-24">
                <div ref={textRef} className="text-center max-w-6xl mx-auto mb-12">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-center gap-4 md:gap-8 flex-wrap">
                        <span data-word className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-green-200 drop-shadow-2xl"
                              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '-0.03em', opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease-out' }}>
                            LETS
                        </span>
                        <span data-word className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-green-300 drop-shadow-2xl"
                              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '-0.03em', opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease-out' }}>
                            CREATE
                        </span>
                        <span data-word className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-green-100 drop-shadow-2xl"
                              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '-0.03em', opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease-out' }}>
                            OUR
                        </span>
                        <span data-word className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-green-200 drop-shadow-2xl"
                              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '-0.03em', opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease-out' }}>
                            DESIGN
                        </span>
                        <span data-word className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-green-300 drop-shadow-2xl"
                              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '-0.03em', opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease-out' }}>
                            INTO
                        </span>
                        <span data-word className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-green-100 drop-shadow-2xl"
                              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '-0.03em', opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s ease-out' }}>
                            WEBSITES
                        </span>
                    </div>
                </div>

                <p className="text-lg md:text-xl text-green-100 mb-12 max-w-2xl mx-auto drop-shadow-lg leading-relaxed animate-fade-up"
                   style={{ animationDelay: '0.8s' }}>
                    Wujudkan pengalaman event unik dengan desain yang terinspirasi dari alam.
                    Dari ide hingga publikasi — semua dalam satu platform yang intuitif dan estetik.
                </p>

                <a href="/register"
                   className="btn-cta btn-primary group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-3xl text-xl font-bold text-white transition-all duration-500 overflow-hidden animate-fade-up"
                   style={{ animationDelay: '1s' }}>
                    <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="absolute inset-0 bg-white/20 rounded-3xl animate-shimmer" style={{ '--shimmer-width': '80px' } as React.CSSProperties} />
                    </span>
                    <span className="relative z-10 flex items-center gap-2">
                        <span>Buat Website Sekarang</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                    </span>
                </a>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-green-300 animate-fade-up"
                     style={{ animationDelay: '1.2s' }}>
                    <span className="text-xs uppercase tracking-widest">Gulir untuk melanjutkan</span>
                    <div className="w-0.5 h-14 bg-gradient-to-b from-green-300 to-transparent rounded-full animate-bounce-slow" />
                </div>
            </section>

            {/* Decorative composition (from original Box component) */}
            <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
                {decorativeImages.map((img, i) => (
                    <img
                        key={i}
                        src={img.src}
                        alt={img.alt}
                        className={img.className}
                        style={img.style}
                    />
                ))}
                <img src={vector14} alt="" className="absolute top-[674px] left-[1322px] w-[648px] h-[459px] opacity-25" />
                <img src={group5} alt="" className="absolute top-[43px] left-[1695px] w-[201px] h-[129px] opacity-40" />
                <img src={poweredBy} alt="" className="absolute top-[43px] left-[83px] w-[57px] h-[20px] opacity-60" />
            </div>
        </main>
    );
}
