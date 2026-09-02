/**
 * Procedural geometry for the showcase scene. Everything is generated at runtime so
 * the page ships no model files and no 3D library.
 */

/**
 * Deterministic PRNG (mulberry32) — a fixed seed keeps the composition identical
 * across reloads, which matters when art-directing a scripted camera path.
 *
 * @param {number} seed
 * @return {function(): number}
 */
function createRandom(seed) {
    let state = seed >>> 0;

    return function random() {
        state |= 0;
        state = (state + 0x6D2B79F5) | 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const GOLDEN = (1 + Math.sqrt(5)) / 2;

const ICOSAHEDRON_VERTICES = [
    [-1, GOLDEN, 0], [1, GOLDEN, 0], [-1, -GOLDEN, 0], [1, -GOLDEN, 0],
    [0, -1, GOLDEN], [0, 1, GOLDEN], [0, -1, -GOLDEN], [0, 1, -GOLDEN],
    [GOLDEN, 0, -1], [GOLDEN, 0, 1], [-GOLDEN, 0, -1], [-GOLDEN, 0, 1],
];

const ICOSAHEDRON_FACES = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

/**
 * @param {number[]} v
 * @param {number} radius
 * @return {number[]}
 */
function projectToSphere(v, radius) {
    const len = Math.hypot(v[0], v[1], v[2]) || 1;

    return [(v[0] / len) * radius, (v[1] / len) * radius, (v[2] / len) * radius];
}

/**
 * @param {number[]} a
 * @param {number[]} b
 * @return {number[]}
 */
function midpoint(a, b) {
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
}

/**
 * Builds a subdivided icosphere as loose triangles. Each triangle carries its own
 * face normal, centroid and seed so the vertex shader can shatter and re-form the
 * shell face by face without any per-frame CPU work.
 *
 * @param {number} subdivisions
 * @param {number} radius
 * @return {{position: Float32Array, normal: Float32Array, centroid: Float32Array, seed: Float32Array, vertexCount: number}}
 */
export function buildShatterSphere(subdivisions, radius) {
    let triangles = ICOSAHEDRON_FACES.map((face) => face.map(
        (index) => projectToSphere(ICOSAHEDRON_VERTICES[index], radius)
    ));

    for (let level = 0; level < subdivisions; level += 1) {
        const next = [];

        for (const [a, b, c] of triangles) {
            const ab = projectToSphere(midpoint(a, b), radius);
            const bc = projectToSphere(midpoint(b, c), radius);
            const ca = projectToSphere(midpoint(c, a), radius);

            next.push([a, ab, ca], [ab, b, bc], [ca, bc, c], [ab, bc, ca]);
        }

        triangles = next;
    }

    const random = createRandom(20260831);
    const vertexCount = triangles.length * 3;
    const position = new Float32Array(vertexCount * 3);
    const normal = new Float32Array(vertexCount * 3);
    const centroid = new Float32Array(vertexCount * 3);
    const seed = new Float32Array(vertexCount);

    triangles.forEach((triangle, faceIndex) => {
        const [a, b, c] = triangle;

        const ux = b[0] - a[0];
        const uy = b[1] - a[1];
        const uz = b[2] - a[2];
        const vx = c[0] - a[0];
        const vy = c[1] - a[1];
        const vz = c[2] - a[2];

        let nx = uy * vz - uz * vy;
        let ny = uz * vx - ux * vz;
        let nz = ux * vy - uy * vx;
        const nLen = Math.hypot(nx, ny, nz) || 1;
        nx /= nLen;
        ny /= nLen;
        nz /= nLen;

        const cx = (a[0] + b[0] + c[0]) / 3;
        const cy = (a[1] + b[1] + c[1]) / 3;
        const cz = (a[2] + b[2] + c[2]) / 3;
        const faceSeed = random();

        for (let corner = 0; corner < 3; corner += 1) {
            const vertex = triangle[corner];
            const offset = (faceIndex * 3 + corner) * 3;

            position[offset] = vertex[0];
            position[offset + 1] = vertex[1];
            position[offset + 2] = vertex[2];

            normal[offset] = nx;
            normal[offset + 1] = ny;
            normal[offset + 2] = nz;

            centroid[offset] = cx;
            centroid[offset + 1] = cy;
            centroid[offset + 2] = cz;

            seed[faceIndex * 3 + corner] = faceSeed;
        }
    });

    return { position, normal, centroid, seed, vertexCount };
}

/**
 * Unique edges of a low-poly icosphere, drawn as lines for the counter-rotating
 * containment shell around the core.
 *
 * @param {number} subdivisions
 * @param {number} radius
 * @return {{position: Float32Array, vertexCount: number}}
 */
export function buildWireShell(subdivisions, radius) {
    const shell = buildShatterSphere(subdivisions, radius);
    const seen = new Set();
    const lines = [];

    for (let face = 0; face < shell.vertexCount / 3; face += 1) {
        for (let corner = 0; corner < 3; corner += 1) {
            const from = (face * 3 + corner) * 3;
            const to = (face * 3 + ((corner + 1) % 3)) * 3;

            const a = [shell.position[from], shell.position[from + 1], shell.position[from + 2]];
            const b = [shell.position[to], shell.position[to + 1], shell.position[to + 2]];

            const keyA = a.map((n) => n.toFixed(4)).join(':');
            const keyB = b.map((n) => n.toFixed(4)).join(':');
            const key = keyA < keyB ? keyA + '_' + keyB : keyB + '_' + keyA;

            if (seen.has(key)) {
                continue;
            }

            seen.add(key);
            lines.push(a[0], a[1], a[2], b[0], b[1], b[2]);
        }
    }

    return { position: new Float32Array(lines), vertexCount: lines.length / 3 };
}

/**
 * A single tetrahedron with flat face normals — the base mesh every orbiting shard
 * instances from.
 *
 * @return {{position: Float32Array, normal: Float32Array, vertexCount: number}}
 */
export function buildShardMesh() {
    const corners = [
        [0, 0.9, 0],
        [-0.62, -0.4, 0.62],
        [0.72, -0.32, 0.34],
        [0, -0.36, -0.78],
    ];

    const faces = [[0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 3, 2]];
    const position = new Float32Array(faces.length * 9);
    const normal = new Float32Array(faces.length * 9);

    faces.forEach((face, faceIndex) => {
        const [a, b, c] = face.map((index) => corners[index]);

        const ux = b[0] - a[0];
        const uy = b[1] - a[1];
        const uz = b[2] - a[2];
        const vx = c[0] - a[0];
        const vy = c[1] - a[1];
        const vz = c[2] - a[2];

        let nx = uy * vz - uz * vy;
        let ny = uz * vx - ux * vz;
        let nz = ux * vy - uy * vx;
        const len = Math.hypot(nx, ny, nz) || 1;
        nx /= len;
        ny /= len;
        nz /= len;

        [a, b, c].forEach((vertex, corner) => {
            const offset = (faceIndex * 3 + corner) * 3;

            position[offset] = vertex[0];
            position[offset + 1] = vertex[1];
            position[offset + 2] = vertex[2];
            normal[offset] = nx;
            normal[offset + 1] = ny;
            normal[offset + 2] = nz;
        });
    });

    return { position, normal, vertexCount: faces.length * 3 };
}

/**
 * Per-instance orbit description for the shard field.
 *
 * @param {number} count
 * @return {{orbit: Float32Array, props: Float32Array, count: number}}
 */
export function buildShardInstances(count) {
    const random = createRandom(881122);
    const orbit = new Float32Array(count * 4);
    const props = new Float32Array(count * 4);

    for (let i = 0; i < count; i += 1) {
        const ring = i % 3;

        // radius, angular speed, phase, orbit-plane tilt
        orbit[i * 4] = 2.7 + ring * 1.45 + random() * 0.7;
        orbit[i * 4 + 1] = (0.09 + random() * 0.16) * (ring === 1 ? -1 : 1);
        orbit[i * 4 + 2] = random() * Math.PI * 2;
        orbit[i * 4 + 3] = (random() - 0.5) * 1.1;

        // scale, colour mix, self-spin speed, vertical offset
        props[i * 4] = 0.1 + random() * 0.22;
        props[i * 4 + 1] = random();
        props[i * 4 + 2] = 0.4 + random() * 1.6;
        props[i * 4 + 3] = (random() - 0.5) * 2.6;
    }

    return { orbit, props, count };
}

/**
 * Depth-layered star field. Layer index drives both distance and brightness so the
 * background reads as volume rather than noise.
 *
 * @param {number} count
 * @return {{position: Float32Array, props: Float32Array, count: number}}
 */
export function buildStarField(count) {
    const random = createRandom(553311);
    const position = new Float32Array(count * 3);
    const props = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
        const layer = i % 3;
        const radius = 16 + layer * 11 + random() * 10;
        const theta = random() * Math.PI * 2;
        const phi = Math.acos(2 * random() - 1);

        position[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
        position[i * 3 + 1] = Math.cos(phi) * radius * 0.65;
        position[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;

        // point size, brightness, twinkle phase
        props[i * 3] = 1.4 + random() * 2.8;
        props[i * 3 + 1] = 0.25 + random() * 0.75;
        props[i * 3 + 2] = random() * Math.PI * 2;
    }

    return { position, props, count };
}
