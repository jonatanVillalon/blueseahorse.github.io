"use strict";
{
	// http://mrl.nyu.edu/~perlin/noise/
	const perlin = {
		init() {
			this.p = new Uint8Array(512);
			const p = new Uint8Array(256);
			for (let i = 0; i < 256; i++) p[i] = i;
			for (let i = 255; i > 0; i--) {
				const n = Math.floor((i + 1) * Math.random());
				[p[i], p[n]] = [p[n], p[i]];
			}
			for (let i = 0; i < 512; i++) this.p[i] = p[i & 255];
		},
		fade(t) {
			return t * t * t * (t * (t * 6 - 15) + 10);
		},
		lerp(t, a, b) {
			return a + t * (b - a);
		},
		grad(hash, x, y, z) {
			const h = hash & 15;
			const u = h < 8 ? x : y;
			const v = h < 4 ? y : h == 12 || h == 14 ? x : z;
			return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
		},
		noise(xi, yi, zi) {
			const X = Math.floor(xi) & 255;
			const Y = Math.floor(yi) & 255;
			const Z = Math.floor(zi) & 255;
			const x = xi - Math.floor(xi);
			const y = yi - Math.floor(yi);
			const z = zi - Math.floor(zi);
			const u = this.fade(x);
			const v = this.fade(y);
			const w = this.fade(z);
			const A = this.p[X] + Y;
			const AA = this.p[A] + Z;
			const AB = this.p[A + 1] + Z;
			const B = this.p[X + 1] + Y;
			const BA = this.p[B] + Z;
			const BB = this.p[B + 1] + Z;
			return this.lerp(
				w,
				this.lerp(
					v,
					this.lerp(u, this.grad(this.p[AA], x, y, z), this.grad(this.p[BA], x - 1, y, z)),
					this.lerp(u, this.grad(this.p[AB], x, y - 1, z), this.grad(this.p[BB], x - 1, y - 1, z))
				),
				this.lerp(
					v,
					this.lerp(u, this.grad(this.p[AA + 1], x, y, z - 1), this.grad(this.p[BA + 1], x - 1, y, z - 1)),
					this.lerp(
						u,
						this.grad(this.p[AB + 1], x, y - 1, z - 1),
						this.grad(this.p[BB + 1], x - 1, y - 1, z - 1)
					)
				)
			);
		}
	};
	const canvas = webGL.init({
		alpha: false,
		stencil: false,
		antialias: false,
		depth: false,
	});
	canvas.blend(canvas.gl.ONE, canvas.gl.ONE);
	canvas.enableFullscreen({
		position: 'absolute',
		right: '7px',
		bottom: '7px',
		cursor: 'pointer',
		background: '#1e1e1e',
		fontFamily: 'Lato, Lucida Grande, Lucida Sans Unicode, Tahoma, Sans-Serif',
		fontSize: '0.8rem',
		padding: '2px 7px',
		borderRadius: '3px',
		border: '3px solid transparent',
		color: 'white',
		whiteSpace: 'nowrap',
		textAlign: 'center'
	});
	perlin.init();
	canvas.createBufferLine(100);
	let z = 0;
	function run() {
		const sw = canvas.width / 100;
		const sh = sw * 30;
		for (let i = 0; i < 180; i++) {
			canvas.beginPath();
			canvas.strokeStyle(
				z + i / 360,
				0.5,
				0.3
			);
			for (let j = -50; j < 50; j++) {
				const h = perlin.noise(j * 0.05, z - i * 0.01, z);
				canvas.lineTo(
					canvas.width * 0.5 + 0.01 * (i + 180) * j * sw * 0.5,
					-90 + i + canvas.height * 0.5 + h * sh
				);
			}
			canvas.stroke();
		}
		z += 0.0025;
		requestAnimationFrame(run);
	}
	run();
}
