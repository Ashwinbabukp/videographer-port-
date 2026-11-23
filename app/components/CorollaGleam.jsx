/* eslint-disable */
// Corolla Gleam — Originkit (adapted for Ashwin K P Portfolio)

"use client";

import { useEffect, useRef } from "react";

const REF_W = 1200;
const REF_H = 800;
const STAGE_H = 800;
const MAX_BLADES = 41;
const CONTENT_ASPECT = 1.0;
const RING_FIT = 352;
const CONTACT_W = 24;
const FOLD_A = 75;

const DEFAULT_ADVANCED = {
  bladeWidth: 282,
  bladeLength: 600,
  thickness: 26,
  bevel: 3.5,
  tailLength: 120,
  pivotY: 400,
  fanAngle: 180,
  twistGain: 100,
  pinkColor: "#B51F66",
  deepColor: "#3300CC",
  lightColor: "#B0A8EC",
  tealColor: "#008989",
  hotColor: "#F6DDA8",
  filmShift: 30,
  rimFilm: 50,
  rimTop: 0,
  teal: 60,
  shadow: 0,
  contact: 45,
  specular: 70,
  shininess: 60,
  sheen: 25,
  grain: 0,
  vignette: 0,
  cycleMs: 6000,
  staggerMs: 80,
  wobble: 3,
  sway: 4,
  lightTravel: 100,
};

const DEFAULT_PLACEMENT = { x: 0, y: 70, angle: 0, tilt: 0 };

const DEFAULTS = {
  background: "transparent",
  warm: "#D9703E",
  cool: "#5B61CF",
  count: 27,
  innerRadius: 22,
  scale: 194,
  hover: 100,
  breathe: 60,
  speed: 50,
  spin: 10,
};

const FILM_S = [0.26, 0.34, 0.42, 0.5, 0.58, 0.66, 0.74, 0.82, 0.9];
const FACE_C = [0.1998, 0.3677, 0.5051, 0.6153, 0.7027, 0.7713];
const WALL_C = [
  1.0, 0.9798, 0.9299, 0.8631, 0.7883, 0.7115, 0.6365, 0.56, 0.49, 0.4, 0.29, 0.0,
];

const RECIPES = {
  faceL: [
    ["TK 0.85 0.95", "WK 0.85 0.50", "WP 0.15 0.25", "WK 0.55 1.20", "WK 0.55 1.20", "WK 0.30 1.30", "WK 0.30 1.30", "WP 0.15 0.80", "WP 0.35 0.85"],
    ["DT 0.10 0.20", "DK 0.70 1.15", "PD 0.95 0.45", "DK 0.20 0.60", "WD 0.95 0.60", "PD 0.85 0.80", "PD 0.80 0.60", "PD 0.85 0.40", "PD 0.75 0.55"],
    ["DT 0.40 0.70", "DT 0.40 0.70", "DT 0.50 0.95", "DT 0.55 1.10", "DT 0.50 1.10", "CD 0.35 1.05", "DL 0.20 1.05", "DL 0.30 1.00", "DL 0.50 1.05"],
    ["LT 0.55 0.65", "LT 0.55 0.65", "LT 0.55 0.65", "DT 0.90 0.90", "CT 0.45 1.00", "CT 0.30 1.15", "CL 0.45 0.95", "CL 0.40 1.00", "CL 0.65 1.05"],
    ["CT 0.60 0.90", "CT 0.60 0.90", "CT 0.60 0.90", "CT 0.60 0.90", "CT 0.45 1.00", "CT 0.30 1.05", "CL 0.30 0.95", "CL 0.45 1.00", "CL 0.75 1.00"],
    ["DL 0.70 0.95", "DL 0.70 0.95", "DL 0.70 0.95", "DL 0.70 0.95", "DL 0.70 0.95", "DL 0.70 0.95", "DL 0.70 0.95", "DL 0.70 0.95", "DL 0.70 0.95"],
  ],
  faceR: [
    ["CK 0.90 0.95", "WK 0.70 0.40", "WP 0.30 0.50", "WK 0.35 1.20", "WK 0.35 1.20", "WL 0.35 0.95", "WL 0.35 0.95", "WK 0.15 1.10", "WP 0.20 0.90"],
    ["DK 0.90 0.70", "DK 0.85 1.30", "DK 0.70 1.25", "PD 0.85 0.55", "PD 0.85 0.65", "PD 0.80 0.60", "DK 0.80 1.20", "WD 0.90 0.20", "PD 0.60 0.25"],
    ["DT 0.30 0.50", "DT 0.30 0.50", "DT 0.40 0.75", "DT 0.45 0.95", "DT 0.45 0.85", "CD 0.50 0.90", "CD 0.05 0.70", "DL 0.55 0.55", "DL 0.40 0.95"],
    ["DT 0.80 0.75", "DT 0.80 0.75", "DT 0.80 0.75", "DT 0.90 0.80", "CT 0.45 0.85", "CT 0.15 1.05", "CL 0.50 0.85", "LT 0.15 0.75", "DL 0.80 1.00"],
    ["CT 0.60 0.90", "CT 0.60 0.90", "CT 0.60 0.90", "CT 0.60 0.90", "CT 0.45 1.00", "CT 0.30 1.05", "CL 0.30 0.95", "CL 0.45 1.00", "CL 0.75 1.00"],
    ["CP 0.05 1.05", "CP 0.05 1.05", "CP 0.05 1.05", "CP 0.05 1.05", "CP 0.05 1.05", "CP 0.05 1.05", "CP 0.05 1.05", "CP 0.05 1.05", "CP 0.05 1.05"],
  ],
  wallL: [
    ["CL 0.75 0.90", "WP 0.20 1.00", "WP 0.90 1.20", "PD 0.20 1.30", "PD 0.40 1.20", "PD 0.25 0.95", "PD 0.25 1.15", "PD 0.25 1.30", "WH 0.30 0.95"],
    ["LT 0.15 1.00", "WP 0.30 1.00", "WP 0.45 1.10", "PD 0.10 1.20", "PD 0.40 0.95", "PK 0.50 1.25", "WP 0.60 0.85", "WP 0.25 1.00", "WH 0.35 0.95"],
    ["CH 0.55 1.15", "WP 0.30 1.00", "WP 0.20 1.10", "WH 0.05 1.00", "WT 0.30 1.00", "WT 0.20 0.60", "WP 0.20 0.75", "WK 0.15 1.15", "LH 0.65 0.85"],
    ["WP 0.55 1.15", "WP 0.55 1.15", "WD 0.15 1.20", "WL 0.20 1.10", "LH 0.90 0.75", "WT 0.60 1.15", "WT 0.50 0.70", "WP 0.05 0.70", "PH 0.75 0.85"],
    ["PD 0.10 0.95", "PD 0.10 0.95", "PD 0.10 0.95", "PD 0.10 0.95", "PD 0.20 1.15", "WD 0.40 1.15", "LH 0.10 0.70", "CT 0.35 0.85", "WH 0.15 0.85"],
    ["WP 0.20 0.85", "WP 0.20 0.85", "WP 0.20 0.85", "WP 0.20 0.85", "WP 0.20 0.85", "WP 0.20 0.85", "WP 0.20 0.85", "WT 0.20 0.95", "WT 0.20 0.95"],
    ["WP 0.20 0.85", "WP 0.20 0.85", "WP 0.20 0.85", "WP 0.20 0.85", "WP 0.20 0.85", "WP 0.20 0.85", "WP 0.20 0.85", "WT 0.20 0.95", "WT 0.20 0.95"],
    ["LH 0.50 0.35", "LH 0.50 0.35", "LH 0.50 0.35", "LH 0.50 0.35", "LH 0.50 0.35", "LH 0.50 0.35", "LH 0.50 0.35", "LH 0.50 0.35", "LH 0.50 0.35"],
    ["DT 0.80 0.40", "DT 0.80 0.40", "DT 0.80 0.40", "DT 0.80 0.40", "DT 0.80 0.40", "DT 0.80 0.40", "DT 0.80 0.40", "DT 0.80 0.40", "DT 0.80 0.40"],
    ["PD 0.60 0.30", "PD 0.60 0.30", "PD 0.60 0.30", "PD 0.60 0.30", "PD 0.60 0.30", "PD 0.60 0.30", "PD 0.60 0.30", "PD 0.60 0.30", "PD 0.60 0.30"],
    ["WT 0.20 0.80", "WT 0.20 0.80", "WT 0.20 0.80", "WT 0.20 0.80", "WT 0.20 0.80", "WT 0.20 0.80", "WT 0.20 0.80", "WT 0.20 0.80", "WT 0.20 0.80"],
    ["WL 0.80 0.90", "WL 0.80 0.90", "WL 0.80 0.90", "WL 0.80 0.90", "WL 0.80 0.90", "WL 0.80 0.90", "WL 0.80 0.90", "WL 0.80 0.90", "WL 0.80 0.90"],
  ],
  wallR: [
    ["CL 0.75 0.90", "WP 0.20 1.00", "WP 0.90 1.20", "PD 0.20 1.30", "PD 0.40 1.20", "PD 0.25 0.95", "PD 0.25 1.15", "PD 0.25 1.30", "WH 0.30 0.95"],
    ["DH 0.40 1.05", "WT 0.20 1.15", "PH 0.25 0.95", "WP 0.90 1.15", "WP 0.80 1.05", "WP 0.80 1.00", "WP 0.95 1.10", "PD 0.15 1.25", "WT 0.25 1.30"],
    ["LT 0.15 0.85", "WT 0.20 1.15", "WT 0.40 1.30", "WT 0.20 1.10", "WK 0.10 1.15", "WP 0.10 1.00", "WP 0.20 1.00", "WP 0.15 1.00", "CH 0.65 1.10"],
    ["WH 0.55 0.95", "WH 0.55 0.95", "TH 0.90 0.90", "TH 0.75 0.90", "CH 0.85 0.80", "WH 0.75 0.90", "WH 0.50 1.00", "WT 0.15 1.20", "WC 0.25 1.10"],
    ["WL 0.50 1.00", "WL 0.50 1.00", "WL 0.50 1.00", "WL 0.50 1.00", "CH 0.60 1.05", "CH 0.40 1.10", "PL 0.95 0.95", "WL 0.80 1.05", "DH 0.80 0.90"],
    ["LT 0.20 1.00", "LT 0.20 1.00", "LT 0.20 1.00", "LT 0.20 1.00", "LT 0.20 1.00", "LT 0.20 1.00", "LT 0.20 1.00", "CL 0.65 0.95", "CL 0.65 0.95"],
    ["LT 0.20 1.00", "LT 0.20 1.00", "LT 0.20 1.00", "LT 0.20 1.00", "LT 0.20 1.00", "LT 0.20 1.00", "LT 0.20 1.00", "CL 0.65 0.95", "CL 0.65 0.95"],
    ["LH 0.50 0.35", "LH 0.50 0.35", "LH 0.50 0.35", "LH 0.50 0.35", "LH 0.50 0.35", "LH 0.50 0.35", "LH 0.50 0.35", "LH 0.50 0.35", "LH 0.50 0.35"],
    ["DT 0.80 0.40", "DT 0.80 0.40", "DT 0.80 0.40", "DT 0.80 0.40", "DT 0.80 0.40", "DT 0.80 0.40", "DT 0.80 0.40", "DT 0.80 0.40", "DT 0.80 0.40"],
    ["PD 0.60 0.30", "PD 0.60 0.30", "PD 0.60 0.30", "PD 0.60 0.30", "PD 0.60 0.30", "PD 0.60 0.30", "PD 0.60 0.30", "PD 0.60 0.30", "PD 0.60 0.30"],
    ["WT 0.20 0.80", "WT 0.20 0.80", "WT 0.20 0.80", "WT 0.20 0.80", "WT 0.20 0.80", "WT 0.20 0.80", "WT 0.20 0.80", "WT 0.20 0.80", "WT 0.20 0.80"],
    ["WL 0.80 0.90", "WL 0.80 0.90", "WL 0.80 0.90", "WL 0.80 0.90", "WL 0.80 0.90", "WL 0.80 0.90", "WL 0.80 0.90", "WL 0.80 0.90", "WL 0.80 0.90"],
  ],
};

