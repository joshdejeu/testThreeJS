import * as THREE from 'three';

export class Cube extends THREE.Mesh {
    constructor({
        width,
        height,
        depth,
        color = '#00ff00',
        velocity = {
            x: 0,
            y: -0.05,
            z: 0
        },
        position = {
            x: 0,
            y: 0,
            z: 0
        } }) {
        super(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshPhongMaterial({ color })
        );
        this.width = width;
        this.height = height;
        this.depth = depth;

        this.position.set(position.x, position.y, position.z)
        this.top = this.position.y + this.height / 2;
        this.bottom = this.position.y - this.height / 2;

        this.velocity = velocity;
        this.gravity = -0.01;
    }
    generateCube(scene) {
        // const cube = new THREE.Mesh(geometry, material);
        // cube.position.set(0, 1, 0)
        // cube.castShadow = true;
        // scene.add(cube)
        // return cube;
    }
    update(ground) {
        this.top = this.position.y + this.height / 2;
        this.bottom = this.position.y - this.height / 2;

        this.velocity.y += this.gravity;
        this.applyGravity(ground);
        this.position.x += this.velocity.x
        this.velocity.x *= 0.9;
        this.position.z += this.velocity.z
        this.velocity.z *= 0.9;
    }
    applyGravity(ground) {
        // Hits the ground : invert velocity
        if (this.bottom + this.velocity.y <= ground.top) {
            this.velocity.y *= 0.8;
            this.velocity.y = -this.velocity.y;
        }
        // Falling through the air : increase velocity
        else this.position.y += this.velocity.y
    }
}