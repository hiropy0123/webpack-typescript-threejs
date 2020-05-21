import { 
  WebGLRenderer, 
  PerspectiveCamera, 
  Scene, 
  DirectionalLight, 
  BoxGeometry, 
  MeshLambertMaterial,
  Mesh,
} from 'three';

// variables
let renderer: WebGLRenderer;
let camera: PerspectiveCamera;
let scene: Scene;
let cube: Mesh;

init();
animate();

function init() {
  // シーンの作成
  scene = new Scene();

  // カメラの作成
  camera = new PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 400);
  camera.lookAt(0, 0, 0);

  // レンダラーの作成
  renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  const container = document.getElementById("container");
  // #container の中に配置
  container?.appendChild(renderer.domElement);


  // ライトの作成
  const light = new DirectionalLight(0xffffff, 0.8);
  light.position.set(0, 100, 500);
  // シーンにライトを追加
  scene.add( light );

  // キューブの作成
  const geometry = new BoxGeometry(100, 100, 100);
  const material = new MeshLambertMaterial({ color: 0xffee00 });
  cube = new Mesh(geometry, material);
  // シーンにキューブを追加
  scene.add( cube );

  // window resize
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // レンダリング実行
  renderer.render(scene, camera);
}