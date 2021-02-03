if (!Detector.webgl) Detector.addGetWebGLMessage();

var container;
var camera, scene, renderer;
var mesh, geometry, material;

var mouseX = 0,
  mouseY = 0;
var start_time = Date.now();

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

setTimeout(function () {
  init();
}, 100);

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  // Bg gradient

  //   let canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //   let context = canvas.getContext("2d");

  let gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#1750AC");
  gradient.addColorStop(0.8, "#5494DA");

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  container.style.background = "url(" + canvas.toDataURL("image/png") + ")";
  container.style.backgroundSize = "32px 100%";

  //

  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    3000
  );
  camera.position.z = 6000;
  camera.position.y = -50;

  scene = new THREE.Scene();

  geometry = new THREE.Geometry();

  var texture = THREE.ImageUtils.loadTexture(
    "Images/cloud10.png",
    null,
    animate
  );
  texture.magFilter = THREE.LinearMipMapLinearFilter;
  texture.minFilter = THREE.LinearMipMapLinearFilter;

  var fog = new THREE.Fog(0x4584b4, -500, 2000);

  material = new THREE.ShaderMaterial({
    uniforms: {
      map: { type: "t", value: texture },
      fogColor: { type: "c", value: fog.color },
      fogNear: { type: "f", value: fog.near },
      fogFar: { type: "f", value: fog.far },
    },
    vertexShader: document.getElementById("vs").textContent,
    fragmentShader: document.getElementById("fs").textContent,
    depthWrite: false,
    depthTest: false,
    transparent: true,
  });

  var plane = new THREE.Mesh(new THREE.PlaneGeometry(50, 64));

  for (var i = 0; i < 200; i++) {
    plane.position.x = Math.random() * 1000 - 500;
    plane.position.y = -Math.random() * Math.random() * 200 - 15;
    plane.position.z = i;
    plane.rotation.z = Math.random() * Math.PI;
    plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

    THREE.GeometryUtils.merge(geometry, plane);
  }

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -200;
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setClearColor( 0x000000, 0 );
  container.appendChild(renderer.domElement);

  document.addEventListener("mousemove", onDocumentMouseMove, false);
  window.addEventListener("resize", onWindowResize, false);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * 0.25;
  mouseY = (event.clientY - windowHalfY) * 0.15;
}

function onWindowResize(event) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  position = ((Date.now() - start_time) * 0.03) % 8000;

  camera.position.x += (mouseX - camera.position.x) * 0.001;
  camera.position.y += (-mouseY - camera.position.y) * 0.001;
  camera.position.z = (-position + 10) * 0.01;

  renderer.render(scene, camera);
}
