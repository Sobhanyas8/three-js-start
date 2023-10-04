import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import gsap from "gsap";

// SECTION: cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", function (event) {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  // console.log(cursor.x);
});

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
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", function () {
  // console.log('window resized!');

  // SUB: Update Sizes
  (sizes.width = window.innerWidth),
    (sizes.height = window.innerHeight),
    // SUB: Update Camera
    (camera.aspect = sizes.width / sizes.height);
  camera.updateProjectionMatrix();

  // SUB: Update Renderer Sizes
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// SECTION: Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1 ,
//   -1 ,
//   0.1,
//   100
// );
camera.position.z = 4;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1.5;
// controls.update();

// SECTION: Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

// SECTION: Animation
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime)

  // Update object
  // mesh.rotation.z = (Math.PI / 4) * elapsedTime;
  // mesh.rotation.x = (Math.PI / 4) * elapsedTime;

  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.x = Math.cos(elapsedTime);
  // mesh.position.z = Math.cos(elapsedTime);

  // Update Camera
  // camera.position.x = cursor.x * 20;
  // camera.position.y = cursor.y * 20;
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.x * 3;
  // camera.lookAt(mesh.position);

  // Updating Controller
  controls.update();

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
