/* eslint-disable max-classes-per-file */
/* eslint-disable no-alert */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const paddleHeight = 10*2;
const paddleWidth = 75*2;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 75*2;
const brickHeight = 20*2;
const brickPadding = 10*2;
const brickOffsetTop = 30*2;
const brickOffsetLeft = 30*2;

class Ball {
  constructor(radius, color = '#0095DD') {
    this.radius = radius;
    this.color = color;
    this.x = canvas.width / 2;
    this.y = canvas.height - 100;
    this.dx = 5;
    this.dy = -5;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

const ball = new Ball(20);

class Brick {

}

class Paddle {
  constructor(color = '#FFFFFF') {
    this.fillStyle = color;
  }

  render() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = this.fillStyle;
    ctx.fill();
    ctx.closePath();
  }
}

const paddle = new Paddle();

class Score {
  constructor(score = 0, font = '16px Arial', color = '#FFFFFF') {
    this.score = score;
    this.font = font;
    this.color = color;
  }

  render() {
    ctx.font = '16px Arial';
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.score}`, 8, 20);
  }
}

const score = new Score();

class Lives {
  constructor(lives = 3, font = '16px Arial', color = '#FFFFFF') {
    this.lives = lives;
    this.font = font;
    this.color = color;
  }

  render() {
    ctx.font = '16px Arial';
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, canvas.width - 65, 20);
  }
}

const lives = new Lives();

const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    const brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
    const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
    bricks[c][r] = { x: brickX, y: brickY, status: 1 };
    // new Brick()
  }
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const brick = bricks[c][r];
      if (brick.status === 1) {
        if (ball.x > brick.x && ball.x < brick.x + brickWidth && ball.y > brick.y && ball.y < brick.y + brickHeight + 20) {
          ball.dy = -ball.dy;
          brick.status = 0;
          score.score += 1;
          if (score.score === brickRowCount * brickColumnCount) {
            alert('YOU WIN, CONGRATS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brick = bricks[c][r]
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brickWidth, brickHeight);

        if (c === 0) {
          ctx.fillStyle = '#1DFF00';
        } else if (c === 1) {
          ctx.fillStyle = '#6DFF5A';
        } else {
          ctx.fillStyle = '#ABFFA0';
        }

        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.move();
  ball.render(ctx);
  score.render(ctx);
  lives.render(ctx);
  drawBricks();
  paddle.render(ctx);
  collisionDetection();

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
      ball.dy = -ball.dy;
    } else {
      lives.lives -= 1;
      if (!lives.lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 80;
        ball.dx = 5;
        ball.dy = -5;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;
  requestAnimationFrame(draw);
}

draw();
