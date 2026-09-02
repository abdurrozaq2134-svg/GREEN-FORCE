/**
 * Minimal column-major 4x4 matrix + vector helpers for the showcase WebGL scene.
 * Kept dependency-free on purpose: the project must not gain a math/3D package.
 */

/**
 * @return {Float32Array}
 */
export function mat4() {
    const out = new Float32Array(16);
    out[0] = out[5] = out[10] = out[15] = 1;

    return out;
}

/**
 * @param {Float32Array} out
 * @param {number} fovY Vertical field of view in radians.
 * @param {number} aspect
 * @param {number} near
 * @param {number} far
 * @return {Float32Array}
 */
export function perspective(out, fovY, aspect, near, far) {
    const f = 1 / Math.tan(fovY / 2);
    const nf = 1 / (near - far);

    out.fill(0);
    out[0] = f / aspect;
    out[5] = f;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[14] = 2 * far * near * nf;

    return out;
}

/**
 * @param {Float32Array} out
 * @param {number[]} eye
 * @param {number[]} center
 * @param {number[]} up
 * @return {Float32Array}
 */
export function lookAt(out, eye, center, up) {
    let zx = eye[0] - center[0];
    let zy = eye[1] - center[1];
    let zz = eye[2] - center[2];
    let len = Math.hypot(zx, zy, zz) || 1;
    zx /= len;
    zy /= len;
    zz /= len;

    let xx = up[1] * zz - up[2] * zy;
    let xy = up[2] * zx - up[0] * zz;
    let xz = up[0] * zy - up[1] * zx;
    len = Math.hypot(xx, xy, xz) || 1;
    xx /= len;
    xy /= len;
    xz /= len;

    const yx = zy * xz - zz * xy;
    const yy = zz * xx - zx * xz;
    const yz = zx * xy - zy * xx;

    out[0] = xx;
    out[1] = yx;
    out[2] = zx;
    out[3] = 0;
    out[4] = xy;
    out[5] = yy;
    out[6] = zy;
    out[7] = 0;
    out[8] = xz;
    out[9] = yz;
    out[10] = zz;
    out[11] = 0;
    out[12] = -(xx * eye[0] + xy * eye[1] + xz * eye[2]);
    out[13] = -(yx * eye[0] + yy * eye[1] + yz * eye[2]);
    out[14] = -(zx * eye[0] + zy * eye[1] + zz * eye[2]);
    out[15] = 1;

    return out;
}

/**
 * Builds a model matrix from an Euler YXZ rotation plus a uniform scale.
 *
 * @param {Float32Array} out
 * @param {number} rotX
 * @param {number} rotY
 * @param {number} rotZ
 * @param {number} scale
 * @return {Float32Array}
 */
export function modelMatrix(out, rotX, rotY, rotZ, scale) {
    const cx = Math.cos(rotX);
    const sx = Math.sin(rotX);
    const cy = Math.cos(rotY);
    const sy = Math.sin(rotY);
    const cz = Math.cos(rotZ);
    const sz = Math.sin(rotZ);

    out[0] = (cy * cz + sy * sx * sz) * scale;
    out[1] = (cx * sz) * scale;
    out[2] = (-sy * cz + cy * sx * sz) * scale;
    out[3] = 0;
    out[4] = (-cy * sz + sy * sx * cz) * scale;
    out[5] = (cx * cz) * scale;
    out[6] = (sy * sz + cy * sx * cz) * scale;
    out[7] = 0;
    out[8] = (sy * cx) * scale;
    out[9] = -sx * scale;
    out[10] = (cy * cx) * scale;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
}

/**
 * @param {number} a
 * @param {number} b
 * @param {number} t
 * @return {number}
 */
export function lerp(a, b, t) {
    return a + (b - a) * t;
}

/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
}

/**
 * Hermite ease used for every keyframe transition so acts blend without snapping.
 *
 * @param {number} t
 * @return {number}
 */
export function smoothstep(t) {
    const x = clamp(t, 0, 1);

    return x * x * (3 - 2 * x);
}

/**
 * Frame-rate independent damping — the scrub feel of a scroll-linked camera.
 *
 * @param {number} current
 * @param {number} target
 * @param {number} smoothing Lower is snappier.
 * @param {number} delta Seconds since the previous frame.
 * @return {number}
 */
export function damp(current, target, smoothing, delta) {
    return lerp(current, target, 1 - Math.exp(-delta / Math.max(smoothing, 0.0001)));
}
