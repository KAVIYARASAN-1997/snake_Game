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
	if (snake[0].x < 0 || snake[0].x > 19 * box || snake[0].y < 0 ||
