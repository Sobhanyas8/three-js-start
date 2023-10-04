import * as THREE from "three";
import gsap from "gsap";

// SECTION: Canvas
const canvas = document.querySelector("canvas.webgl");

// SECTION: Scene
const scene = new THREE.Scene();

// SECTION: Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xaaff08 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// SECTION: Sizes
const sizes = {
  width: 800,
  height: 600,
};

// SECTION: Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// SECTION: Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

// SECTION: Animation
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime)

  // Update object
  mesh.rotation.z = (Math.PI / 4) * elapsedTime;
  mesh.rotation.x = (Math.PI / 4) * elapsedTime;

  mesh.position.y = Math.sin(elapsedTime);
  mesh.position.x = Math.cos(elapsedTime);

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
