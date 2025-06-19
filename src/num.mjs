export function lerp(a,b,t) {
    return a + (b-a)*t
}

export function clamp(min, max) {
    return (v) => Math.max(min, Math.min(max, v))
}