import * as THREE from "three";

// SECTION: Canvas
const canvas = document.querySelector("canvas.webgl");

// SECTION: Scene
const scene = new THREE.Scene();

/**SECTION: Objects
 */
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xfff000 })
);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xfffeee })
);

cube1.position.set(0, 1, 0);
cube2.position.set(1, 0, 0);

group.add(cube1);
group.add(cube2);
group.add(cube3);

group.position.set(1, 1, 0);

group.rotation.set(Math.PI / 4, 0, 0);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xfff000 });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 1;
// mesh.position.y = 2;
// mesh.position.z = -2;
// scene.add(mesh);

// console.log(mesh.position.length());

// SECTION: Axes Helper
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// SECTION: Scaling
// mesh.scale.set(1, 1, 3);

// SECTION: Rotation (in radians)
// mesh.rotation.reorder("XYZ");
// mesh.rotation.set(Math.PI/4,Math.PI/2,0);
// mesh.rotation.set(0, Math.PI / 2, 0);

/** SECTION: Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/** SECTION: Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.z = 3
// camera.position.y = 0.5
camera.position.set(2, 1, 3);

scene.add(camera);

camera.lookAt(group.position);

// console.log(mesh.position.distanceTo(camera.position));

/** SECTION: Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
