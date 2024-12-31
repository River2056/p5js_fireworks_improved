class Particle {
  constructor(x, y, hu, firework, screenType = ScreenType.MOBILE) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu
    this.acc = createVector(0, 0);

    if (this.firework === 0) {
      if (screenType === ScreenType.MOBILE)
        this.vel = createVector(0, random(-20, -9));
      else
        this.vel = createVector(0, random(-12, 8));
    } else if (this.firework === 1) {
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(5, 30));
    } else {
      this.vel = createVector(0, y);
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (this.firework === 1) {
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  done() {
    return this.lifespan < 0;
  }

  show() {
    colorMode(HSB);
    if (this.firework === 1) {
      strokeWeight(2);
      stroke(this.hu, 255, 255, this.lifespan);
      point(this.pos.x, this.pos.y);
    } else if (this.firework === 2) {
      strokeWeight(4);
      stroke(0, 0, 100);
      ellipse(this.pos.x, this.pos.y, 5, 5)
    } else {
      strokeWeight(4);
      stroke(this.hu, 255, 255);
      point(this.pos.x, this.pos.y);
    }
    point(this.pos.x, this.pos.y);
  }
}
