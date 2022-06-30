import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import * as dat from "lil-gui";
import "./style.css";
/**
 * base
 */
// debug
const gui = new dat.GUI();

// canvas
const canvas = document.querySelector("canvas.webgl");

//scene
const scene = new THREE.Scene();

/**
 * textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("textures/particles/10.png");

/**
 *  particles
 */
// geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 20000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}
particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

// material
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  //   color: 0xff00ff,
  transparent: true,
  alphaMap: particleTexture,
  //     alphaTest: 0.001,
  //     depthTest: false,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true,
});

// points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * camera
 */
// base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // update particles
  //   particles.rotation.y = elapsedTime * 0.2;

  //   for (let i = 0; i < count; i++) {
  //     const i3 = i * 3;

  //     const x = particlesGeometry.attributes.position.array[i3];
  //     particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
  //   }
  //   particlesGeometry.attributes.position.needsUpdate = true;

  // update controls
  controls.update();

  // render
  renderer.render(scene, camera);

  // call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
