import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// The logo in 3D. Mark geometry mirrors components/Logo.tsx (48-unit SVG grid,
// centred on 24,24 and flipped to y-up): stroke centreline 6..42, corner radius 8,
// stroke 6.5, gap on the right from y 17 to 31, module 11 units square at x 27.

const COLORS = { ink: 0x0f1413, brand: 0x0a6e6a, tile: 0xe6e4dd, tileLift: 0xcfe5e1, paper: 0xf5f4f0 } as const;
const STROKE_HALF = 3.25;
const CORNER = 8;
const OUTER = 18 + STROKE_HALF; // centreline sits 18 units from the centre
const INNER = 18 - STROKE_HALF;
const GAP_HALF = 7; // gap spans y 17..31 in SVG units
const MODULE = { x: 8.5, size: 11, radius: 2.5 } as const;

const GRID = { cols: 22, rows: 12, pitch: 9, floorY: -34 } as const;
const CYCLE_SECONDS = 7;
const MAX_TILT = 0.32;

export interface SceneOptions {
  reducedMotion: boolean;
  onFirstFrame: () => void;
}

const buildRingShape = () => {
  const ro = CORNER + STROKE_HALF;
  const ri = CORNER - STROKE_HALF;
  const c = 18 - CORNER; // corner centre offset from origin
  const shape = new THREE.Shape();
  shape.moveTo(OUTER, GAP_HALF);
  shape.absarc(c, c, ro, 0, Math.PI / 2, false);
  shape.absarc(-c, c, ro, Math.PI / 2, Math.PI, false);
  shape.absarc(-c, -c, ro, Math.PI, Math.PI * 1.5, false);
  shape.absarc(c, -c, ro, Math.PI * 1.5, Math.PI * 2, false);
  shape.lineTo(OUTER, -GAP_HALF);
  shape.lineTo(INNER, -GAP_HALF);
  shape.absarc(c, -c, ri, 0, -Math.PI / 2, true);
  shape.absarc(-c, -c, ri, Math.PI * 1.5, Math.PI, true);
  shape.absarc(-c, c, ri, Math.PI, Math.PI / 2, true);
  shape.absarc(c, c, ri, Math.PI / 2, 0, true);
  shape.lineTo(INNER, GAP_HALF);
  shape.closePath();
  return shape;
};

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Module path over one cycle: rest, lift out through the gap, quarter turn, slide home, rest.
const modulePose = (phase: number) => {
  const OUT = 22;
  const UP = 6;
  if (phase < 0.35) return { x: MODULE.x, y: 0, spin: 0 };
  if (phase < 0.55) {
    const k = easeInOut((phase - 0.35) / 0.2);
    return { x: MODULE.x + OUT * k, y: UP * Math.sin(k * Math.PI * 0.5), spin: 0 };
  }
  if (phase < 0.7) {
    const k = easeInOut((phase - 0.55) / 0.15);
    return { x: MODULE.x + OUT, y: UP, spin: (Math.PI / 2) * k };
  }
  if (phase < 0.9) {
    const k = easeInOut((phase - 0.7) / 0.2);
    return { x: MODULE.x + OUT * (1 - k), y: UP * (1 - k), spin: Math.PI / 2 };
  }
  return { x: MODULE.x, y: 0, spin: Math.PI / 2 };
};

