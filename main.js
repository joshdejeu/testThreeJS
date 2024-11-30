import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { generateLight } from './light.js'
import { Cube } from './gamePlay.js'

const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 10;
// OrthographicCamera(left, right, top, bottom, near, far)
// const camera = new THREE.OrthographicCamera(
//     frustumSize * aspect / -2,  // left
//     frustumSize * aspect / 2,   // right
//     frustumSize / 2,            // top
//     frustumSize / -2,           // bottom
//     0.1,                        // near
//     1000                        // far
// );
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const clock = new THREE.Clock(); // Create a new Clock instance
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)

generateLight(scene);
const cube = new Cube({ width: 1, height: 1, depth: 1, color: '#00ff00' });
const ground = new Cube({
    width: 5, height: 0.5, depth: 5, color: '#0000ff', position: {
        x: 0,
        y: -2,
        z: 0
    }
});
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0)

scene.add(cube);
scene.add(ground);


window.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 'ArrowUp') cube.velocity.z = -0.1;
    if (event.key === 's' || event.key === 'ArrowDown') cube.velocity.z = 0.1;
    if (event.key === 'a' || event.key === 'ArrowLeft') cube.velocity.x = -0.1;
    if (event.key === 'd' || event.key === 'ArrowRight') cube.velocity.x = 0.1;
    if (event.keyCode === 32) cube.velocity.y = 0.25;
})
window.addEventListener('keyup', (event) => {
    if (event.key === 'w' || event.key === 'ArrowUp') cube.velocity.z = 0;
    if (event.key === 's' || event.key === 'ArrowDown') cube.velocity.z = 0;
    if (event.key === 'a' || event.key === 'ArrowLeft') cube.velocity.x = 0;
    if (event.key === 'd' || event.key === 'ArrowRight') cube.velocity.x = 0;
})

// Resize handling for window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    const deltaTime = clock.getDelta(); // Get the time since the last frame
    cube.update(ground);

    camera.lookAt(cube.position)

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
