import '/src/style.css';
import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);
onWindowResize();

const geometry = new THREE.IcosahedronGeometry(1, 1);
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.background = new THREE.Color(0x000000);
scene.add(mesh);
camera.position.z = 3;

// Toggle wireframe mode with 'w' key
// todo: default to wireframe
window.addEventListener('keydown', e => {
  mesh.material.wireframe = e.key === 'w' ? !mesh.material.wireframe : mesh.material.wireframe;
});

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();