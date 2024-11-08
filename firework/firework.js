// JavaScript for Fireworks Animation
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let particles = [];

class Firework {
  constructor(x, y, targetX, targetY, color) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.color = color;
    this.trail = [];
    this.exploded = false;
  }

  update() {
    if (!this.exploded) {
      this.x += (this.targetX - this.x) * 0.05;
      this.y += (this.targetY - this.y) * 0.05;
      this.trail.push({ x: this.x, y: this.y });

      if (Math.abs(this.x - this.targetX) < 5 && Math.abs(this.y - this.targetY) < 5) {
        this.exploded = true;
        for (let i = 0; i < 100; i++) {
          particles.push(new Particle(this.x, this.y, this.color));
        }
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.trail[0].x, this.trail[0].y);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = Math.random() * 3 + 1;
    this.alpha = 1;
    this.velocity = {
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 6
    };
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.02;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.exploded) fireworks.splice(index, 1);
  });

  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.alpha <= 0) particles.splice(index, 1);
  });

  requestAnimationFrame(animate);
}

function launchFirework() {
  fireworks.push(new Firework(
    canvas.width / 2, 
    canvas.height, 
    Math.random() * canvas.width, 
    Math.random() * canvas.height / 2, 
    `hsl(${Math.random() * 360}, 100%, 50%)`
  ));
}

// Remove this line to stop the slider from auto-moving
// setInterval(moveSlider, 3000);

// Manually controlling the slider with next/previous buttons
let currentIndex = 0;
const slides = document.querySelectorAll('.product');
const totalSlides = slides.length;

function moveSlider() {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  document.querySelector('.product-list').style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Start fireworks animation
setInterval(launchFirework, 1000);
animate();
