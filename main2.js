import * as THREE from "three";
import { PeppersGhostEffect } from 'three/addons/effects/PeppersGhostEffect.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

let container;
let camera, scene, renderer, effect;
let group;
let mixer;

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000);

    scene = new THREE.Scene();

    // Add a point light in the middle
    const pointLight = new THREE.PointLight(0xffffff, 1, 500);
    pointLight.position.set(0, 15, 3); // Position it in the middle
    scene.add(pointLight);

    // Agregar luz ambiental
    const ambientLight = new THREE.AmbientLight(0x404040); // Color de la luz ambiental
    scene.add(ambientLight);

    group = new THREE.Group();
    scene.add(group);

    const loader = new FBXLoader();
    loader.load('Watch15042020.fbx', function(object) {
        console.log("Modelo cargado:", object);

        if (object.animations && object.animations.length > 0) {
            mixer = new THREE.AnimationMixer(object);
            const action = mixer.clipAction(object.animations[0]);
            action.play();
        } else {
            console.warn("El modelo no contiene animaciones.");
        }

        object.traverse(function(child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Ajusta el tamaño del modelo FBX aquí
        const scaleFactor = 0.2; // Ajusta el factor de escala según sea necesario
        object.scale.set(scaleFactor, scaleFactor, scaleFactor);

        object.position.z = 0;
        object.position.y = 0;

        group.add(object);
    }, undefined, function(error) {
        console.error('Error al cargar el modelo:', error);
    });

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight); // Ensure renderer size is set
    container.appendChild(renderer.domElement);

    effect = new PeppersGhostEffect(renderer);
    effect.setSize(window.innerWidth, window.innerHeight);
    effect.cameraDistance = 5;

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    effect.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    if (mixer) {
        mixer.update(0.01);
    }
    // Rotación del objeto FBX sobre su eje
    if (group) {
        group.rotation.y += 0.1; // Ajusta la velocidad de rotación según sea necesario
    }
    effect.render(scene, camera);
}
