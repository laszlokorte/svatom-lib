export const offsetRect = (o) => [
	L.applyAt("x", L.add(o)),
	L.applyAt("y", L.add(o)),
	L.applyAt("width", L.subtract(2 * o)),
	L.applyAt("height", L.subtract(2 * o)),
];

export const lensTranslateBuilder =
	(...axis) =>
	(...deltas) =>
		R.zipWith((ax, d) => L.applyAt(ax, L.add(d)), axis, deltas);

export const lensScaleBuilder =
	(...axis) =>
	(...deltas) =>
		R.zipWith((ax, d) => L.applyAt(ax, L.multiply(d)), axis, deltas);

export const lensRotateBuilder = (ax1, ax2) => (angle) => [
	L.applyAt(
		L.pick({ ax1, ax2 }),
		L.iso(
			expect(R.is(Object), ({ ax1, ax2 }) => ({
				ax1: ax1 * Math.cos(angle) - ax2 * Math.sin(angle),
				ax2: ax1 * Math.sin(angle) + ax2 * Math.cos(angle),
			})),
			expect(R.is(Object), ({ ax1, ax2 }) => ({
				ax1: ax1 * Math.cos(-angle) - ax2 * Math.sin(-angle),
				ax2: ax1 * Math.sin(-angle) + ax2 * Math.cos(-angle),
			})),
		),
	),
];

export const lens3dPerspectiveBuilder =
	(ax1, ax2, ax3, ax4) => (fov, aspect, near, far) => {
		const tanfov = 1 / Math.tan(fov / 2);
		const fpn = -(far + near) / (far - near);
		const ftn = -(2 * far * near) / (far - near);

		return [
			L.applyAt(ax1, [L.multiply(tanfov), L.multiply(aspect)]),
			L.applyAt(ax2, L.multiply(tanfov)),
			L.applyAt(
				L.pick({ ax3, ax4 }),
				L.iso(
					({ ax3, ax4 }) => ({
						ax3: fpn * ax3 + ftn * ax4,
						ax4: -ax3,
					}),
					({ ax3, ax4 }) => ({
						ax3: -ax4,
						ax4: (ax3 + fpn * ax4) / ftn,
					}),
				),
			),
		];
	};

const lerp = (a, b, t) => b * t + (1 - t) * a;

export const lens3dProjectBuilder =
	(ax1, ax2, ax3, ax4) =>
	(ortho = 0) => [
		L.applyAt(
			L.pick({ ax1, ax2, ax3, ax4 }),
			L.iso(
				expect(R.is(Object), ({ ax1, ax2, ax3, ax4 }) => ({
					ax1: ax1 / lerp(ax4, 1.5, ortho),
					ax2: ax2 / lerp(ax4, 1.5, ortho),
					ax3: ax3 / lerp(ax4, 1.5, ortho),
					ax4: ax4,
				})),
				expect(R.is(Object), ({ ax1, ax2, ax3, ax4 }) => ({
					ax1: ax1 * lerp(ax4, 1.5, ortho),
					ax2: ax2 * lerp(ax4, 1.5, ortho),
					ax3: ax3 * lerp(ax4, 1.5, ortho),
					ax4: ax4,
				})),
			),
		),
	];

export const lens3dTranslate = lensTranslateBuilder("x", "y", "z");
export const lens2dTranslate = lensTranslateBuilder("x", "y", "z");
export const lens3dScale = lensScaleBuilder("x", "y", "z");
export const lens2dScale = lensScaleBuilder("x", "y");
export const lens3dRotateX = lensRotateBuilder("y", "z");
export const lens3dRotateY = lensRotateBuilder("x", "z");
export const lens3dRotateZ = lensRotateBuilder("x", "y");
export const lens2dRotate = lensRotateBuilder("x", "y");
export const lens3dPerspective = lens3dPerspectiveBuilder("x", "y", "z", "w");
export const lens3dProject = lens3dProjectBuilder("x", "y", "z", "w");

export const coordPair = L.iso(
	expect(R.is(Object), ({ x, y }) => `${x},${y}`),
	expect(R.is(String), (s) => {
		const [x, y] = s.split(",").map(Number);
		return { x, y };
	}),
);

export const coordString = L.iso(
	expect(R.is(Array), R.pipe(R.map(L.get(coordPair)), R.join(" "))),
	expect(
		R.is(String),
		R.pipe(
			R.trim,
			R.split(/\s+/),
			R.map((p) => L.set(coordPair, p, p)),
		),
	),
);