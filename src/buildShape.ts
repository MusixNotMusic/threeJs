import * as THREE from 'three'
import * as _ from 'lodash'
import { slicePie } from './util'

export function buildRingGeometry(arr: any, colors: any, scene: any, position: any) {
    let ratioBy2Pi = slicePie(arr)
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

export function buildSegment (start: any, end: any, color: any) {
    var points: any = [];
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(0, 2, 0));
    points.push(new THREE.Vector3(0, 2, 1));
    points.push(new THREE.Vector3(0, 0, 1));
    var geometry = new THREE.LatheGeometry(points, 24, start, end);
    var material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
    console.log('buildSegement', points)
    return new THREE.Mesh(geometry, material)
}

export function buildLathe(scene: any) {
    // for ( let i = 0; i < 10; i ++ ) {
    //     points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
    // }
    var points = [
        new THREE.Vector2(50,60),
        new THREE.Vector2(25,0),
        new THREE.Vector2(50,-60)
    ];
    const geometry = new THREE.LatheGeometry( points, 24);
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00, transparent: false, side: THREE.DoubleSide } );
    const lathe = new THREE.Mesh( geometry, material );
    scene.add( lathe );
}

export function buildRingGeometry1 (divisions: any, colors: any) {
    var pie = new THREE.Object3D();
    var total = 2 * Math.PI;
    var reducer = function (memo: number, num: number) { return memo + num; };

    // fill the first segment
    pie.add(buildSegment(0, total * divisions[0], colors[0]));

    for (var i = 1; i < divisions.length; i++) {
      pie.add(buildSegment(
        // get the sum of all radii before this
        total * _.reduce(_.first(divisions), reducer, 0),
        total * divisions[i],
        colors[i]
      ));
    }

    // fill the rest of the pie
    var remainder = total * _.reduce(divisions, reducer, 0);
    pie.add(buildSegment(remainder, total - remainder, _.last(colors)));
    return pie;
}