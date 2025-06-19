import * as L from "partial.lenses";

export function rad2degree(rad) {
    return rad / Math.PI * 180
}

export function degree2rad(deg) {
    return deg * Math.PI / 180
}

export function cosDegree(deg) {
    return Math.cos(degree2rad(deg))
}

export function sinDegree(rad) {
    return Math.sin(degree2rad(deg))
}

export const isoDegreeRad = L.iso(degree2rad, rad2degree)
export const isoRadDegree = L.inverse(isoDegreeRad)