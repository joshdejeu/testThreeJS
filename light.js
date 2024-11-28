import * as THREE from 'three';

export function generateLight(scene) {
    // Create a directional light
    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.y = 3;
    light.position.z = 2;
    light.castShadow = true;
    scene.add(light);

    // Create a white sphere to represent the light position
    const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16); // Small sphere (radius = 0.1)
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // White material
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // Position the sphere at the light's position
    sphere.position.copy(light.position);

    // Add the sphere to the scene
    scene.add(sphere);
}
