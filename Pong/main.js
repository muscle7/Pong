// Pong

// Setup the Canvas and the Graphics Content
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let player = {
    x: 50,
    y: 50,
    w: 20,
    h: 100,
    xSpeed: 0,
    ySpeed: 0,
    Speed: 5
}

let ai = {
    x: 730,
    y: 50,
    w: 20,
    h: 100,
    xAi: 0,
    yAi: 0,
    Ai: 5
}

let xBallChange = 3;
let yBallChange = 3;
let xBall = Math.floor(Math.random() * 300) + 50;
let yBall = 300;
let diameter = 13;

// Main Program Loop
requestAnimationFrame(draw);

function draw() {
    // Logic

    // Move player by xSpeed and ySpeed
    player.x += player.xSpeed;
    player.y += player.ySpeed;
    ai.x += ai.xAi;
    ai.y += ai.yAi;

    // Drawing
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    // Draw player
    // DRAW PADDLES
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.w, player.h);

    ctx.fillStyle = "white";
    ctx.fillRect(ai.x, ai.y, ai.w, ai.h);

    // ANIMATE BALL
    if (xBall < diameter / 2 ||
        xBall > 800 - 0.5 * diameter) {
        xBallChange *= -1;
    }
    if (yBall < diameter / 2 ||
        yBall > 600 - diameter) {
        yBallChange *= -1;
    }

    if ((xBall > player.x &&
        xBall < player.x + player.w) &&
        (yBall + (diameter / 2) >= player.y)) {
        xBallChange *= -1;
        yBallChange *= -1;
    }

    if ((xBall > ai.x &&
        xBall < ai.x + ai.w) &&
        (yBall + (diameter / 2) >= ai.y)) {
        xBallChange *= -1;
        yBallChange *= -1;
    }

    xBall += xBallChange;
    yBall += yBallChange;

    // DRAW BALL
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(xBall, yBall, diameter, 0, 2 * Math.PI);
    ctx.fill();

    // Request Another Animation Frame
    requestAnimationFrame(draw);
}

// Key Event Stuff

document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
    // Key Pressed - Key Released Movement
    if (!event.repeat) {
        if (event.code == "ArrowUp") {
            player.ySpeed = -player.Speed;
        } else if (event.code == "ArrowDown") {
            player.ySpeed = player.Speed;
        } else if (event.code == "ArrowRight") {
            ai.yAi = -ai.Ai;
        } else if (event.code == "ArrowLeft") {
            ai.yAi = ai.Ai;
        }
    }
}

function keyupHandler(event) {
    // Key Pressed - Key Released Movement
    if (event.code == "ArrowUp" && player.ySpeed < 0) {
        player.ySpeed = 0;
    } else if (event.code == "ArrowDown" && player.ySpeed > 0) {
        player.ySpeed = 0;
    } else if (event.code == "ArrowLeft" && ai.yAi > 0) {
        ai.yAi = 0;
    } else if (event.code == "ArrowRight" && ai.yAi < 0)
        ai.yAi = 0;
}
