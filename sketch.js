let width;
let height;
let fireworks = [];
let gravity;
let fontSize;
let textPos;
let txt;
let fireworkTextSize;
let fireworkTextPos;
let count;
let screenType;

function setup() {
  width = windowWidth;
  height = windowHeight;
  console.log("width: ", width);
  console.log("height: ", height);
  screenType = width > height ? ScreenType.DESKTOP : ScreenType.MOBILE;
  const date = new Date();
  const year = date.getFullYear();
  txt = `HAPPY NEW YEAR ${year}!!!`;
  fontSize = screenType === ScreenType.MOBILE ? 55 : 34;
  textPos = { x: width / 2, y: 205 };
  fireworkTextSize = 80
  fireworkTextPos = { x: 30, y: 305 };
  count = 0;
  gravity = createVector(0, 0.1);
  createCanvas(width, height);
  colorMode(HSB);
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw() {
  colorMode(RGB);
  background(0, 25);
  if (random(1) < 0.1) {
    fireworks.push(new Firework(null, null, null, [], screenType));
  }

  if (extras.length > 0) {
    if (frameCount % 60 === 0) {
      count++;
      let c = count % extras.length;
      fireworks.push(new Firework(fireworkTextPos.x + (c * (3 * fireworkTextSize)), fireworkTextPos.y, fireworkTextSize, extras[c], screenType));
    }
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }

  text(txt, textPos.x, textPos.y);
  textAlign(CENTER);
  fill(255, 25);
  textSize(fontSize);
}
