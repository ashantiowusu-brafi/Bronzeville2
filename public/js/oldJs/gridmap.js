//randomize videos
let video = document.getElementById("video");
let source = document.createElement("source");
let count = 0;

let sources = [
  "Assets/Black Excellence Elder_History.mp4",
  "Assets/Bud Bilken Parade_History.mp4",
  "Assets/Mandrake Park2_Place.mp4",
  "Assets/Sip Savor2_Place.mp4",
  "Assets/Uncle Js_Smells.mp4",
];

window.addEventListener("load", () => {
  let randomNumber = Math.floor(Math.random() * sources.length);

  source.setAttribute("src", sources[randomNumber]);
  console.log(randomNumber);

  video.appendChild(source);
});

let reloadButton = document.getElementById("random-button");
reloadButton.addEventListener("click", () => {
  //   for (let i = 0; i < sources.length; i++) {
  //     source.setAttribute("src", sources[i]);
  //   }

  window.location.reload();
});
//adapted from https://www.openprocessing.org/sketch/943740

let img;
let sh, gl;
let cnv;

function preload() {
  img = loadImage("Images/backgroundmap.jpg");
  sh = loadShader("shaders/grid.vert", "shaders/grid.frag");
}

function setup() {
  // image(img, 0, 0);
  pixelDensity(1);
  cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.parent("canvas");
  //   gl = this.canvas.getContext("webgl");
  //   gl.disable(gl.DEPTH_TEST);
  img.resize(windowWidth, windowHeight);
}

function draw() {
  shader(sh);
  sh.setUniform("iResolution", [width, height]); //pass some values to the shader
  sh.setUniform("iMouse", [mouseX, mouseY]);
  sh.setUniform("iImg", img);
  rect(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
