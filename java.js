
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const mtlLoader = new THREE.MTLLoader();

mtlLoader.load("Fed/cuna.mtl", function (materials) {
  materials.preload();

  const objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);

  objLoader.load(
    "Fed/cuna.obj",
    function (Scenary) {
      scene.add(Scenary);
      Scenary.receiveShadow = true; 
      Scenary.castShadow = true; 


    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error("An error occurred: " + error);
    }
  );
});


renderer.shadowMap.enabled = true ;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(-15,5,-20);
scene.add(light);

const light1 = new THREE.PointLight(0xffffff, 1, 50);
light1.position.set(-20,0,-20);
scene.add(light1);






const aro = new THREE.TextureLoader().load( "maderita.jpg" );

const balon1 = new THREE.TextureLoader().load( "futbol.jpeg" );

const balon2 = new THREE.TextureLoader().load( "pelu.jpeg" );

const balon3 = new THREE.TextureLoader().load( "pic.jpeg" );





// mesa

const geometry111 = new THREE.TorusGeometry(7, 0.7, 16, 100);
const material11 = new THREE.MeshBasicMaterial({ map: aro, color: 0xffffff });
const torus11 = new THREE.Mesh(geometry111, material11);
torus11.scale.set(1 / 20, 1 / 20, 1 / 20); // Scale down by 20 times
scene.add(torus11);

const geometry = new THREE.BoxGeometry(20, 1, 20);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
cube.scale.set(1 / 20, 1 / 20, 1 / 20); // Scale down by 20 times
scene.add(cube);

const geometryp = new THREE.CylinderGeometry(0.1, 0.1, 7, 32);
const materialp = new THREE.MeshBasicMaterial({ color: 0xfffff0f0ff });
const cylinderp = new THREE.Mesh(geometryp, materialp);
cylinderp.scale.set(1 / 20, 1 / 20, 1 / 20); // Scale down by 20 times
scene.add(cylinderp);

const geometryp2 = new THREE.CylinderGeometry(0.1, 0.1, 7, 32);
const materialp2 = new THREE.MeshBasicMaterial({ color: 0xfffff0f0ff });
const cylinderp2 = new THREE.Mesh(geometryp2, materialp2);
cylinderp2.scale.set(1 / 20, 1 / 20, 1 / 20); // Scale down by 20 times
scene.add(cylinderp2);

const geometrybola = new THREE.SphereGeometry(2.5, 32, 16);
const materialbola = new THREE.MeshBasicMaterial({ map: balon1, color: 0xffffff });
const futbol = new THREE.Mesh(geometrybola, materialbola);
futbol.scale.set(1 / 20, 1 / 20, 1 / 20); // Scale down by 20 times
scene.add(futbol);

const geometrybola1 = new THREE.SphereGeometry(2.5, 32, 16);
const materialbola1 = new THREE.MeshBasicMaterial({ map: balon2, color: 0xffffff });
const basquet = new THREE.Mesh(geometrybola1, materialbola1);
basquet.scale.set(1 / 20, 1 / 20, 1 / 20); // Scale down by 20 times
scene.add(basquet);

const geometrybola2 = new THREE.SphereGeometry(3, 32, 16);
const materialbola2 = new THREE.MeshBasicMaterial({ map: balon3, color: 0xffffff });
const tenis = new THREE.Mesh(geometrybola2, materialbola2);
tenis.scale.set(1 / 20, 1 / 20, 1 / 20); // Scale down by 20 times
scene.add(tenis);

const cubeGeometry5 = new THREE.BoxGeometry(1/10,1/10,1/10);
const cubeMaterial5 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube5 = new THREE.Mesh(cubeGeometry5, cubeMaterial5);

scene.add(cube5);

var effect = new THREE.StereoEffect( renderer);
effect.setSize( window.innerWidth, window.innerHeight);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

var controles = new THREE.DeviceOrientationControls(camera)



const luz2 = new THREE.PointLight(0x00008B, 1, 20); // Color amarillo
luz2.position.set(0, 3, 0); // Posición de la luz
// Añade la luz a la escena
scene.add(luz2);



camera.position.z = 1;
camera.position.y = 2.5;

var R = 0.05
var t=0;

 // Configurar física
 const gravity = new THREE.Vector3(0, -0.01, 0);

 // Crear tres esferas
 const spheres = [];
 const Yinicial = 2.5;

 for (let i = 0; i < 3; i++) {
   const sphereGeometry = new THREE.SphereGeometry(1/20, 32, 32);
   const sphereMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
   const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

   // Colocar esferas en posiciones iniciales aleatorias
   sphere.position.set(
     Math.random() * 2-1.1, // Rango en X: -5 a 5
     Yinicial,
     Math.random() * 1-0.5  // Rango en Z: -5 a 5
   );

   scene.add(sphere);
   spheres.push({ mesh: sphere, velocity: new THREE.Vector3(0, 0, 0) });
 }

 // Posición en Y para reiniciar
 const resetY = 1;

 // Actualizar física y reiniciar
 function updatePhysics(sphere) {
   sphere.velocity.add(gravity);
   sphere.mesh.position.add(sphere.velocity);

   if (sphere.mesh.position.y < resetY) {
     // Reiniciar la posición
     sphere.mesh.position.set(
       Math.random() * 2-1.1, // Rango en X: -5 a 5
       Yinicial,
       Math.random() * 1-0.5 // Rango en Z: -5 a 5
     );
     sphere.velocity.set(0, 0, 0); // Reiniciar la velocidad
   }
 }

 const speed = 0.1;
 const xLimit = 0.9;
 const zLimit = 0.4;

 const handleKeyDown = (event) => {
   switch (event.key) {
     case 'ArrowLeft':
       cube5.position.x = Math.max(cube5.position.x - speed, -xLimit);
       break;
     case 'ArrowRight':
       cube5.position.x = Math.min(cube5.position.x + speed, xLimit);
       break;
     case 'ArrowUp':
       cube5.position.z = Math.max(cube5.position.z - speed, -zLimit);
       break;
     case 'ArrowDown':
       cube5.position.z = Math.min(cube5.position.z + speed, zLimit);
       break;
   }
 };

 document.addEventListener('keydown', handleKeyDown);


function animate() {
	requestAnimationFrame( animate );
	cube.position.z = 0;

    t +=0.5;

    for (const sphere of spheres) {
      updatePhysics(sphere);
    }

    cube5.position.y = 1;


torus11.rotation.set (1.55,0,0)

torus11.position.set (0,10/4,0)

cylinderp.position.set (6.7/20,2.3,0)

cylinderp2.position.set (0.5/20,2.3,6.5/20)


futbol.position.set (0.5/20,2,-6.5/20)

basquet.position.set (0.5/20,2,6.5/20)


futbol.position.z = -0.325*Math.cos(t*0.051);
futbol.position.x = -0.325*Math.sin(t*0.051);
futbol.rotation.y += 0.04;

cylinderp.position.z = -0.325*Math.cos(t*0.051);
cylinderp.position.x = -0.325*Math.sin(t*0.051);
cylinderp.rotation.y += 0.04;

basquet.position.z = 0.325*Math.cos(t*0.051);
basquet.position.x = 0.325*Math.sin(t*0.051);
basquet.rotation.y += 0.04;

cylinderp2.position.z = 0.325*Math.cos(t*0.051);
cylinderp2.position.x = 0.325*Math.sin(t*0.051);
cylinderp2.rotation.y += 0.04;

tenis.position.set (0,2.4,0)
tenis.rotation.y += 0.1;



const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {

		intersects[ i ].object.material.color.set( 0xff0000 );

	}

	effect.render( scene, camera );
}

animate();