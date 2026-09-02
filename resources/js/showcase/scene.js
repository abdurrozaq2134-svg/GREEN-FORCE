/**
 * The showcase WebGL2 scene: a faceted core that shatters and re-forms, an orbiting
 * shard field, a procedural grid floor and a depth-layered star field.
 *
 * Written against raw WebGL2 rather than a 3D library so the page adds no runtime
 * dependency to the project.
 */

import {
    buildShardInstances,
    buildShardMesh,
    buildShatterSphere,
    buildStarField,
    buildWireShell,
} from './geometry.js';
import { lookAt, mat4, modelMatrix, perspective } from './math.js';

/** Shared GLSL prelude: Rodrigues rotation reused by the core and the shards. */
const ROTATION_CHUNK = `
mat3 rotationAroundAxis(vec3 axis, float angle) {
    vec3 a = normalize(axis);
    float c = cos(angle);
    float s = sin(angle);
    float t = 1.0 - c;

    return mat3(
        t * a.x * a.x + c,       t * a.x * a.y + s * a.z, t * a.x * a.z - s * a.y,
        t * a.x * a.y - s * a.z, t * a.y * a.y + c,       t * a.y * a.z + s * a.x,
        t * a.x * a.z + s * a.y, t * a.y * a.z - s * a.x, t * a.z * a.z + c
    );
}
`;

const CORE_VERTEX = `#version 300 es
precision highp float;

in vec3 aPosition;
in vec3 aNormal;
in vec3 aCentroid;
in float aSeed;

uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uModel;
uniform float uTime;
uniform float uExplode;

out vec3 vNormal;
out vec3 vWorld;
out float vSeed;
out float vDisplace;
${ROTATION_CHUNK}
void main() {
    vec3 axis = vec3(
        sin(aSeed * 12.9898) ,
        cos(aSeed * 78.233),
        sin(aSeed * 43.7561 + 1.3)
    );

    float shatter = uExplode * (2.4 + aSeed * 5.2);
    mat3 spin = rotationAroundAxis(axis + vec3(0.001), shatter);

    vec3 local = spin * (aPosition - aCentroid);
    float push = uExplode * (0.85 + aSeed * 2.35);

    // Breathing keeps the assembled state alive instead of looking frozen.
    float breathe = 0.045 * sin(uTime * 1.3 + aSeed * 6.2831) * (1.0 - uExplode);

    vec3 displaced = aCentroid * (1.0 + push + breathe) + local;
    vec4 world = uModel * vec4(displaced, 1.0);

    vWorld = world.xyz;
    vNormal = mat3(uModel) * (spin * aNormal);
    vSeed = aSeed;
    vDisplace = push;

    gl_Position = uProjection * uView * world;
}
`;

const CORE_FRAGMENT = `#version 300 es
precision highp float;

in vec3 vNormal;
in vec3 vWorld;
in float vSeed;
in float vDisplace;

uniform vec3 uCamera;
uniform vec3 uAccent;
uniform vec3 uCool;
uniform vec3 uWarm;
uniform float uExplode;

out vec4 outColor;

void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(uCamera - vWorld);
    float facing = max(dot(N, V), 0.0);
    float fresnel = pow(1.0 - facing, 2.6);

    vec3 keyLight = normalize(vec3(0.55, 0.85, 0.45));
    vec3 fillLight = normalize(vec3(-0.7, -0.2, -0.5));
    float key = max(dot(N, keyLight), 0.0);
    float fill = max(dot(N, fillLight), 0.0);

    // Iridescence: the facet index and its orientation pick a point on the ramp.
    float ramp = 0.5 + 0.5 * sin(vSeed * 6.2831 + dot(N, vec3(1.7, 2.3, 1.1)));
    vec3 body = mix(uCool, uWarm, ramp);

    vec3 color = body * (0.06 + key * 0.42 + fill * 0.12);
    color += uAccent * fresnel * 1.35;
    color += uAccent * smoothstep(0.55, 1.0, vDisplace) * 0.5;
    color += mix(vec3(0.0), uAccent * 0.55, uExplode) * (0.2 + 0.8 * fresnel);

    outColor = vec4(color, 1.0);
}
`;

