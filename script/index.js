import * as THREE from '../node_modules/three/build/three.module.js';

let container;
let camera;
let renderer;
let scene;
let mesh;

const init = () =>  {
  
  // Get a reference to the container element that will hold our scene
  container = document.querySelector( '#scene-container' );

  // create a Scene
  scene = new THREE.Scene();

  scene.background = new THREE.Color( 0x8FBCD4 );

  // set up the options for a perspective camera
  const fov = 35; // fov = Field Of View
  const aspect = container.clientWidth / container.clientHeight;

  const near = 0.1;
  const far = 100;

  camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

  // every object is initially created at ( 0, 0, 0 )
  // we'll move the camera back a bit so that we can view the scene
  camera.position.set( 0, 0, 10 );

  // create a geometry
  const geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );

  // create a texture loader.
  const textureLoader = new THREE.TextureLoader();

  // Load a texture. See the note in chapter 4 on working locally, or the page
  // https://threejs.org/docs/#manual/introduction/How-to-run-things-locally
  // if you run into problems here
  const texture = textureLoader.load( 'textures/uv_test_bw.png' );

  // set the "color space" of the texture
  texture.encoding = THREE.sRGBEncoding;

  // reduce blurring at glancing angles
  texture.anisotropy = 16;

  // create a Standard material using the texture we just loaded as a color map
  const material = new THREE.MeshStandardMaterial( {
  map: texture,
  } );

  // create a Mesh containing the geometry and material
  mesh = new THREE.Mesh( geometry, material );

  // add the mesh to the scene object
  scene.add( mesh );

  // Create a directional light
  const light = new THREE.DirectionalLight( 0xffffff, 3.0 );

  // move the light back and up a bit
  light.position.set( 10, 10, 10 );

  // remember to add the light to the scene
  scene.add( light );

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer({ antialias: true} );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  // set the gamma correction so that output colors look
  // correct on our screens
  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  // add the automatically created <canvas> element to the page
  container.appendChild( renderer.domElement );

  // start the animation loop
  renderer.setAnimationLoop( () => {

    update();
    render();

  } );


}

function update() {

  // increase the mesh's rotation each frame
  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  
}

function render() {

  renderer.render( scene, camera );

}

  // render, or 'draw a still image', of the scene
function onWindowResize() {

  // set the aspect ratio to match the new browser window aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer AND the canvas
  renderer.setSize( container.clientWidth, container.clientHeight );
  
}
  
  window.addEventListener( 'resize', onWindowResize );


init();