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

        this.position.set(position.x, position.y, position.z);

        this.updateSides();

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
    updateSides() {
        this.right = this.position.x + this.width / 2;
        this.left = this.position.x - this.width / 2;
        this.top = this.position.y + this.height / 2;
        this.bottom = this.position.y - this.height / 2;
        this.front = this.position.z + this.depth / 2;
        this.back = this.position.z - this.depth / 2;
    }
    update(ground) {
        this.updateSides();

        this.position.x += this.velocity.x
        this.position.z += this.velocity.z
        const zCollision = this.front >= ground.back && this.back <= ground.front;
        const xCollision = this.right >= ground.left && this.left <= ground.right;
        if (zCollision && xCollision) {
            console.log('test')
        }

        this.applyGravity(ground);
    }
    applyGravity(ground) {
        this.velocity.y += this.gravity;
        // Hits the ground : invert velocity
        if (this.bottom + this.velocity.y <= ground.top) {
            this.velocity.y *= 0.8;
            this.velocity.y = -this.velocity.y;
        }
        // Falling through the air : increase velocity
        else this.position.y += this.velocity.y
    }
}