const SHARD_VERTEX = `#version 300 es
precision highp float;

in vec3 aPosition;
in vec3 aNormal;
in vec4 aOrbit;
in vec4 aProps;

uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uModel;
uniform float uTime;
uniform float uDisperse;
uniform float uConverge;

out vec3 vNormal;
out vec3 vWorld;
out float vMix;
${ROTATION_CHUNK}
void main() {
    float angle = aOrbit.z + uTime * aOrbit.y * 3.2;
    vec3 orbit = vec3(cos(angle) * aOrbit.x, aProps.w, sin(angle) * aOrbit.x);

    float ct = cos(aOrbit.w);
    float st = sin(aOrbit.w);
    orbit = vec3(orbit.x, orbit.y * ct - orbit.z * st, orbit.y * st + orbit.z * ct);

    orbit *= mix(1.0, 1.85, uDisperse);
    orbit = mix(orbit, normalize(orbit + vec3(0.0001)) * 1.35, uConverge);

    mat3 spin = rotationAroundAxis(
        vec3(aProps.y + 0.35, 1.0, aProps.z * 0.5),
        uTime * aProps.z + aOrbit.z
    );

    vec3 local = spin * (aPosition * aProps.x * mix(1.0, 1.7, uConverge));
    vec4 world = uModel * vec4(orbit + local, 1.0);

    vWorld = world.xyz;
    vNormal = mat3(uModel) * (spin * aNormal);
    vMix = aProps.y;

    gl_Position = uProjection * uView * world;
}
`;

const SHARD_FRAGMENT = `#version 300 es
precision highp float;

in vec3 vNormal;
in vec3 vWorld;
in float vMix;

uniform vec3 uCamera;
uniform vec3 uAccent;
uniform vec3 uCool;
uniform vec3 uWarm;

out vec4 outColor;

void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(uCamera - vWorld);
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.0);
    float key = max(dot(N, normalize(vec3(0.5, 0.9, 0.35))), 0.0);

    vec3 tint = mix(uCool, uWarm, vMix);
    vec3 color = tint * (0.12 + key * 0.55) + uAccent * fresnel * 1.1;

    outColor = vec4(color, 1.0);
}
`;

const WIRE_VERTEX = `#version 300 es
precision highp float;

in vec3 aPosition;

uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uModel;
uniform float uScale;

out vec3 vWorld;

void main() {
    vec4 world = uModel * vec4(aPosition * uScale, 1.0);
    vWorld = world.xyz;

    gl_Position = uProjection * uView * world;
}
`;

const WIRE_FRAGMENT = `#version 300 es
precision highp float;

in vec3 vWorld;

uniform vec3 uCamera;
uniform vec3 uAccent;
uniform float uOpacity;

out vec4 outColor;

void main() {
    float depth = length(uCamera - vWorld);
    float fade = 1.0 - smoothstep(3.0, 15.0, depth);

    outColor = vec4(uAccent * (0.35 + fade * 0.65), uOpacity * (0.2 + fade * 0.8));
}
`;

const GRID_VERTEX = `#version 300 es
precision highp float;

in vec2 aCorner;

uniform mat4 uProjection;
uniform mat4 uView;
uniform float uExtent;
uniform float uHeight;

out vec3 vWorld;

void main() {
    vWorld = vec3(aCorner.x * uExtent, uHeight, aCorner.y * uExtent);

    gl_Position = uProjection * uView * vec4(vWorld, 1.0);
}
`;

const GRID_FRAGMENT = `#version 300 es
precision highp float;

in vec3 vWorld;

uniform vec3 uAccent;
uniform float uTime;
uniform float uOpacity;

out vec4 outColor;

void main() {
    vec2 cell = vWorld.xz * 0.5;
    vec2 grid = abs(fract(cell - 0.5) - 0.5) / fwidth(cell);
    float line = 1.0 - min(min(grid.x, grid.y), 1.0);

    float radius = length(vWorld.xz);
    float falloff = 1.0 - smoothstep(5.0, 30.0, radius);
    float ripple = 0.55 + 0.45 * sin(uTime * 0.7 - radius * 0.42);
    float pool = exp(-radius * 0.17);

    float alpha = (line * falloff * (0.2 + 0.35 * ripple) + pool * 0.12) * uOpacity;
    vec3 color = uAccent * (0.4 + line * 0.6 + pool * 1.6);

    outColor = vec4(color, clamp(alpha, 0.0, 1.0));
}
`;

