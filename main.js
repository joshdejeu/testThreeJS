import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { generateLight } from './light.js'
import { generateFloor } from './floor.js';
import { Cube } from './gamePlay.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const clock = new THREE.Clock(); // Create a new Clock instance
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)

generateLight(scene);
generateFloor(scene);
const cube = new Cube(scene, ({1, 1, 1}));
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0)

// Resize handling for window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    const deltaTime = clock.getDelta(); // Get the time since the last frame
    cube.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
