import { OrthographicCamera, Scene, WebGLRenderer, PlaneBufferGeometry, ShaderMaterial, Mesh } from 'three';
import vertexShader from './shaders/vertexShader.vert';
import fragmentShader from './shaders/fragmentShader.frag';

let container: HTMLElement | null;
let camera: OrthographicCamera;
let scene: Scene;
let renderer: WebGLRenderer;
let uniforms: { time: { value: number } };

init();
animate();

function init() {
  container = document.getElementById('container');

  camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

  scene = new Scene();

  const geometry = new PlaneBufferGeometry(2, 2);

  uniforms = {
    time: { value: 1.0 }
  };

  const material = new ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  });

  const mesh = new Mesh(geometry, material);
  scene.add(mesh);


  renderer = new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  container?.appendChild(renderer.domElement);

  onWindowResize();

  window.addEventListener('resize', onWindowResize, false);
  renderer.render(scene, camera);
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  const time = new Date();
  const timestamp = time.getSeconds() + time.getMilliseconds() / 1000;
  const value = timestamp;

  uniforms.time.value = value;
  console.log(value);

  renderer.render(scene, camera);
}