const STAR_VERTEX = `#version 300 es
precision highp float;

in vec3 aPosition;
in vec3 aProps;

uniform mat4 uProjection;
uniform mat4 uView;
uniform float uTime;
uniform float uPixelRatio;

out float vBrightness;

void main() {
    vec3 drift = vec3(
        sin(uTime * 0.05 + aProps.z) * 0.4,
        cos(uTime * 0.04 + aProps.z) * 0.3,
        0.0
    );

    vec4 clip = uProjection * uView * vec4(aPosition + drift, 1.0);

    gl_Position = clip;
    gl_PointSize = aProps.x * uPixelRatio * (26.0 / max(clip.w, 0.6));
    vBrightness = aProps.y * (0.55 + 0.45 * sin(uTime * 1.6 + aProps.z));
}
`;

const STAR_FRAGMENT = `#version 300 es
precision highp float;

in float vBrightness;

uniform vec3 uAccent;
uniform float uOpacity;

out vec4 outColor;

void main() {
    float d = length(gl_PointCoord - 0.5);
    float sprite = smoothstep(0.5, 0.0, d);
    vec3 color = mix(vec3(0.62, 0.72, 0.68), uAccent, vBrightness * 0.55);

    outColor = vec4(color * sprite * vBrightness * uOpacity, sprite * uOpacity);
}
`;

const GLOW_VERTEX = `#version 300 es
precision highp float;

in vec2 aCorner;

uniform mat4 uProjection;
uniform mat4 uView;
uniform float uSize;

out vec2 vUv;

void main() {
    // Billboard: rebuild the camera basis from the view matrix rows.
    vec3 right = vec3(uView[0][0], uView[1][0], uView[2][0]);
    vec3 up = vec3(uView[0][1], uView[1][1], uView[2][1]);
    vec3 world = (right * aCorner.x + up * aCorner.y) * uSize;

    vUv = aCorner;

    gl_Position = uProjection * uView * vec4(world, 1.0);
}
`;

const GLOW_FRAGMENT = `#version 300 es
precision highp float;

in vec2 vUv;

uniform vec3 uAccent;
uniform float uIntensity;

out vec4 outColor;

void main() {
    float d = clamp(length(vUv), 0.0, 1.0);
    float halo = pow(1.0 - d, 3.2);
    float core = pow(1.0 - d, 12.0);

    outColor = vec4(uAccent * (halo * 0.55 + core * 1.4) * uIntensity, 1.0);
}
`;

/**
 * @param {WebGL2RenderingContext} gl
 * @param {number} type
 * @param {string} source
 * @return {WebGLShader}
 */
function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);

        throw new Error(`Shader compile failed: ${log}`);
    }

    return shader;
}

/**
 * @param {WebGL2RenderingContext} gl
 * @param {string} vertexSource
 * @param {string} fragmentSource
 * @return {{program: WebGLProgram, uniform: function(string): WebGLUniformLocation, attribute: function(string): number}}
 */
function createProgram(gl, vertexSource, fragmentSource) {
    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram();

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);

        throw new Error(`Program link failed: ${log}`);
    }

    const uniforms = new Map();
    const attributes = new Map();

    return {
        program,
        uniform(name) {
            if (!uniforms.has(name)) {
                uniforms.set(name, gl.getUniformLocation(program, name));
            }

            return uniforms.get(name);
        },
        attribute(name) {
            if (!attributes.has(name)) {
                attributes.set(name, gl.getAttribLocation(program, name));
            }

            return attributes.get(name);
        },
    };
}

/**
 * @param {WebGL2RenderingContext} gl
 * @param {Float32Array} data
 * @return {WebGLBuffer}
 */
function createBuffer(gl, data) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    return buffer;
}

/**
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLBuffer} buffer
 * @param {number} location
 * @param {number} size
 * @param {number} divisor
 */
