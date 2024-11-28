import * as THREE from 'three';

export class Cube extends THREE.Mesh {
    constructor(scene, {width, height, depth}) {
        this.cube = super(new THREE.BoxGeometry(width, height, depth), new THREE.MeshPhongMaterial({ color: 0xffff00 }));
        console.log(this.cube.height)
        scene.add(cube)

        this.height = dimensions.height;
    }
    generateCube(scene) {
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 1, 0)
        cube.castShadow = true;
        scene.add(cube)
        return cube;
    }
    update() {
        this.cube.position.y -= 0.0981;
    }
}