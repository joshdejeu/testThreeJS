import * as THREE from 'three';

function checkBoxCollision({ box1, box2 }) {
    const xCollision = box1.right >= box2.left && box1.left <= box2.right;
    const yCollision = box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom;
    const zCollision = box1.front >= box2.back && box1.back <= box2.front;
    return xCollision && yCollision && zCollision;
}


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

        this.applyGravity(ground);
    }
    applyGravity(ground) {
        this.velocity.y += this.gravity;
        //ground hit
        if (checkBoxCollision({ box1: this, box2: ground })) {
            this.velocity.y *= 0.8;
            this.velocity.y = -this.velocity.y;
        }else this.position.y += this.velocity.y;
    }
}