import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement)

const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
const lineMaterial = new THREE.LineBasicMaterial( { color: 0xff00ff } );
const lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( lineGeometry, lineMaterial );
// const geometry = new THREE.CircleGeometry(5, 32);
// pice one 
setRingGeometry([10, 20, 30], ['red', 'green', 'blue'], scene, null)
setRingGeometry([10, 20, 30], ['red', 'green', 'blue'], scene, [0, 0, 2])
// scene
scene.add( line )

camera.position.set( 0, 20, 100 );
controls.update();
var animate = () => {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}

animate()


function setRingGeometry(arr: any, colors: any, scene: any, position: any) {
    const sum = arr.reduce((a: number, b: number) => a + b, 0)
    let ratioBy2Pi:any = []
    arr.forEach((o: number, index: number) => {
        let start 
        if (index === 0) {
            start = 0
        } else {
            start = ratioBy2Pi[index - 1].start + ratioBy2Pi[index - 1].angle
        }
        ratioBy2Pi.push({ start: start, angle: o / sum * 2 * Math.PI})
    })
    ratioBy2Pi.forEach((obj: any, index: number) => {
        const geometry = new THREE.RingGeometry( 1, 5, 32, 1,  obj.start, obj.angle);
        const material = new THREE.MeshBasicMaterial( { color: colors[index], side: THREE.DoubleSide });
        const ring = new THREE.Mesh( geometry, material );
        scene.add(ring);
        if ( position ) {
            ring.position.set(position[0], position[1], position[2]);
        }
    })
}