const RING = {
  S: 0.65,
  SIG: 0.07,
  AMOUNT: 0.65,
  HUE0: 0.36,
  HUE1: -0.3,
  LIFT: 0.4,
  C: 0.28,
};

const COLOR_CACHE = new Map();

function parseColor(input, fallback) {
  const key = typeof input === "string" ? input : "";
  const hit = COLOR_CACHE.get(key);
  if (hit) return hit;
  let s = key.trim();
  const v = s.match(/^var\([^,]+,\s*(.+)\)$/);
  if (v) s = v[1].trim();
  let out = null;
  let m = s.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4)
      h = h
        .split("")
        .map((c) => c + c)
        .join("");
    if (h.length >= 6)
      out = [
        parseInt(h.slice(0, 2), 16) / 255,
        parseInt(h.slice(2, 4), 16) / 255,
        parseInt(h.slice(4, 6), 16) / 255,
      ];
  }
  if (!out) {
    m = s.match(/^rgba?\(([^)]+)\)$/i);
    if (m) {
      const parts = m[1]
        .split(/[\s,/]+/)
        .filter(Boolean)
        .map(parseFloat);
      if (parts.length >= 3 && parts.slice(0, 3).every((n) => isFinite(n)))
        out = [parts[0] / 255, parts[1] / 255, parts[2] / 255];
    }
  }
  if (!out) out = key === fallback ? [0, 0, 0] : parseColor(fallback, fallback);
  if (COLOR_CACHE.size > 200) COLOR_CACHE.clear();
  COLOR_CACHE.set(key, out);
  return out;
}

