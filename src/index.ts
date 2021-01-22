import {
  Clock,
  OrthographicCamera,
  Scene,
  PlaneBufferGeometry,
  Vector2,
  ShaderMaterial,
  Mesh,
  WebGLRenderer,
} from "three";
import { IUniform } from "three/src/renderers/shaders/UniformsLib";

const glsl = (x: any) => x[0].trim();

const vert = glsl`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4( position, 1.0 );
}
`;

const frag = glsl`
precision highp float;
uniform float time;
uniform vec2 resolution;
varying vec2 vUv;
void main() {
  float vmin = min(resolution.y, resolution.x);
  vec2 p = vUv * 1.0 - 0.5;
  float r = 0.5 + 0.5 * (sin(5.0 * p.x + time));
  float g = 0.5 + 0.5 * (sin(5.0 * p.y) + sin(time + 2.0 * p.x));
  float b = 0.5 + 0.5 * (sin(0.2 + p.x * p.y * 17.0) + sin(time * 0.4 + 4.0 * p.y));
  gl_FragColor = vec4(r, g, b, 1.0);
}
`;

let camera: OrthographicCamera,
  scene: Scene,
  renderer: WebGLRenderer,
  uniforms: { [uniform: string]: IUniform },
  clock: Clock;

init();
animate();

function init() {
  clock = new Clock();
  camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  scene = new Scene();

  const geometry = new PlaneBufferGeometry(2, 2);

  uniforms = {
    time: { value: 1.0 },
    resolution: { value: new Vector2() },
  };

  const material = new ShaderMaterial({
    uniforms,
    vertexShader: vert,
    fragmentShader: frag,
  });

  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  renderer = new WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  onResize();
  window.addEventListener("resize", onResize, false);
}

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.resolution.value.x = renderer.domElement.width;
  uniforms.resolution.value.y = renderer.domElement.height;
}

function animate() {
  requestAnimationFrame(animate);
  uniforms.time.value = clock.getElapsedTime();
  renderer.render(scene, camera);
}
