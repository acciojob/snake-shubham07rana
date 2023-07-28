//your code here
const gameContainer = document.getElementById('gameContainer');
const scoreBoard = document.createElement('div');
scoreBoard.className = 'scoreBoard';
scoreBoard.innerText = 'Score: 0';
gameContainer.appendChild(scoreBoard);

const gridSize = 40;
const snake = [{ x: 20, y: 1 }];
let food = { x: 0, y: 0 };
let direction = 'right';
let score = 0;

function createPixel(x, y, className) {
    const pixel = document.createElement('div');
    pixel.id = `pixel${x}-${y}`;
    pixel.className = className;
    gameContainer.appendChild(pixel);
}

function placeFood() {
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);
    food = { x, y };
    createPixel(x, y, 'food');
}

function updateSnake() {
    const head = { ...snake[0] };

    if (direction === 'right') head.x++;
    else if (direction === 'left') head.x--;
    else if (direction === 'up') head.y--;
    else if (direction === 'down') head.y++;

    snake.unshift(head);

    const isFoodEaten = head.x === food.x && head.y === food.y;
    if (isFoodEaten) {
        placeFood();
        score += 10;
        scoreBoard.innerText = `Score: ${score}`;
    } else {
        const tail = snake.pop();
        document.getElementById(`pixel${tail.x}-${tail.y}`).remove();
    }

    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        clearInterval(gameLoop);
        alert('Game Over!');
    }

    for (const segment of snake) {
        createPixel(segment.x, segment.y, 'snakeBodyPixel');
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'ArrowUp' && direction !== 'down') direction = 'up';
    else if (key === 'ArrowDown' && direction !== 'up') direction = 'down';
    else if (key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    else if (key === 'ArrowRight' && direction !== 'left') direction = 'right';
});

placeFood();
const gameLoop = setInterval(updateSnake, 100);
