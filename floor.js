import * as THREE from 'three';

export function generateFloor(scene) {
    // Create a floor using BoxGeometry (you can adjust the size as necessary)
    const ground = new THREE.Mesh(new THREE.BoxGeometry(5, 0.5, 5), new THREE.MeshStandardMaterial({ color: 0x0000ff }))
    ground.position.y = -2;
    ground.receiveShadow = true; // Ensure the floor receives shadows

    // Add the floor mesh to the scene
    scene.add(ground);
}