export const mountScene = (canvas: HTMLCanvasElement, options: SceneOptions) => {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  // Fog in the page colour dissolves the far tiles into the paper instead of a hard edge.
  scene.fog = new THREE.Fog(COLORS.paper, 180, 290);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const envTexture = pmrem.fromScene(room, 0.04).texture;
  scene.environment = envTexture;

  const camera = new THREE.PerspectiveCamera(32, 1, 1, 600);
  camera.position.set(0, 26, 150);
  camera.lookAt(0, -6, 0);

  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(-40, 80, 60);
  scene.add(key);

  // The mark
  const mark = new THREE.Group();
  // Offset left so the module's trip out of the gap stays inside the frame.
  mark.position.x = -8;
  scene.add(mark);

  const ringGeometry = new THREE.ExtrudeGeometry(buildRingShape(), {
    depth: 7,
    bevelEnabled: true,
    bevelThickness: 0.8,
    bevelSize: 0.6,
    bevelSegments: 4,
    curveSegments: 24,
  });
  ringGeometry.translate(0, 0, -3.5);
  const ringMaterial = new THREE.MeshPhysicalMaterial({
    color: COLORS.ink,
    roughness: 0.32,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.18,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  mark.add(ring);

  const moduleGeometry = new RoundedBoxGeometry(MODULE.size, MODULE.size, MODULE.size, 4, MODULE.radius);
  const moduleMaterial = new THREE.MeshPhysicalMaterial({
    color: COLORS.brand,
    roughness: 0.22,
    metalness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });
  const moduleMesh = new THREE.Mesh(moduleGeometry, moduleMaterial);
  moduleMesh.position.set(MODULE.x, 0, 0);
  mark.add(moduleMesh);

  // Floor of modules: the systems the mark sits on.
  const tileGeometry = new RoundedBoxGeometry(GRID.pitch - 1.6, 1.4, GRID.pitch - 1.6, 2, 0.6);
  const tileMaterial = new THREE.MeshStandardMaterial({ color: COLORS.tile, roughness: 0.85 });
  const count = GRID.cols * GRID.rows;
  const tiles = new THREE.InstancedMesh(tileGeometry, tileMaterial, count);
  const tileBase: { x: number; z: number; d: number }[] = [];
  for (let r = 0; r < GRID.rows; r++) {
    for (let col = 0; col < GRID.cols; col++) {
      const x = (col - (GRID.cols - 1) / 2) * GRID.pitch;
      const z = (r - (GRID.rows - 1) / 2) * GRID.pitch - 20;
      tileBase.push({ x, z, d: Math.hypot(x, z + 20) });
    }
  }
  const lift = new THREE.Color(COLORS.tileLift);
  const base = new THREE.Color(COLORS.tile);
  const tint = new THREE.Color();
  scene.add(tiles);

  const dummy = new THREE.Object3D();
  const placeTiles = (time: number) => {
    tileBase.forEach(({ x, z, d }, i) => {
      const wave = Math.max(0, Math.sin(d * 0.07 - time * 1.6));
      dummy.position.set(x, GRID.floorY + wave * wave * 3.2, z);
      dummy.updateMatrix();
      tiles.setMatrixAt(i, dummy.matrix);
      tiles.setColorAt(i, tint.copy(base).lerp(lift, wave * wave * 0.85));
    });
    tiles.instanceMatrix.needsUpdate = true;
    if (tiles.instanceColor) tiles.instanceColor.needsUpdate = true;
  };

  // Sizing
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Narrow screens pull the camera back so the module's travel stays in frame.
    camera.position.z = w / h < 1 ? 186 : 150;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  // Pointer tilt, eased so it never snaps.
  const target = { x: 0, y: 0 };
  const onPointer = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    target.y = ((event.clientX - rect.left) / rect.width - 0.5) * 2 * MAX_TILT;
    target.x = ((event.clientY - rect.top) / rect.height - 0.5) * 2 * MAX_TILT * 0.6;
  };

  const render = (time: number) => {
    const phase = (time / CYCLE_SECONDS) % 1;
    const pose = modulePose(phase);
    moduleMesh.position.set(pose.x, pose.y, 0);
    moduleMesh.rotation.y = pose.spin;
    mark.rotation.y += (target.y - 0.28 - mark.rotation.y) * 0.06;
    mark.rotation.x += (target.x - 0.08 - mark.rotation.x) * 0.06;
    mark.position.y = Math.sin(time * 0.8) * 1.2;
    placeTiles(time);
    renderer.render(scene, camera);
  };

  let frame = 0;
  let running = false;
  let firstFrameSent = false;
  const clock = new THREE.Clock();

  const loop = () => {
    render(clock.getElapsedTime());
    if (!firstFrameSent) {
      firstFrameSent = true;
      options.onFirstFrame();
    }
    if (running) frame = requestAnimationFrame(loop);
  };

  const start = () => {
    if (running || options.reducedMotion) return;
    running = true;
    clock.start();
    frame = requestAnimationFrame(loop);
  };
  const stop = () => {
    running = false;
    clock.stop();
    cancelAnimationFrame(frame);
  };

  if (options.reducedMotion) {
    // One still frame at rest, tilted to show depth.
    mark.rotation.set(-0.08, -0.28, 0);
    moduleMesh.position.set(MODULE.x, 0, 0);
    placeTiles(0);
    renderer.render(scene, camera);
    options.onFirstFrame();
  } else {
    window.addEventListener("pointermove", onPointer, { passive: true });
  }

  // Pause whenever the canvas is off screen.
  const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
    threshold: 0.01,
  });
  visibility.observe(canvas);

  return () => {
    stop();
    visibility.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener("pointermove", onPointer);
    [ringGeometry, moduleGeometry, tileGeometry].forEach((g) => g.dispose());
    [ringMaterial, moduleMaterial, tileMaterial].forEach((m) => m.dispose());
    tiles.dispose();
    envTexture.dispose();
    pmrem.dispose();
    room.dispose();
    renderer.dispose();
  };
};
