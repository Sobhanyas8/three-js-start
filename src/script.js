import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import gsap from "gsap";
import * as dat from "dat.gui";

// SECTION: Textures
const manager = new THREE.LoadingManager();
manager.onStart = () => {
  console.log("Start complete!");
};
manager.onLoad = () => {
  console.log("Loading complete!");
};
manager.onProgress = () => {
  console.log("Progress complete!");
};
manager.onError = () => {
  console.log("Error !");
};

const textureLoader = new THREE.TextureLoader(manager);
const Galaxytexture = textureLoader.load("./galaxy.jpg");

Galaxytexture.repeat.x = 1;
Galaxytexture.repeat.y = 1;
Galaxytexture.wrapS = THREE.RepeatWrapping;
Galaxytexture.wrapT = THREE.RepeatWrapping;



Galaxytexture.rotation = Math.PI / 4;
Galaxytexture.center.x = 0.5;
Galaxytexture.center.y = 0.5;

Galaxytexture.minFilter = THREE.NearestFilter;
Galaxytexture.magFilter = THREE.NearestFilter;


// const image = new Image()
// const texture = new THREE.Texture(image);

// image.onload = () => {
//    texture.needsUpdate = true;
// }
// image.src='./galaxy.jpg'

// SECTION: Debug
const gui = new dat.GUI();

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
// const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4);
const geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
// const count = 50000;
// const positionArray = new Float32Array(count * 3 * 3);

// for (let i = 0; i < count * 3 * 3; i++) {
//   positionArray[i] = (Math.random() - 0.5) * 2;
// }

// const positionsAttribute = new THREE.BufferAttribute(positionArray, 3);
// const geometry1 = new THREE.BufferGeometry();
// geometry1.setAttribute("position", positionsAttribute);

const material = new THREE.MeshBasicMaterial({
  map: Galaxytexture,
  // color: 0xffff00
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Debug
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
gui.add(mesh.position, "x", -3, 3, 0.01).name("translateX");
gui.add(mesh.position, "z", -3, 3, 0.01).name("ZoomIn-Out");

gui.add(mesh, "visible");
gui.add(material, "wireframe");

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
  mesh.rotation.z = (Math.PI / 4) * elapsedTime;
  mesh.rotation.x = (Math.PI / 4) * elapsedTime;

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
