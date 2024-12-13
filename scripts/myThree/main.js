// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
// import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/OBJLoader.js';

// Your Three.js setup and OBJLoader usage go here

import * as THREE from '../three.js-master/build/three.module.js';
import { OBJLoader } from '../three.js-master/examples/jsm/loaders/OBJLoader.js';

// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load texture
const textureLoader = new THREE.TextureLoader();
let texture = null;
textureLoader.load(
  'textures/wackofeest.jpg',
  function (loadedTexture) {
    texture = loadedTexture;  // Store the loaded texture
  },
  undefined,
  function (err) {
    console.error('An error has happened :<(');
  }
);

// Load OBJ models
const loader = new OBJLoader();
let objModel = null;
let wackoModel = null;

loader.load('public/sceneC.obj', function (OBJ) {
  OBJ.position.set(0, -35, -100); // Set the position to (x, y, z)

  // Apply a basic material to the sceneC object
  OBJ.traverse(function (child) {
    if (child.isMesh) {
      child.material = new THREE.MeshPhongMaterial({
        color: 0xfd0096,    // Green color
        shininess: 100,     // Adjust shininess for specular highlights
        flatShading: true   // Use flat shading for a more angular look
      }); // Green color
      child.material.needsUpdate = true;  // Update material to reflect changes
    }
  });

  objModel = OBJ;
  scene.add(OBJ);

}, undefined, function (error) {
  console.error(error);
});

loader.load('public/wackoFeest.obj', function (OBJ) {
  // Apply texture once it's loaded
  OBJ.traverse(function (child) {
    if (child.isMesh && texture) {
      child.material = new THREE.MeshBasicMaterial({
        map: texture
      });
      child.material.needsUpdate = true;  // Update material to reflect the texture
    }
  });

  OBJ.position.set(0, -10, -100); // Set the position to (x, y, z)
  OBJ.scale.set(10, 10, 10);
  scene.add(OBJ);

  wackoModel = OBJ;
}, undefined, function (error) {
  console.error(error);
});

// Add lighting
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (objModel) {
    objModel.rotation.y += 0.01; // Rotate around the Y-axis
  }
  if (wackoModel) {
    wackoModel.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}
animate();
