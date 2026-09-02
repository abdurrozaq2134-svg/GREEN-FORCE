/**
 * Entry point for the immersive scroll showcase.
 *
 * Scroll position drives a keyframed camera rig; every value is damped per frame so
 * the camera scrubs with the scrollbar instead of snapping between sections.
 */

import { clamp, damp, lerp, smoothstep } from './showcase/math.js';
import { createScene } from './showcase/scene.js';

const PALETTE = {
    accent: '#8fd42e',
    cool: '#2ee0c0',
    warm: '#7c5cff',
};

/**
 * Art-directed camera path. `at` is normalised page scroll progress.
 *
 * @type {Array<{at: number, camera: number[], target: number[], explode: number, converge: number, glow: number, grid: number}>}
 */
const KEYFRAMES = [
    { at: 0.00, camera: [0.0, 0.9, 10.6], target: [0, 0.0, 0], explode: 0.00, converge: 0.00, glow: 0.55, grid: 0.85, pan: -2.2 },
    { at: 0.26, camera: [4.4, 1.5, 6.2], target: [0.2, 0.0, 0], explode: 0.12, converge: 0.00, glow: 0.75, grid: 1.00, pan: 1.6 },
    { at: 0.52, camera: [0.5, 0.3, 3.5], target: [0, 0.1, 0], explode: 1.00, converge: 0.00, glow: 1.30, grid: 0.50, pan: -0.7 },
    { at: 0.78, camera: [-5.1, 2.9, 5.6], target: [0, 0.2, 0], explode: 0.28, converge: 0.78, glow: 0.95, grid: 0.90, pan: 1.4 },
    { at: 1.00, camera: [0.0, 1.7, 13.2], target: [0, 0.0, 0], explode: 0.00, converge: 1.00, glow: 0.80, grid: 1.00, pan: 0.0 },
];

/**
 * Below this width the copy panel spans the column, so panning the rig would only
 * push the object off-screen — the composition stays centred instead.
 */
const PAN_MIN_WIDTH = 1024;

/**
 * Blends the keyframe track at a given scroll progress.
 *
 * @param {number} progress
 * @return {{camera: number[], target: number[], explode: number, converge: number, glow: number, grid: number}}
 */
function sampleKeyframes(progress) {
    const p = clamp(progress, 0, 1);

    let index = 0;
    while (index < KEYFRAMES.length - 2 && p > KEYFRAMES[index + 1].at) {
        index += 1;
    }

    const from = KEYFRAMES[index];
    const to = KEYFRAMES[index + 1];
    const span = Math.max(to.at - from.at, 0.0001);
    const t = smoothstep((p - from.at) / span);

    return {
        camera: [
            lerp(from.camera[0], to.camera[0], t),
            lerp(from.camera[1], to.camera[1], t),
            lerp(from.camera[2], to.camera[2], t),
        ],
        target: [
            lerp(from.target[0], to.target[0], t),
            lerp(from.target[1], to.target[1], t),
            lerp(from.target[2], to.target[2], t),
        ],
        explode: lerp(from.explode, to.explode, t),
        converge: lerp(from.converge, to.converge, t),
        glow: lerp(from.glow, to.glow, t),
        grid: lerp(from.grid, to.grid, t),
        pan: lerp(from.pan, to.pan, t),
    };
}

/**
 * Tracks 0..1 page scroll progress.
 *
 * Progress is read fresh every frame rather than cached from scroll events: a scroll
 * can land without a delivered event (restored position, programmatic jump, a scroll
 * that happened while the tab was hidden), and a cached value then leaves the camera
 * pointing at the wrong act. `scrollY` is free to read; `scrollHeight` forces layout,
 * so only that half is cached and refreshed on resize.
 *
 * @return {{value: function(): number, measure: function(): void}}
 */
function createScrollTracker() {
    let scrollable = 0;

    function measure() {
        scrollable = document.documentElement.scrollHeight - window.innerHeight;
    }

    measure();

    return {
        value() {
            return scrollable > 0 ? clamp(window.scrollY / scrollable, 0, 1) : 0;
        },
        measure,
    };
}

