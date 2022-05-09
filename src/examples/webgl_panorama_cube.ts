import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Texture,
  MeshBasicMaterial,
  Mesh,
  BoxBufferGeometry,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// https://threejs.org/examples/#webgl_panorama_cube
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_panorama_cube.html

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let controls: OrbitControls;

init();
animate();

function init() {
  const container = document.getElementById("container");

  renderer = new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container?.appendChild(renderer.domElement);

  scene = new Scene();

  camera = new PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 0.01;

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.rotateSpeed = -0.25;

  var textures = getTexturesFromAtlasFile("images/sun_temple_stripe.jpg", 6);

  var materials = [];

  for (let i = 0; i < 6; i++) {
    materials.push(new MeshBasicMaterial({ map: textures[i] }));
  }

  var skyBox = new Mesh(new BoxBufferGeometry(1, 1, 1), materials);
  skyBox.geometry.scale(1, 1, -1);
  scene.add(skyBox);

  window.addEventListener("resize", onWindowResize, false);
}

function getTexturesFromAtlasFile(atlasImgUrl: string, tilesNum: number) {
  var textures: any[] = [];

  for (let i = 0; i < tilesNum; i++) {
    textures[i] = new Texture();
  }

  var imageObj = new Image();
  imageObj.onload = function () {
    var canvas;
    var context;
    var tileWidth = imageObj.height;

    for (let i = 0; i < textures.length; i++) {
      canvas = document.createElement("canvas");
      context = canvas.getContext("2d");
      canvas.width = tileWidth;
      canvas.height = tileWidth;
      context?.drawImage(
        imageObj,
        tileWidth * i,
        0,
        tileWidth,
        tileWidth,
        0,
        0,
        tileWidth,
        tileWidth
      );
      textures[i].image = canvas;
      textures[i].needsUpdate = true;
    }
  };

  imageObj.src = atlasImgUrl;

  return textures;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}
