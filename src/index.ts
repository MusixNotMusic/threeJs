import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { buildRingGeometry1, buildRingGeometry, buildLathe } from './buildShape'
import {buildEllipseCurve} from './ellipseCurve'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xffffff, 1);

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
// buildRingGeometry([10, 20, 30], ['red', 'green', 'blue'], scene, null)
// buildRingGeometry([10, 20, 30], ['red', 'green', 'blue'], scene, [0, 0, 2])
// buildLathe(scene)
buildEllipseCurve(scene)
// let pie = buildRingGeometry1([0.25, 0.6], ['red', 'green', 'blue'])
// scene.add(pie)
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