/**
 * Fades content in as it enters the viewport. Falls back to showing everything
 * immediately when IntersectionObserver is unavailable or motion is disabled.
 *
 * @param {boolean} motionEnabled
 * @return {{disconnect: function(): void}}
 */
function setupReveals(motionEnabled) {
    const targets = Array.from(document.querySelectorAll('[data-reveal]'));

    if (!motionEnabled || typeof IntersectionObserver === 'undefined') {
        targets.forEach((el) => el.classList.add('is-visible'));

        return { disconnect() {} };
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    targets.forEach((el) => observer.observe(el));

    return observer;
}

/**
 * Right-hand act rail: reflects progress and lets users jump between acts.
 *
 * @param {HTMLElement} root
 * @return {{update: function(number): void}}
 */
function setupActRail(root) {
    const buttons = Array.from(root.querySelectorAll('[data-act-index]'));
    const label = document.querySelector('[data-act-label]');
    const bar = root.querySelector('[data-act-bar]');
    const sections = Array.from(document.querySelectorAll('[data-act-section]'));

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const target = sections[Number(button.dataset.actIndex)];

            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    let current = -1;

    return {
        update(progress) {
            if (bar) {
                bar.style.transform = `scaleY(${clamp(progress, 0, 1)})`;
            }

            const index = clamp(
                Math.round(progress * (buttons.length - 1)),
                0,
                buttons.length - 1
            );

            if (index === current) {
                return;
            }

            current = index;
            buttons.forEach((button, i) => {
                const active = i === index;
                button.classList.toggle('is-active', active);
                button.setAttribute('aria-current', active ? 'true' : 'false');
            });

            if (label && buttons[index]) {
                label.textContent = buttons[index].dataset.actName || '';
            }
        },
    };
}

function boot() {
    const stage = document.querySelector('[data-showcase-stage]');
    const canvas = document.querySelector('[data-showcase-canvas]');
    const rail = document.querySelector('[data-act-rail]');
    const motionToggle = document.querySelector('[data-motion-toggle]');

    if (!stage || !canvas) {
        return;
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let motionEnabled = !reducedMotionQuery.matches;
    let reveals = setupReveals(motionEnabled);
    const actRail = rail ? setupActRail(rail) : { update() {} };

    document.body.classList.toggle('motion-off', !motionEnabled);

    const scroll = createScrollTracker();

    const scene = createScene(canvas, {
        ...PALETTE,
        quality: window.innerWidth < 768 || (navigator.hardwareConcurrency || 4) <= 4 ? 0 : 1,
    });

    if (!scene) {
        stage.classList.add('is-fallback');
        canvas.remove();
        const syncRail = () => {
            scroll.measure();
            actRail.update(scroll.value());
        };

        syncRail();
        window.addEventListener('scroll', () => actRail.update(scroll.value()), { passive: true });
        window.addEventListener('resize', syncRail);

        return;
    }

    stage.classList.add('is-live');

    const state = {
        time: 0,
        camera: [...KEYFRAMES[0].camera],
        target: [...KEYFRAMES[0].target],
        explode: 0,
        converge: 0,
        glow: KEYFRAMES[0].glow,
        gridOpacity: KEYFRAMES[0].grid,
        spin: 0,
    };

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let panScale = window.innerWidth >= PAN_MIN_WIDTH ? 1 : 0;
    let lastFrame = performance.now();
    let frameHandle = 0;
    let running = false;

    /**
     * @param {number} delta Seconds.
     * @param {boolean} immediate Snap instead of damping (first frame, or motion off).
     */
    function step(delta, immediate) {
        const progress = scroll.value();
        const keyed = sampleKeyframes(progress);
        const ease = immediate ? 1 : 0;

        const settle = (current, next, smoothing) => (
            ease ? next : damp(current, next, smoothing, delta)
        );

        const parallaxX = pointer.x * 0.9;
        const parallaxY = pointer.y * 0.55;
        const pan = keyed.pan * panScale;

        state.camera[0] = settle(state.camera[0], keyed.camera[0] + pan + parallaxX, 0.22);
        state.camera[1] = settle(state.camera[1], keyed.camera[1] + parallaxY, 0.22);
        state.camera[2] = settle(state.camera[2], keyed.camera[2], 0.22);
        state.target[0] = settle(state.target[0], keyed.target[0] + pan, 0.3);
        state.target[1] = settle(state.target[1], keyed.target[1], 0.3);
        state.target[2] = settle(state.target[2], keyed.target[2], 0.3);
        state.explode = settle(state.explode, keyed.explode, 0.16);
        state.converge = settle(state.converge, keyed.converge, 0.2);
        state.glow = settle(state.glow, keyed.glow, 0.25);
        state.gridOpacity = settle(state.gridOpacity, keyed.grid, 0.25);
        state.spin = state.time * 0.12 + progress * 2.6;
    }

    function frame(now) {
        const delta = Math.min((now - lastFrame) / 1000, 0.05);
        lastFrame = now;
        state.time += delta;

        pointer.x = damp(pointer.x, pointer.targetX, 0.24, delta);
        pointer.y = damp(pointer.y, pointer.targetY, 0.24, delta);

        step(delta, false);
        actRail.update(scroll.value());
        scene.render(state);

        frameHandle = window.requestAnimationFrame(frame);
    }

    function start() {
        if (running || !motionEnabled) {
            return;
        }

        running = true;
        lastFrame = performance.now();
        frameHandle = window.requestAnimationFrame(frame);
    }

    function stop() {
        running = false;
        window.cancelAnimationFrame(frameHandle);
    }

    /** Renders exactly one composed frame — used when motion is switched off. */
    function renderStatic() {
        state.time = 6.2;
        pointer.x = 0;
        pointer.y = 0;
        step(0, true);
        scene.render(state);
    }

    function applyMotionPreference(enabled) {
        motionEnabled = enabled;
        document.body.classList.toggle('motion-off', !enabled);

        if (motionToggle) {
            motionToggle.setAttribute('aria-pressed', String(enabled));
            motionToggle.querySelector('[data-motion-label]').textContent = enabled
                ? 'Animasi aktif'
                : 'Animasi mati';
        }

        reveals.disconnect();
        reveals = setupReveals(enabled);

        if (enabled) {
            start();
        } else {
            stop();
            renderStatic();
        }
    }

    // The running loop reads scroll progress itself; this listener only covers the
    // motion-off case, where there is no loop to pick the change up.
    window.addEventListener('scroll', () => {
        actRail.update(scroll.value());

        if (!motionEnabled) {
            renderStatic();
        }
    }, { passive: true });

    // A resize changes the scrollable height, so the progress the rail shows — and the
    // keyframe the camera sits on — both have to be recomputed, not just the viewport.
    function handleResize() {
        scene.resize();
        scroll.measure();
        panScale = window.innerWidth >= PAN_MIN_WIDTH ? 1 : 0;
        actRail.update(scroll.value());

        if (!motionEnabled) {
            renderStatic();
        }
    }

    window.addEventListener('resize', handleResize);

    // The canvas can change size without the window doing so — a docked devtools pane,
    // an embedding iframe, the mobile URL bar collapsing. Missing those leaves the
    // drawing buffer at a stale size and the browser stretches the frame off-centre.
    if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(handleResize).observe(canvas);
    }

    // Pointer parallax stays subtle: it nudges the rig, it never steers it.
    window.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'mouse') {
            return;
        }

        pointer.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
        pointer.targetY = -(event.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // A hidden page dispatches no scroll events, so `progress` can be stale by the time
    // it comes back (restored tab, background scroll). Re-read before resuming.
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stop();

            return;
        }

        scroll.measure();
        actRail.update(scroll.value());

        if (motionEnabled) {
            start();
        } else {
            renderStatic();
        }
    });

    canvas.addEventListener('webglcontextlost', (event) => {
        event.preventDefault();
        stop();
        stage.classList.add('is-fallback');
    });

    if (motionToggle) {
        motionToggle.addEventListener('click', () => applyMotionPreference(!motionEnabled));
    }

    reducedMotionQuery.addEventListener('change', (event) => applyMotionPreference(!event.matches));

    scroll.measure();
    actRail.update(scroll.value());
    step(0, true);
    scene.render(state);
    applyMotionPreference(motionEnabled);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
    boot();
}