function bindAttribute(gl, buffer, location, size, divisor = 0) {
    if (location < 0) {
        return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(location, divisor);
}

/**
 * @param {string} hex
 * @return {number[]} Linear-ish RGB in 0..1.
 */
function hexToRgb(hex) {
    const value = parseInt(hex.replace('#', ''), 16);

    return [
        ((value >> 16) & 255) / 255,
        ((value >> 8) & 255) / 255,
        (value & 255) / 255,
    ];
}

/**
 * Creates the scene. Returns null when WebGL2 is unavailable so the caller can fall
 * back to the CSS-only poster.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {{accent: string, cool: string, warm: string, quality: number}} options
 * @return {{render: function(Object): void, resize: function(): void, dispose: function(): void}|null}
 */
export function createScene(canvas, options) {
    const gl = canvas.getContext('webgl2', {
        antialias: true,
        alpha: false,
        depth: true,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
    });

    if (!gl) {
        return null;
    }

    const quality = options.quality;
    const accent = hexToRgb(options.accent);
    const cool = hexToRgb(options.cool);
    const warm = hexToRgb(options.warm);

    const core = buildShatterSphere(quality >= 1 ? 3 : 2, 1.55);
    const wire = buildWireShell(1, 1.0);
    const shardMesh = buildShardMesh();
    const shardInstances = buildShardInstances(quality >= 1 ? 96 : 44);
    const stars = buildStarField(quality >= 1 ? 1400 : 600);
    const quadCorners = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

    const programs = {
        core: createProgram(gl, CORE_VERTEX, CORE_FRAGMENT),
        shard: createProgram(gl, SHARD_VERTEX, SHARD_FRAGMENT),
        wire: createProgram(gl, WIRE_VERTEX, WIRE_FRAGMENT),
        grid: createProgram(gl, GRID_VERTEX, GRID_FRAGMENT),
        star: createProgram(gl, STAR_VERTEX, STAR_FRAGMENT),
        glow: createProgram(gl, GLOW_VERTEX, GLOW_FRAGMENT),
    };

    const buffers = {
        corePosition: createBuffer(gl, core.position),
        coreNormal: createBuffer(gl, core.normal),
        coreCentroid: createBuffer(gl, core.centroid),
        coreSeed: createBuffer(gl, core.seed),
        wirePosition: createBuffer(gl, wire.position),
        shardPosition: createBuffer(gl, shardMesh.position),
        shardNormal: createBuffer(gl, shardMesh.normal),
        shardOrbit: createBuffer(gl, shardInstances.orbit),
        shardProps: createBuffer(gl, shardInstances.props),
        starPosition: createBuffer(gl, stars.position),
        starProps: createBuffer(gl, stars.props),
        quad: createBuffer(gl, quadCorners),
    };

    const vaos = {
        core: gl.createVertexArray(),
        wire: gl.createVertexArray(),
        shard: gl.createVertexArray(),
        star: gl.createVertexArray(),
        grid: gl.createVertexArray(),
        glow: gl.createVertexArray(),
    };

    gl.bindVertexArray(vaos.core);
    bindAttribute(gl, buffers.corePosition, programs.core.attribute('aPosition'), 3);
    bindAttribute(gl, buffers.coreNormal, programs.core.attribute('aNormal'), 3);
    bindAttribute(gl, buffers.coreCentroid, programs.core.attribute('aCentroid'), 3);
    bindAttribute(gl, buffers.coreSeed, programs.core.attribute('aSeed'), 1);

    gl.bindVertexArray(vaos.wire);
    bindAttribute(gl, buffers.wirePosition, programs.wire.attribute('aPosition'), 3);

    gl.bindVertexArray(vaos.shard);
    bindAttribute(gl, buffers.shardPosition, programs.shard.attribute('aPosition'), 3);
    bindAttribute(gl, buffers.shardNormal, programs.shard.attribute('aNormal'), 3);
    bindAttribute(gl, buffers.shardOrbit, programs.shard.attribute('aOrbit'), 4, 1);
    bindAttribute(gl, buffers.shardProps, programs.shard.attribute('aProps'), 4, 1);

    gl.bindVertexArray(vaos.star);
    bindAttribute(gl, buffers.starPosition, programs.star.attribute('aPosition'), 3);
    bindAttribute(gl, buffers.starProps, programs.star.attribute('aProps'), 3);

    gl.bindVertexArray(vaos.grid);
    bindAttribute(gl, buffers.quad, programs.grid.attribute('aCorner'), 2);

    gl.bindVertexArray(vaos.glow);
    bindAttribute(gl, buffers.quad, programs.glow.attribute('aCorner'), 2);

    gl.bindVertexArray(null);

    const projection = mat4();
    const view = mat4();
    const model = mat4();
    const eye = [0, 0, 0];

    let pixelRatio = 1;

    /**
     * Drawing-buffer budget. A DPR cap alone is not enough: a 4K viewport at DPR 2 is
     * 33 megapixels per frame. Cap the total instead and derive the ratio from it, so
     * large displays lose a little sharpness rather than all of their frame rate.
     */
    const MAX_DRAW_PIXELS = 2_400_000;

    /** Frame shape the camera distances in KEYFRAMES were art-directed against. */
    const REFERENCE_ASPECT = 16 / 9;

    function resize() {
        const cap = window.innerWidth < 768 ? 1.6 : 2;
        const cssWidth = Math.max(1, canvas.clientWidth);
        const cssHeight = Math.max(1, canvas.clientHeight);

        pixelRatio = Math.min(window.devicePixelRatio || 1, cap);

        const requested = cssWidth * cssHeight * pixelRatio * pixelRatio;
        if (requested > MAX_DRAW_PIXELS) {
            pixelRatio *= Math.sqrt(MAX_DRAW_PIXELS / requested);
        }

        const width = Math.max(1, Math.round(cssWidth * pixelRatio));
        const height = Math.max(1, Math.round(cssHeight * pixelRatio));

        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }

        gl.viewport(0, 0, width, height);
    }

    resize();

    /**
     * @param {{time: number, camera: number[], target: number[], explode: number,
     *   converge: number, spin: number, glow: number, gridOpacity: number}} state
     */
    function render(state) {
        const aspect = canvas.width / Math.max(canvas.height, 1);

        // The field of view is vertical, so a narrow frame crops the subject sideways
        // until it overflows the screen. Pull the eye back along its own view ray as
        // the frame narrows — same framing, no rotation, subject stays in shot.
        const fit = Math.min(Math.max(Math.sqrt(REFERENCE_ASPECT / aspect), 1), 2.2);

        for (let axis = 0; axis < 3; axis += 1) {
            eye[axis] = state.target[axis] + (state.camera[axis] - state.target[axis]) * fit;
        }

        perspective(projection, (48 * Math.PI) / 180, aspect, 0.1, 120);
        lookAt(view, eye, state.target, [0, 1, 0]);
        modelMatrix(model, state.spin * 0.22, state.spin, state.spin * 0.08, 1);

        gl.clearColor(0.024, 0.035, 0.027, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.disable(gl.DEPTH_TEST);
        gl.depthMask(false);

        // --- Star field -----------------------------------------------------
        gl.useProgram(programs.star.program);
        gl.bindVertexArray(vaos.star);
        gl.uniformMatrix4fv(programs.star.uniform('uProjection'), false, projection);
        gl.uniformMatrix4fv(programs.star.uniform('uView'), false, view);
        gl.uniform1f(programs.star.uniform('uTime'), state.time);
        gl.uniform1f(programs.star.uniform('uPixelRatio'), pixelRatio);
        gl.uniform3fv(programs.star.uniform('uAccent'), accent);
        gl.uniform1f(programs.star.uniform('uOpacity'), 0.9);
        gl.drawArrays(gl.POINTS, 0, stars.count);

        // --- Halo behind the core -------------------------------------------
        gl.useProgram(programs.glow.program);
        gl.bindVertexArray(vaos.glow);
        gl.uniformMatrix4fv(programs.glow.uniform('uProjection'), false, projection);
        gl.uniformMatrix4fv(programs.glow.uniform('uView'), false, view);
        gl.uniform1f(programs.glow.uniform('uSize'), 6.5);
        gl.uniform3fv(programs.glow.uniform('uAccent'), accent);
        gl.uniform1f(programs.glow.uniform('uIntensity'), state.glow);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // --- Grid floor ------------------------------------------------------
        gl.enable(gl.DEPTH_TEST);
        gl.depthMask(true);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.useProgram(programs.grid.program);
        gl.bindVertexArray(vaos.grid);
        gl.uniformMatrix4fv(programs.grid.uniform('uProjection'), false, projection);
        gl.uniformMatrix4fv(programs.grid.uniform('uView'), false, view);
        gl.uniform1f(programs.grid.uniform('uExtent'), 46);
        gl.uniform1f(programs.grid.uniform('uHeight'), -3.4);
        gl.uniform1f(programs.grid.uniform('uTime'), state.time);
        gl.uniform1f(programs.grid.uniform('uOpacity'), state.gridOpacity);
        gl.uniform3fv(programs.grid.uniform('uAccent'), accent);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        // --- Core ------------------------------------------------------------
        gl.disable(gl.BLEND);

        gl.useProgram(programs.core.program);
        gl.bindVertexArray(vaos.core);
        gl.uniformMatrix4fv(programs.core.uniform('uProjection'), false, projection);
        gl.uniformMatrix4fv(programs.core.uniform('uView'), false, view);
        gl.uniformMatrix4fv(programs.core.uniform('uModel'), false, model);
        gl.uniform1f(programs.core.uniform('uTime'), state.time);
        gl.uniform1f(programs.core.uniform('uExplode'), state.explode);
        gl.uniform3fv(programs.core.uniform('uCamera'), eye);
        gl.uniform3fv(programs.core.uniform('uAccent'), accent);
        gl.uniform3fv(programs.core.uniform('uCool'), cool);
        gl.uniform3fv(programs.core.uniform('uWarm'), warm);
        gl.drawArrays(gl.TRIANGLES, 0, core.vertexCount);

        // --- Shards ------------------------------------------------------------
        gl.useProgram(programs.shard.program);
        gl.bindVertexArray(vaos.shard);
        gl.uniformMatrix4fv(programs.shard.uniform('uProjection'), false, projection);
        gl.uniformMatrix4fv(programs.shard.uniform('uView'), false, view);
        gl.uniformMatrix4fv(programs.shard.uniform('uModel'), false, model);
        gl.uniform1f(programs.shard.uniform('uTime'), state.time);
        gl.uniform1f(programs.shard.uniform('uDisperse'), state.explode);
        gl.uniform1f(programs.shard.uniform('uConverge'), state.converge);
        gl.uniform3fv(programs.shard.uniform('uCamera'), eye);
        gl.uniform3fv(programs.shard.uniform('uAccent'), accent);
        gl.uniform3fv(programs.shard.uniform('uCool'), cool);
        gl.uniform3fv(programs.shard.uniform('uWarm'), warm);
        gl.drawArraysInstanced(gl.TRIANGLES, 0, shardMesh.vertexCount, shardInstances.count);

        // --- Containment shell ---------------------------------------------------
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.depthMask(false);

        gl.useProgram(programs.wire.program);
        gl.bindVertexArray(vaos.wire);
        modelMatrix(model, -state.spin * 0.16, -state.spin * 0.6, 0, 1);
        gl.uniformMatrix4fv(programs.wire.uniform('uProjection'), false, projection);
        gl.uniformMatrix4fv(programs.wire.uniform('uView'), false, view);
        gl.uniformMatrix4fv(programs.wire.uniform('uModel'), false, model);
        gl.uniform1f(programs.wire.uniform('uScale'), 2.35 + state.explode * 1.1);
        gl.uniform1f(programs.wire.uniform('uOpacity'), 0.38 * (1.0 - state.converge * 0.6));
        gl.uniform3fv(programs.wire.uniform('uCamera'), eye);
        gl.uniform3fv(programs.wire.uniform('uAccent'), accent);
        gl.drawArrays(gl.LINES, 0, wire.vertexCount);

        gl.bindVertexArray(null);
        gl.depthMask(true);
    }

    function dispose() {
        Object.values(buffers).forEach((buffer) => gl.deleteBuffer(buffer));
        Object.values(vaos).forEach((vao) => gl.deleteVertexArray(vao));
        Object.values(programs).forEach(({ program }) => gl.deleteProgram(program));
    }

    return { render, resize, dispose };
}
