const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [{ x: 9 * box, y: 10 * box }];
let food = { x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box };
let score = 0;
let direction;
let game;

function drawSnake() {
    ctx.fillStyle = "#4CAF50";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

function drawScore() {
    document.getElementById("score").innerHTML = score;
}

function moveSnake() {
    let head = { x: snake[0].x, y: snake[0].y };
    if (direction === "LEFT") head.x -= box;
    if (direction === "UP") head.y -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "DOWN") head.y += box;
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box };
    } else {
        snake.pop();
    }
    snake.unshift(head);
}

function checkCollision() {
    if (snake[0].x < 0 || snake[0].x > 19 * box || snake[0].y < 0 || snake[0].y > 19 * box) {
        clearInterval(game);
        document.getElementById("final-score").innerHTML = score;
        document.getElementById("game-over-container").style.display = "block";
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            clearInterval(game);
            document.getElementById("final-score").innerHTML = score;
            document.getElementById("game-over-container").style.display = "block";
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    drawScore();
    moveSnake();
    checkCollision();
}

function startGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    food = { x: Math.floor(Math.random() * 19 + 1) * box, y: Math.floor(Math.random() * 19 + 1) * box };
    score = 0;
    direction = "";
    document.getElementById("game-over-container").style.display = "none";
    game = setInterval(gameLoop, 100);
}

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.code === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.code === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.code === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

document.getElementById("restart-button").addEventListener("click", startGame);

startGame();