function mixRGB(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function scaleRGB(a, k) {
  return [a[0] * k, a[1] * k, a[2] * k];
}

const TAB_W = 32;
const TAB_ROWS = 32;
const TAB_S0 = 0.2;
const TAB_S1 = 1.0;

function swatch(p, k) {
  switch (k) {
    case "W": return p.warm;
    case "C": return p.cool;
    case "P": return p.pink;
    case "D": return p.deep;
    case "L": return p.lite;
    case "T": return p.teal;
    case "H": return p.hot;
    default: return [0, 0, 0];
  }
}

function recipe(p, r) {
  const [ab, t, g] = r.split(" ");
  return scaleRGB(mixRGB(swatch(p, ab[0]), swatch(p, ab[1]), parseFloat(t)), parseFloat(g));
}

function lerpTable(stations, rows, c, k) {
  const n = stations.length;
  const asc = stations[n - 1] > stations[0];
  let i = 0;
  while (i < n - 2 && (asc ? c > stations[i + 1] : c < stations[i + 1])) i++;
  const t = clamp((c - stations[i]) / (stations[i + 1] - stations[i]), 0, 1);
  return mixRGB(rows[i][k], rows[i + 1][k], t);
}

function bakeTables(p, out) {
  const tabs = [
    [RECIPES.faceL, FACE_C],
    [RECIPES.faceR, FACE_C],
    [RECIPES.wallL, WALL_C],
    [RECIPES.wallR, WALL_C],
  ];
  for (let t = 0; t < 4; t++) {
    const [rec, st] = tabs[t];
    const rows = rec.map((row) => row.map((r) => recipe(p, r)));
    const c0 = st[0];
    const c1 = st[st.length - 1];
    for (let y = 0; y < TAB_ROWS; y++) {
      const c = c0 + ((c1 - c0) * y) / (TAB_ROWS - 1);
      const keys = FILM_S.map((_, k) => lerpTable(st, rows, c, k));
      for (let x = 0; x < TAB_W; x++) {
        const sv = TAB_S0 + ((TAB_S1 - TAB_S0) * x) / (TAB_W - 1);
        let k = 0;
        while (k < FILM_S.length - 2 && sv > FILM_S[k + 1]) k++;
        const f = clamp((sv - FILM_S[k]) / (FILM_S[k + 1] - FILM_S[k]), 0, 1);
        const col = mixRGB(keys[k], keys[k + 1], f);
        const o = ((t * TAB_ROWS + y) * TAB_W + x) * 4;
        for (let ch = 0; ch < 3; ch++) out[o + ch] = Math.round(clamp(col[ch], 0, 1) * 255);
        out[o + 3] = 255;
      }
    }
  }
}

const SLAB_VS = `#version 300 es
precision highp float;
precision highp int;
uniform vec4 uSA[${MAX_BLADES}];
uniform vec4 uSB[${MAX_BLADES}];
uniform vec4 uSC[${MAX_BLADES}];
uniform vec4 uGeo;
uniform vec2 uPivot;
uniform vec4 uMap;
uniform vec4 uPl;
uniform vec4 uPl2;
uniform vec4 uPl3;
uniform vec3 uRes;
uniform vec2 uShade;
out vec2 vP;
flat out vec4 vA;
flat out vec4 vB;
flat out vec4 vC;
void main() {
    int id = gl_VertexID / 6;
    int c = gl_VertexID - id * 6;
    int corner = c < 3 ? c : (c == 3 ? 2 : (c == 4 ? 1 : 3));
    vec4 A = uSA[id];
    vec4 B = uSB[id];
    vec4 C = uSC[id];
    vec2 u = A.xy;
    vec2 nO = B.x * vec2(u.y, -u.x);
    float pad = 4.0 / uMap.w + uShade.y;
    float r0 = uGeo.w + C.x;
    float s = (corner >> 1) == 0 ? r0 - pad : r0 + uGeo.y + pad;
    float k = ((corner & 1) == 0 ? -1.0 : 1.0) * (B.y + pad);
    vec2 local = s * u + k * nO;
    vP = local;
    vA = A;
    vB = B;
    vC = C;
    vec2 px = uMap.xy + uPivot * uMap.z + local * uMap.w;
    vec2 rel = px - uPl.xy;
    float D = uRes.z;
    float x2 = rel.x * uPl3.x - rel.y * uPl2.w * uPl3.y;
    float y2 = rel.y * uPl2.z;
    float w = max((D + rel.y * uPl2.w * uPl3.x + rel.x * uPl3.y) / D, 0.05);
    vec2 r = vec2(uPl2.x * x2 + uPl2.y * y2, -uPl2.y * x2 + uPl2.x * y2);
    vec2 scr = r + (uPl.xy + uPl.zw) * w;
    gl_Position = vec4(scr / uRes.xy * 2.0 - w, 0.0, w);
}`;

const SLAB_FS = `#version 300 es
precision highp float;
precision highp int;
in vec2 vP;
flat in vec4 vA;
flat in vec4 vB;
flat in vec4 vC;
uniform vec4 uGeo;
uniform vec4 uGeo2;
uniform sampler2D uTab;
uniform vec4 uTabC;
uniform vec4 uFilm;
uniform vec4 uRing;
uniform vec4 uRing2;
uniform vec3 uLite;
uniform vec3 uHot;
uniform vec3 uPink;
uniform vec3 uWarm;
uniform vec3 uLight;
uniform vec4 uLook;
uniform vec2 uShade;
out vec4 outColor;

const float PI = 3.14159265;

vec3 film(float row0, float c, float sl) {
    float u = (0.5 + clamp(sl, 0.0, 1.0) * 31.0) / 32.0;
    float v = (row0 + 0.5 + clamp(c, 0.0, 1.0) * 31.0) / 128.0;
    return textureLod(uTab, vec2(u, v), 0.0).rgb;
}

vec3 film2(float row0, float c, float sl, float side) {
    if (side <= 0.001) return film(row0, c, sl);
    if (side >= 0.999) return film(row0 + 32.0, c, sl);
    return mix(film(row0, c, sl), film(row0 + 32.0, c, sl), side);
}

float sdEllipse(vec2 p, vec2 ab) {
    p = abs(p);
    if (abs(ab.x - ab.y) < 1e-3 * ab.y) return length(p) - ab.x;
    if (p.x > p.y) { p = p.yx; ab = ab.yx; }
    float l = ab.y * ab.y - ab.x * ab.x;
    float m = ab.x * p.x / l;
    float m2 = m * m;
    float n = ab.y * p.y / l;
    float n2 = n * n;
    float c = (m2 + n2 - 1.0) / 3.0;
    float c3 = c * c * c;
    float q = c3 + m2 * n2 * 2.0;
    float d = c3 + m2 * n2;
    float g = m + m * n2;
    float co;
    if (d < 0.0) {
        float h = acos(clamp(q / c3, -1.0, 1.0)) / 3.0;
        float s = cos(h);
        float t = sin(h) * sqrt(3.0);
        float rx = sqrt(max(-c * (s + t + 2.0) + m2, 0.0));
        float ry = sqrt(max(-c * (s - t + 2.0) + m2, 0.0));
        co = (ry + sign(l) * rx + abs(g) / max(rx * ry, 1e-12) - m) / 2.0;
    } else {
        float h = 2.0 * m * n * sqrt(d);
        float s = sign(q + h) * pow(abs(q + h), 1.0 / 3.0);
        float u = sign(q - h) * pow(abs(q - h), 1.0 / 3.0);
        float rx = -s - u - c * 4.0 + 2.0 * m2;
        float ry = (s - u) * sqrt(3.0);
        float rm = sqrt(rx * rx + ry * ry);
        co = (ry / sqrt(max(rm - rx, 1e-12)) + 2.0 * g / max(rm, 1e-12) - m) / 2.0;
    }
    co = clamp(co, 0.0, 1.0);
    vec2 r = ab * vec2(co, sqrt(1.0 - co * co));
    return length(r - p) * sign(p.y - r.y);
}

void main() {
    vec2 u = vA.xy;
    float st = vA.z;
    float ct = vA.w;
    vec2 nO = vB.x * vec2(u.y, -u.x);
    float s = dot(vP, u);
    float k = dot(vP, nO);
    float px = max(sqrt(length(dFdx(vP)) * length(dFdy(vP))), 1e-4);

    float R = uGeo.x;
    float L = uGeo.y;
    float B = 0.5 * uGeo.z;
    float rho = clamp(max(uGeo2.x, 0.8 * px), 1e-3, min(B, R) - 1e-3);
    float r0 = uGeo.w + vC.x;
    float dsg = s - (r0 + 0.5 * L);
    float capS = dsg < 0.0 ? -1.0 : 1.0;
    float dc = abs(dsg) - (0.5 * L - R);
    float Rp = R - rho;
    float Bp = B - rho;
    float dcc = min(dc, Rp);
    float Ap = dc > 0.0 ? sqrt(max(Rp * Rp - dcc * dcc, 0.0)) : Rp;

    float eps = min(0.25 * px, 0.5 * Bp * ct + 1e-4);
    float ea = Rp * st + eps;
    float xk = max(abs(k) - (Bp * ct - eps), 0.0);
    float dcore = xk - ea;
    if (dc > 0.5 * px) {
        vec2 ep = vec2(xk, dc);
        vec2 er = vec2(ea, Rp);
        float k0 = length(ep / er);
        float k1 = max(length(ep / (er * er)), 1e-6);
        dcore = k0 * (k0 - 1.0) / k1;
        if (abs(dcore - rho) < 4.0 * px + 0.3 * abs(dcore) || ea < 6.0 * px) dcore = sdEllipse(ep, er);
    }
    float dist = dcore - rho;
    float cov = clamp(0.5 - dist / px, 0.0, 1.0);
    if (!(cov >= 0.0 && cov <= 1.0)) cov = 0.0;
    if (cov <= 0.0) {
        float sh = uShade.x * pow(1.0 - clamp(dist / max(uShade.y, 1e-3), 0.0, 1.0), 2.0);
        if (!(sh > 0.004)) discard;
        outColor = vec4(0.0, 0.0, 0.0, sh);
        return;
    }

    vec3 p3 = vec3(nO, 0.0);
    vec3 u3 = vec3(u, 0.0);
    vec3 w3 = st * p3 + vec3(0.0, 0.0, ct);
    vec3 n3 = ct * p3 - vec3(0.0, 0.0, st);
    float dcp = max(dc, 0.0);
    vec3 Wn = normalize(Ap * w3 + capS * dcp * u3 + 1e-4 * w3);
    vec3 Wi = normalize(-Ap * w3 + capS * dcp * u3 - 1e-4 * w3);
    float tau = atan(st, ct);

    float kF0 = -Ap * st - B * ct;
    float kF1 = Ap * st - B * ct;
    float kW0 = (Ap + rho) * st - Bp * ct;
    float kW1 = (Ap + rho) * st + Bp * ct;

    float sAl = clamp(0.2 + 0.8 * (s - r0) / L, 0.0, 1.0);
    float phase = uGeo2.z * 2.0 * PI;
    float travel = uGeo2.w;
    float side = vB.z;
    float sF = 0.6 + (sAl - 0.6) * uFilm.x + 0.025 * travel * sin(phase - sAl * 3.0);
    float sl = (sF - ${TAB_S0.toFixed(2)}) / ${(TAB_S1 - TAB_S0).toFixed(2)};

    int part = k < kF0 ? 0 : (k <= kF1 ? 1 : (k < kW0 ? 2 : (k <= kW1 ? 3 : 4)));
    float capIn = smoothstep(0.0, 0.6, dcp / R);
    vec3 face = vec3(0.0);
    vec3 wall = vec3(0.0);
    float cf = st;
    float lf = clamp((k - kF0) / max(kF1 - kF0, 1e-3), 0.0, 1.0);

    if (part <= 2) {
        float ci = (cf + uFilm.w - uTabC.x) / (uTabC.y - uTabC.x);
        face = film2(0.0, ci, sl, side);
        if (cf < 0.42) face *= mix(1.0, clamp(exp(1.6 * (0.5 - lf)), 0.45, 1.35), 1.0 - smoothstep(0.25, 0.42, cf));
        if (cf < uRing2.z + 0.06) {
            float rr = (sF - uRing.x - 0.02 * travel * sin(phase)) / uRing.y;
            float g = exp(-rr * rr) * uRing.z * (1.0 - smoothstep(uRing2.z - 0.06, uRing2.z + 0.06, cf));
            vec3 rb = 0.5 + 0.5 * cos(2.0 * PI * (uRing.w + uRing2.x * rr + vec3(0.0, 1.0 / 3.0, 2.0 / 3.0)));
            rb = uRing2.y + (1.0 - uRing2.y) * 0.9 * rb;
            face = mix(face, rb, clamp(g, 0.0, 1.0));
        }
        if (abs(cf - 0.37) < 0.24) {
            float dk = exp(-pow((cf - 0.37) / 0.08, 2.0)) * pow(1.0 - lf, 5.0) * smoothstep(0.55, 0.8, sF);
            face = mix(face, uWarm * vec3(0.48, 0.03, 0.05), clamp(dk * 1.2, 0.0, 1.0));
        }
        face *= mix(0.35, 1.0, smoothstep(0.0, max(uGeo2.y, 1e-3), (s - r0) / L));
    }
    if (part >= 2 || capIn > 0.0) {
        float wi = (Wn.z - uFilm.y + uFilm.w - uTabC.z) / (uTabC.w - uTabC.z);
        wall = film2(64.0, wi, sl, side);
        wall = mix(wall, uLite, clamp(uFilm.z, 0.0, 1.0) * smoothstep(0.9, 1.0, sAl));
    }

    vec3 N;
    vec3 col;
    float bev = 0.0;
    if (part == 0) {
        float phi = max(tau - acos(clamp((-(Ap * st + Bp * ct) - k) / rho, -1.0, 1.0)), 0.0);
        N = cos(phi) * (-n3) + sin(phi) * Wi;
        float a = tau > 1e-3 ? phi / tau : 1.0;
        col = mix(face * (1.0 - 0.55 * a), wall, a * capIn);
        bev = 0.35 * sin(PI * clamp(0.3 + 0.7 * a, 0.0, 1.0));
    } else if (part == 1) {
        N = -n3;
        col = face;
    } else if (part == 2) {
        float phi = clamp(acos(clamp((Ap * st - Bp * ct - k) / rho, -1.0, 1.0)) - tau, 0.0, 0.5 * PI);
        N = cos(phi) * (-n3) + sin(phi) * Wn;
        float a = phi / (0.5 * PI);
        float m = sin(PI * a);
        float capT = smoothstep(0.2, 0.7, dcp / R);
        col = mix(face, wall, smoothstep(0.25, 0.75, a)) * (1.0 - 0.6 * m * m * smoothstep(0.25, 0.5, st) * (1.0 - capT));
        bev = m * mix(1.0 - smoothstep(0.2, 0.45, st), 0.6, capT);
    } else if (part == 3) {
        N = Wn;
        col = wall;
    } else {
        float phi = clamp(asin(clamp((k - (Ap * st + Bp * ct)) / rho, -1.0, 1.0)) - tau, 0.0, 0.5 * PI);
        N = cos(phi) * Wn + sin(phi) * n3;
        float a = phi / max(0.5 * PI - tau, 1e-3);
        float capT = smoothstep(0.3, 0.9, dcp / R);
        col = mix(wall, uPink, smoothstep(0.0, 0.5, a) * (1.0 - capT)) * (1.0 - 0.8 * (1.0 - capT) * smoothstep(0.45, 1.0, a));
        bev = 0.6 * sin(PI * clamp(a * 1.6, 0.0, 1.0)) * (1.0 - smoothstep(0.2, 0.45, st));
    }

    float lit = clamp(dot(N, uLight) * 0.5 + 0.5, 0.0, 1.0);
    col *= mix(1.0 - uLook.x, 1.0, lit);
    float shin = max(uLook.z, 1.0);
    vec3 H = normalize(uLight + vec3(0.0, 0.0, 1.0));
    float glint = pow(max(dot(N, H), 0.0), 6.0);
    col += uHot * uLook.y * pow(max(bev, 0.0), 1.0 + shin * 0.05) * (0.35 + 0.75 * glint);
    col += uHot * uLook.y * 0.04 * pow(max(dot(N, H), 0.0), shin);
    col += uHot * uLook.y * vB.w * 0.8 * max(bev, 0.0) * (0.5 + 0.5 * glint);
    col *= 1.0 + 0.15 * vB.w;

    col = clamp(col, 0.0, 1.0);
    if (any(isnan(col))) col = vec3(0.0);
    outColor = vec4(col * cov, cov);
}`;

const FX_VS = `#version 300 es
void main() {
    vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
    gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FX_FS = `#version 300 es
precision highp float;
precision highp int;
uniform vec4 uFx;
uniform vec2 uRes;
out vec4 outColor;
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}
void main() {
    vec2 frag = gl_FragCoord.xy;
    vec2 vd = (frag / uRes - 0.5) * vec2(uRes.x / uRes.y, 1.0);
    float vig = uFx.y * smoothstep(0.35, 1.0, length(vd) * 1.1);
    float n = (hash(frag + uFx.z * 13.1) - 0.5) * 2.0 * uFx.x * 0.25;
    float aW = max(n, 0.0);
    float aB = max(-n, 0.0);
    float a = clamp(vig + aB + aW, 0.0, 1.0);
    outColor = vec4(vec3(aW), a);
}`;

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS) && !gl.isContextLost()) {
    console.warn("CorollaGleam shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function link(gl, vsSrc, fsSrc) {
  const vs = compile(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSrc);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS) && !gl.isContextLost()) {
    console.warn("CorollaGleam link:", gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

const SLAB_UNIFORMS = [
  "uSA[0]", "uSB[0]", "uSC[0]", "uGeo", "uPivot", "uMap", "uPl", "uPl2", "uPl3", "uRes", "uShade", "uGeo2", "uTab",
  "uTabC", "uFilm", "uRing", "uRing2", "uLite", "uHot", "uPink", "uWarm", "uLight", "uLook",
];

class U4 {
  constructor(loc) {
    this.loc = loc;
    this.last = new Float64Array(4).fill(NaN);
  }
  set(gl, a, b, c, d) {
    const l = this.last;
    if (l[0] === a && l[1] === b && l[2] === c && l[3] === d) return;
    l[0] = a;
    l[1] = b;
    l[2] = c;
    l[3] = d;
    gl.uniform4f(this.loc, a, b, c, d);
  }
  reset() {
    this.last.fill(NaN);
  }
}

function makeSlabProgram(gl, fs) {
  const prog = link(gl, SLAB_VS, fs);
  if (!prog) return null;
  const U = {};
  for (const n of SLAB_UNIFORMS) U[n] = gl.getUniformLocation(prog, n);
  const u = (n) => new U4(U[n]);
  return {
    prog,
    U,
    u4: {
      uTabC: u("uTabC"),
      uFilm: u("uFilm"),
      uRing: u("uRing"),
      uRing2: u("uRing2"),
      uGeo: u("uGeo"),
      uGeo2: u("uGeo2"),
      uPl: u("uPl"),
      uPl2: u("uPl2"),
      uLook: u("uLook"),
    },
  };
}

function clamp(x, a, b) {
  return x < a ? a : x > b ? b : x;
}

function sameLive(a, b) {
  if (!a) return false;
  const keys = ["background", "count", "innerRadius", "scale", "warm", "cool", "hover", "breathe", "speed", "spin"];
  for (const k of keys) if (a[k] !== b[k]) return false;
  for (const k of Object.keys(b.pl)) if (a.pl[k] !== b.pl[k]) return false;
  for (const k of Object.keys(b.adv)) if (a.adv[k] !== b.adv[k]) return false;
  return true;
}

function stepSpring(sp, target, dt, t) {
  const w = 5.8 / Math.max(t, 1e-3);
  let left = dt;
  while (left > 1e-6) {
    const h = Math.min(left, 0.004);
    const a = w * w * (target - sp.x) - 2 * w * sp.v;
    sp.v += a * h;
    sp.x += sp.v * h;
    left -= h;
  }
  if (Math.abs(target - sp.x) < 1e-4 && Math.abs(sp.v) < 1e-3) {
    sp.x = target;
    sp.v = 0;
  }
}

const QUALITY = [1, 0.85, 0.72, 0.6];
const MAX_PIXELS = 4.2e6;

function BaseCorollaGleam({
  background = DEFAULTS.background,
  count = DEFAULTS.count,
  innerRadius = DEFAULTS.innerRadius,
  scale = DEFAULTS.scale,
  warm = DEFAULTS.warm,
  cool = DEFAULTS.cool,
  placement,
  hover = DEFAULTS.hover,
  breathe = DEFAULTS.breathe,
  speed = DEFAULTS.speed,
  spin = DEFAULTS.spin,
  advanced,
  style,
}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const liveRef = useRef(null);
  const wakeRef = useRef(() => {});

  const next = {
    background,
    count,
    innerRadius,
    scale,
    warm,
    cool,
    hover,
    breathe,
    speed,
    spin,
    pl: { ...DEFAULT_PLACEMENT, ...(placement ?? {}) },
    adv: { ...DEFAULT_ADVANCED, ...(advanced ?? {}) },
  };

  if (!sameLive(liveRef.current, next)) {
    liveRef.current = next;
    wakeRef.current();
  }

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    let gl = null;
    let colorP = null;
    let fxProg = null;
    let vao = null;
    let palTex = null;
    let FXU = null;
    let timerExt = null;
    const queries = [];
    let lost = false;

    const tabBytes = new Uint8Array(TAB_W * TAB_ROWS * 4 * 4);
    let palKey = "";
    const sa = new Float32Array(MAX_BLADES * 4);
    const sb = new Float32Array(MAX_BLADES * 4);
    const scc = new Float32Array(MAX_BLADES * 4);
    const ta = new Float32Array(MAX_BLADES * 4);
    const tb4 = new Float32Array(MAX_BLADES * 4);
    const tc = new Float32Array(MAX_BLADES * 4);
    const order = new Uint8Array(MAX_BLADES);
    const front = new Float32Array(MAX_BLADES);

    const init = () => {
      gl = canvas.getContext("webgl2", {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: "low-power",
      });
      if (!gl) return false;
      colorP = makeSlabProgram(gl, SLAB_FS);
      fxProg = link(gl, FX_VS, FX_FS);
      if (!colorP) return false;
      vao = gl.createVertexArray();
      palTex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, palTex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, TAB_W, TAB_ROWS * 4, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      palKey = "";
      if (fxProg) FXU = { uFx: gl.getUniformLocation(fxProg, "uFx"), uRes: gl.getUniformLocation(fxProg, "uRes") };
      timerExt = gl.getExtension("EXT_disjoint_timer_query_webgl2");
      queries.length = 0;
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      return true;
    };

    let cssW = Math.max(1, root.clientWidth);
    let cssH = Math.max(1, root.clientHeight);
    let shown = 1;
    let qLevel = 0;
    let wantW = 0;
    let wantH = 0;

    const measureShown = (r) => {
      if (cssW <= 0) return;
      const sNew = r.width / cssW;
      if (!isFinite(sNew) || sNew <= 0) return;
      if (Math.abs(sNew - shown) / shown > 0.05) {
        shown = sNew;
        requestSize();
      }
    };

    const requestSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let k = dpr * clamp(shown, 1, 2) * QUALITY[qLevel];
      const px = cssW * cssH * k * k;
      if (px > MAX_PIXELS) k *= Math.sqrt(MAX_PIXELS / px);
      wantW = Math.max(1, Math.round(cssW * k));
      wantH = Math.max(1, Math.round(cssH * k));
      dirty = true;
      wake();
    };

    const applySize = () => {
      if (canvas.width !== wantW || canvas.height !== wantH) {
        canvas.width = wantW;
        canvas.height = wantH;
      }
    };

    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const cr = e.contentRect;
        cssW = Math.max(1, cr.width);
        cssH = Math.max(1, cr.height);
      }
      measureShown(root.getBoundingClientRect());
      requestSize();
    });
    ro.observe(root);

    let onScreen = true;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        onScreen = e.isIntersecting;
        if (onScreen) {
          measureShown(e.boundingClientRect);
          wake();
        }
      }
    });
    io.observe(root);

    const onVis = () => {
      if (!document.hidden) wake();
    };
    document.addEventListener("visibilitychange", onVis);

    const mq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    const onMq = () => wake();
    mq?.addEventListener?.("change", onMq);

    const ptr = { cx: 0, cy: 0, moved: false, over: false, down: false, u: 0.5, v: 0.5 };
    let scrolled = false;
    const onMove = (e) => {
      if (e.clientX === ptr.cx && e.clientY === ptr.cy && ptr.over) return;
      ptr.cx = e.clientX;
      ptr.cy = e.clientY;
      ptr.moved = true;
      ptr.over = true;
      wake();
    };
    const onLeave = () => {
      ptr.over = false;
      ptr.down = false;
      wake();
    };
    const onDown = (e) => {
      ptr.down = true;
      onMove(e);
    };
    const onUp = (e) => {
      ptr.down = false;
      if (e.pointerType === "touch") ptr.over = false;
      wake();
    };
    const onScroll = () => {
      if (ptr.over) {
        scrolled = true;
        wake();
      }
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerenter", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });

    const onLost = (e) => {
      e.preventDefault();
      lost = true;
      stop();
    };
    const onRestored = () => {
      lost = false;
      if (init()) {
        requestSize();
        wake();
      }
    };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    let raf = 0;
    let running = false;
    let dirty = true;
    let lastTick = -1;
    let lastDraw = -1;
    let clock = 0;
    let frames = 0;
    const gaps = new Float32Array(15);
    let gapN = 0;
    let cadence = 16.7;
    let divisor = 1;

    const spX = { x: 0, v: 0 };
    const spOver = { x: 0, v: 0 };
    const spDown = { x: 0, v: 0 };
    const spY = { x: 0, v: 0 };
    const spPu = { x: 0.5, v: 0 };
    const spPv = { x: 0.5, v: 0 };
    let tX = 0;
    let tY = 0;
    let spinDeg = 0;

    const gpuMs = [];
    const drawGaps = [];
    const banUntil = [0, 0, 0, 0];
    const banLen = [0, 0, 0, 0];
    let goodSince = -1;
    let probe = null;
    let seed = 0;

    const wake = () => {
      if (running || lost) return;
      running = true;
      lastTick = -1;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    wakeRef.current = wake;

    const median = (arr, n) => {
      const t = Array.prototype.slice.call(arr, 0, n).sort((a, b) => a - b);
      return t.length ? t[t.length >> 1] : 16.7;
    };

    const setLevel = (lv, now) => {
      if (lv === qLevel) return;
      qLevel = lv;
      goodSince = now;
      gpuMs.length = 0;
      drawGaps.length = 0;
      requestSize();
    };

    const ladder = (now) => {
      if (frames < 30 || drawGaps.length < 24) return;
      const m = median(drawGaps, drawGaps.length);
      const g = gpuMs.length >= 6 ? median(gpuMs, gpuMs.length) : -1;
      drawGaps.length = 0;
      gpuMs.length = 0;
      const gpuSlow = g > 0.8 * 16.7;
      if (probe) {
        if (now - probe.at < 1500) return;
        const down = probe.to > probe.from;
        const failed = down ? m > probe.before * 0.87 && !gpuSlow : m > probe.before * 1.13 || gpuSlow;
        if (failed) {
          banLen[probe.to] = Math.min(Math.max(banLen[probe.to] * 2, 30000), 240000);
          banUntil[probe.to] = now + banLen[probe.to];
          const back = probe.from;
          probe = null;
          setLevel(back, now);
        } else probe = null;
        return;
      }
      if ((m > 20 || gpuSlow) && qLevel < QUALITY.length - 1 && now > banUntil[qLevel + 1]) {
        probe = { from: qLevel, to: qLevel + 1, at: now, before: m };
        setLevel(qLevel + 1, now);
        goodSince = -1;
        return;
      }
      const r = qLevel > 0 ? QUALITY[qLevel - 1] / QUALITY[qLevel] : 1;
      const roomy = m <= 18.5 && (g < 0 || g * r * r < 0.55 * 16.7);
      if (qLevel > 0 && roomy) {
        if (goodSince < 0) goodSince = now;
        if (now - goodSince > 4000 && now > banUntil[qLevel - 1]) {
          probe = { from: qLevel, to: qLevel - 1, at: now, before: m };
          setLevel(qLevel - 1, now);
        }
      } else goodSince = -1;
    };

    const pollTimers = () => {
      if (!gl || !timerExt) return;
      for (let i = queries.length - 1; i >= 0; i--) {
        const q = queries[i];
        if (gl.getQueryParameter(q, gl.QUERY_RESULT_AVAILABLE)) {
          if (!gl.getParameter(timerExt.GPU_DISJOINT_EXT)) gpuMs.push(gl.getQueryParameter(q, gl.QUERY_RESULT) / 1e6);
          gl.deleteQuery(q);
          queries.splice(i, 1);
        }
      }
    };

    const loop = (now) => {
      raf = 0;
      if (!running) return;
      if (lost || !gl || document.hidden || !onScreen) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);

      if (lastTick >= 0) {
        const gap = now - lastTick;
        if (gap > 0 && gap < 100) {
          gaps[gapN % gaps.length] = gap;
          gapN++;
        }
      }
      lastTick = now;
      if (gapN >= 5) cadence = median(gaps, Math.min(gapN, gaps.length));
      const x = 16.7 / cadence;
      if (x < divisor - 0.1 || x >= divisor + 1.1) divisor = Math.max(1, Math.floor(x + 0.1));

      const live = liveRef.current;
      if (!live) return;
      const reduced = !!(mq && mq.matches);
      const animating = !reduced && live.speed > 0 && (live.breathe > 0 || live.spin !== 0 || live.adv.lightTravel > 0);
      const springsBusy =
        spX.v !== 0 || spY.v !== 0 || spOver.v !== 0 || spDown.v !== 0 ||
        spX.x !== (ptr.over ? tX : 0) || spY.x !== (ptr.over ? tY : 0) ||
        spOver.x !== (ptr.over ? 1 : 0) || spDown.x !== (ptr.down ? 1 : 0) ||
        spPu.v !== 0 || spPv.v !== 0 || (ptr.over && (spPu.x !== ptr.u || spPv.x !== ptr.v));

      if (!animating && !springsBusy && !dirty && !ptr.moved && !scrolled) {
        running = false;
        return;
      }
      if (lastDraw >= 0 && now - lastDraw < (divisor - 0.5) * cadence) return;

      const dt = lastDraw < 0 ? 0 : Math.min((now - lastDraw) / 1000, 0.1);
      if (lastDraw >= 0 && now - lastDraw < 250) {
        drawGaps.push(now - lastDraw);
        if (drawGaps.length > 60) drawGaps.shift();
      }
      lastDraw = now;
      frames++;

      const adv = live.adv;
      const hov = reduced ? 0 : Math.max(0, live.hover) / 50;

      if ((ptr.moved || scrolled) && ptr.over) {
        const r = root.getBoundingClientRect();
        measureShown(r);
        ptr.u = (ptr.cx - r.left) / Math.max(r.width, 1);
        ptr.v = (ptr.cy - r.top) / Math.max(r.height, 1);
      }
      ptr.moved = false;
      scrolled = false;

      const bw = Math.max(1, wantW || canvas.width);
      const bh = Math.max(1, wantH || canvas.height);
      const Sbuf = Math.min(bh, bw / CONTENT_ASPECT);
      const stageU = Sbuf / STAGE_H;
      const originX = bw / 2;
      const originY = (bh - Sbuf) / 2;
      const pl = live.pl;
      const ang = (clamp(pl.angle, -180, 180) * Math.PI) / 180;
      const ca = Math.cos(ang);
      const sA = Math.sin(ang);
      const offX = (clamp(pl.x, -200, 200) / 100) * bw;
      const offY = (-clamp(pl.y, -200, 200) / 100) * bh;
      const persp = 3 * Sbuf;
      const cenX = originX;
      const cenY = originY + adv.pivotY * stageU;

      if (ptr.over) {
        tX = clamp((ptr.u - 0.5) * 2, -1, 1);
        tY = clamp((ptr.v - 0.5) * 2, -1, 1);
      }
      if (ptr.over && spOver.x < 0.02) {
        spPu.x = ptr.u;
        spPu.v = 0;
        spPv.x = ptr.v;
        spPv.v = 0;
      }
      if (ptr.over) {
        stepSpring(spPu, ptr.u, dt, 0.22);
        stepSpring(spPv, ptr.v, dt, 0.22);
      }
      stepSpring(spX, ptr.over ? tX : 0, dt, 0.14);
      stepSpring(spY, ptr.over ? tY : 0, dt, 0.14);
      stepSpring(spOver, ptr.over ? 1 : 0, dt, 0.12);
      stepSpring(spDown, ptr.down ? 1 : 0, dt, 0.12);
      const pAmt = spOver.x * hov;
      const tilt = ((clamp(pl.tilt, -60, 60) - 2.5 * spY.x * hov) * Math.PI) / 180;
      const yaw = (3 * spX.x * hov * Math.PI) / 180;
      const cT = Math.cos(tilt);
      const sT = Math.sin(tilt);

      const tempo = Math.max(0, live.speed) / 50;
      if (animating) {
        clock += dt * tempo;
        spinDeg = (spinDeg + clamp(live.spin, -10, 10) * 3 * dt * tempo) % 360;
      }
      const cycle = Math.max(0.2, adv.cycleMs / 1000);
      const stag = adv.staggerMs / 1000
      const phase = animating || clock > 0 ? (((clock / cycle) % 1) + 1) % 1 : 0;
      const amp = (Math.max(0, live.breathe) / 50) * 0.04;

      let n = Math.round(live.count);
      n = clamp(n, 3, MAX_BLADES);
      if (n % 2 === 0) n -= 1;
      const gain = Math.max(0, adv.twistGain) / 100;
      const R = Math.max(2, adv.bladeWidth) / 2;
      const L = Math.max(2 * R + 2, adv.bladeLength);
      const T = Math.max(1, Math.min(adv.thickness, R));
      const B = T / 2;
      const DEG = Math.PI / 180;
      const kIn = clamp(live.innerRadius, 0, 85) / 100;
      const r0 = (kIn / (1 - kIn)) * L;
      const ringR = r0 + L;
      const ringU = stageU * (clamp(live.scale, 1, 400) / 100) * (RING_FIT / ringR);
      const F = clamp(adv.fanAngle, 1, 180);
      const wRing = clamp((F - 160) / 20, 0, 1);
      const wr = wRing * wRing * (3 - 2 * wRing);
      const rot = spinDeg + adv.sway * spX.x * pAmt;

      const stepDeg = (n > 1 ? (2 * F) / (n - 1) : 30) * (1 - wr) + (360 / n) * wr;
      const sig = 1.6 * stepDeg;
      let pTh = 0;
      let bloom = 0;
      if (pAmt > 1e-4) {
        const rx = spPu.x * bw - (cenX + offX);
        const ry = (1 - spPv.x) * bh - (cenY + offY);
        const lx0 = ca * rx - sA * ry;
        const ly0 = (sA * rx + ca * ry) / Math.max(cT, 0.2);
        pTh = (Math.atan2(lx0, ly0) * 180) / Math.PI;
        const pr = Math.hypot(lx0, ly0) / Math.max(ringU, 1e-6);
        const inW = clamp(pr / Math.max(r0 + 0.25 * L, 1e-3), 0, 1);
        const outW = 1 - clamp((pr - (r0 + L)) / (0.8 * L), 0, 1);
        bloom = pAmt * inW * inW * (3 - 2 * inW) * outW * outW * (3 - 2 * outW);
      }

      for (let i = 0; i < n; i++) {
        const fanA = n > 1 ? -F + (i * 2 * F) / (n - 1) : 0;
        const ringA = -180 + ((i + 0.5) * 360) / n;
        let th = fanA + (ringA - fanA) * wr + rot;
        th = ((((th + 180) % 360) + 360) % 360) - 180;
        let f = 0;
        if (bloom > 1e-4) {
          let d = th - pTh;
          d = ((((d + 180) % 360) + 360) % 360) - 180;
          const z = d / sig;
          const gz = Math.exp(-z * z);
          f = bloom * gz;
          th += 1.2 * stepDeg * Math.min(bloom, 1.5) * z * gz;
          th = ((((th + 180) % 360) + 360) % 360) - 180;
        }
        const edge = clamp(Math.abs(Math.sin(th * DEG)) / 0.22, 0, 1);
        const openW = edge * edge * (3 - 2 * edge);
        const e = animating || clock > 0 ? 0.5 - 0.5 * Math.cos((2 * Math.PI * (clock - i * stag)) / cycle) : 0;
        const x = Math.abs(th);
        let y = x <= 90 ? x : 180 - x;
        if (y > FOLD_A) y = FOLD_A + (y - FOLD_A) - ((y - FOLD_A) * (y - FOLD_A)) / (2 * (90 - FOLD_A));
        const twist = clamp(
          90 * (1 - Math.exp((-gain * y) / 90)) - adv.wobble * e + (30 * f + 12 * spDown.x * hov) * openW,
          0,
          89
        );
        const thr = th * DEG;
        const tb = twist * DEG;
        const st = Math.sin(tb);
        const ct = Math.cos(tb);
        const sx = Math.sin(thr);
        const o = i * 4;
        order[i] = i;
        front[i] = Math.cos(thr);
        ta[o] = sx;
        ta[o + 1] = Math.cos(thr);
        ta[o + 2] = st;
        ta[o + 3] = ct;
        tb4[o] = sx >= 0 ? 1 : -1;
        tb4[o + 1] = R * st + B * ct;
        const fsd = clamp(sx / 0.05, -1, 1) * 0.5 + 0.5;
        tb4[o + 2] = fsd * fsd * (3 - 2 * fsd);
        tb4[o + 3] = Math.min(f, 1.5) + 0.25 * spDown.x * hov;
        tc[o] = (amp * e + 0.06 * f + 0.035 * spDown.x * hov) * L;
        tc[o + 1] = 0;
        tc[o + 2] = 0;
        tc[o + 3] = 0;
      }

      const ord = order.subarray(0, n);
      ord.sort((a, b) => front[a] - front[b]);
      for (let k = 0; k < n; k++) {
        const i = ord[k];
        for (let c = 0; c < 4; c++) {
          sa[k * 4 + c] = ta[i * 4 + c];
          sb[k * 4 + c] = tb4[i * 4 + c];
          scc[k * 4 + c] = tc[i * 4 + c];
        }
      }
      const idx = n;

      const travel = Math.max(0, adv.lightTravel) / 100;
      const phi = phase * Math.PI * 2;
      let lx = -0.45 * travel * Math.cos(phi) + spX.x * 0.5 * pAmt;
      let ly = 0.75 + 0.1 * travel * Math.sin(phi) - spY.x * 0.3 * pAmt;
      let lz = 0.6;
      const ll = Math.hypot(lx, ly, lz) || 1;
      lx /= ll;
      ly /= ll;
      lz /= ll;

      const key = [live.warm, live.cool, adv.pinkColor, adv.deepColor, adv.lightColor, adv.tealColor, adv.hotColor, adv.teal].join("|");
      const palette = {
        warm: parseColor(live.warm, DEFAULTS.warm),
        cool: parseColor(live.cool, DEFAULTS.cool),
        pink: parseColor(adv.pinkColor, DEFAULT_ADVANCED.pinkColor),
        deep: parseColor(adv.deepColor, DEFAULT_ADVANCED.deepColor),
        lite: parseColor(adv.lightColor, DEFAULT_ADVANCED.lightColor),
        teal: mixRGB(
          mixRGB(parseColor(live.cool, DEFAULTS.cool), parseColor(adv.deepColor, DEFAULT_ADVANCED.deepColor), 0.5),
          parseColor(adv.tealColor, DEFAULT_ADVANCED.tealColor),
          clamp(adv.teal / 60, 0, 1.6)
        ).map((v) => clamp(v, 0, 1)),
        hot: parseColor(adv.hotColor, DEFAULT_ADVANCED.hotColor),
      };

      const g = gl;
      const cp = colorP;
      if (!g || !cp) return;
      applySize();
      pollTimers();
      let q = null;
      if (timerExt && queries.length < 4) {
        q = g.createQuery();
        if (q) g.beginQuery(timerExt.TIME_ELAPSED_EXT, q);
      }

      g.viewport(0, 0, canvas.width, canvas.height);
      g.clearColor(0, 0, 0, 0);
      g.clear(g.COLOR_BUFFER_BIT);
      g.bindVertexArray(vao);

      const geom = (P) => {
        g.useProgram(P.prog);
        g.uniform4fv(P.U["uSA[0]"], sa.subarray(0, idx * 4));
        g.uniform4fv(P.U["uSB[0]"], sb.subarray(0, idx * 4));
        g.uniform4fv(P.U["uSC[0]"], scc.subarray(0, idx * 4));
        P.u4.uGeo.set(g, R, L, T, r0);
        g.uniform2f(P.U.uPivot, 0, adv.pivotY);
        g.uniform4f(P.U.uMap, originX, originY, stageU, ringU);
        P.u4.uPl.set(g, cenX, cenY, offX, offY);
        P.u4.uPl2.set(g, ca, sA, cT, sT);
        g.uniform4f(P.U.uPl3, Math.cos(yaw), Math.sin(yaw), 0, 0);
        g.uniform3f(P.U.uRes, canvas.width, canvas.height, persp);
        g.uniform2f(P.U.uShade, clamp(adv.contact, 0, 100) / 100, CONTACT_W);
        P.u4.uGeo2.set(g, Math.max(0, adv.bevel), Math.max(0, adv.tailLength) / L, phase, reduced ? 0 : travel);
      };

      geom(cp);
      g.enable(g.BLEND);
      g.activeTexture(g.TEXTURE0);
      g.bindTexture(g.TEXTURE_2D, palTex);
      if (key !== palKey) {
        bakeTables(palette, tabBytes);
        g.texSubImage2D(g.TEXTURE_2D, 0, 0, 0, TAB_W, TAB_ROWS * 4, g.RGBA, g.UNSIGNED_BYTE, tabBytes);
        palKey = key;
      }
      const U = cp.U;
      g.uniform1i(U.uTab, 0);
      cp.u4.uTabC.set(g, FACE_C[0], FACE_C[FACE_C.length - 1], WALL_C[0], WALL_C[WALL_C.length - 1]);
      cp.u4.uFilm.set(g, adv.filmShift / 30, ((adv.rimFilm - 50) / 100) * 0.25, adv.rimTop / 100, 0.03 * spX.x * pAmt);
      cp.u4.uRing.set(g, RING.S, RING.SIG, RING.AMOUNT * (adv.sheen / 25), RING.HUE0);
      cp.u4.uRing2.set(g, RING.HUE1, RING.LIFT, RING.C, 0);
      g.uniform3fv(U.uLite, palette.lite);
      g.uniform3fv(U.uHot, palette.hot);
      g.uniform3fv(U.uPink, palette.pink);
      g.uniform3fv(U.uWarm, palette.warm);
      g.uniform3f(U.uLight, lx, ly, lz);
      cp.u4.uLook.set(g, adv.shadow / 100, adv.specular / 100, Math.max(1, adv.shininess), 0);
      g.drawArrays(g.TRIANGLES, 0, idx * 6);

      const grain = Math.max(0, adv.grain) / 100;
      const vig = Math.max(0, adv.vignette) / 100;
      if ((grain > 0 || vig > 0) && fxProg && FXU) {
        if (animating) seed = Math.floor(clock * 24) % 97;
        g.useProgram(fxProg);
        g.uniform4f(FXU.uFx, grain, vig, seed, 0);
        g.uniform2f(FXU.uRes, canvas.width, canvas.height);
        g.drawArrays(g.TRIANGLES, 0, 3);
      }
      if (q && timerExt) {
        g.endQuery(timerExt.TIME_ELAPSED_EXT);
        queries.push(q);
      }
      dirty = false;
      ladder(now);
    };

    if (!init()) {
      return () => {
        ro.disconnect();
        io.disconnect();
      };
    }
    requestSize();
    wake();

    return () => {
      stop();
      wakeRef.current = () => {};
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      mq?.removeEventListener?.("change", onMq);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerenter", onMove)
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("scroll", onScroll, { capture: true });
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      const g = gl;
      if (g && !g.isContextLost()) {
        for (const q of queries) g.deleteQuery(q);
        if (colorP) g.deleteProgram(colorP.prog);
        if (fxProg) g.deleteProgram(fxProg);
        if (vao) g.deleteVertexArray(vao);
        if (palTex) g.deleteTexture(palTex);
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: style?.aspectRatio ?? "auto",
        ...style,
        position: "relative",
        overflow: "hidden",
        background,
        touchAction: "pan-y",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}

const __originkitPresetProps = {
  placement: {
    x: 0,
    y: 70,
    angle: 0,
    tilt: 0,
  },
  advanced: {
    bladeWidth: 282,
    bladeLength: 600,
    thickness: 26,
    bevel: 3.5,
    tailLength: 120,
    pivotY: 400,
    fanAngle: 180,
    twistGain: 100,
    pinkColor: "#B51F66",
    deepColor: "#3300CC",
    lightColor: "#B0A8EC",
    tealColor: "#008989",
    hotColor: "#F6DDA8",
    filmShift: 30,
    rimFilm: 50,
    rimTop: 0,
    teal: 60,
    shadow: 0,
    contact: 45,
    specular: 70,
    shininess: 60,
    sheen: 25,
    grain: 0,
    vignette: 0,
    cycleMs: 6000,
    staggerMs: 80,
    wobble: 3,
    sway: 4,
    lightTravel: 100,
  },
};

export default function CorollaGleam(props) {
  return <BaseCorollaGleam {...__originkitPresetProps} {...props} />;
}
