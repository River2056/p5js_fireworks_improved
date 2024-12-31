class Firework {
  constructor(x = null, y = null, fontSize = null, extras = [], screenType = ScreenType.MOBILE) {
    this.hu = random(255);

    if (x != null && y != null) {
      this.firework = new Particle(x, height, this.hu, 0, screenType);
    } else {
      this.firework = new Particle(random(width), height, this.hu, 0, screenType);
    }
    this.exploded = false;
    this.particles = [];

    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.extras = extras;
    this.extrasDisplay = [];
  }

  done() {
    return this.exploded && this.particles.length === 0;
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done())
        this.particles.splice(i, 1);
    }

    for (let i = this.extrasDisplay.length - 1; i >= 0; i--) {
      /* this.extrasDisplay[i].applyForce(createVector(0, 0.0001));
      this.extrasDisplay[i].update(); */
      if (this.extrasDisplay[i].done())
        this.extrasDisplay.splice(i, 1);
    }
  }

  explode() {
    for (let i = 0; i < 100; i++) {
      this.particles.push(new Particle(this.firework.pos.x, this.firework.pos.y, this.hu,
        1));
    }

    if (this.extras && this.extras.length > 0) {
      for (let i = 0; i < this.extras.length; i++) {
        for (let j = 0; j < this.extras[i].length; j++) {
          if (this.extras[i][j] !== 0)
            this.extrasDisplay.push(new Particle(this.x + (j * this.fontSize), this.y + (i * this.fontSize), this.hu, 2));
        }
      }
    }
  }

  show() {
    if (!this.exploded)
      this.firework.show();

    this.particles.forEach(p => p.show())
    this.extrasDisplay.forEach(e => e.show())
  }
}
