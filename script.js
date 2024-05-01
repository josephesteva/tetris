// GAME STATE
let colors = ['red', 'blue', 'green', 'cyan', 'yellow', 'orange', 'purple']
let shapes = [
	[
		[1, 1],
		[1, 1]
	],
	[
		[1],
		[1],
		[1],
		[1]
	],
	[
		[1, 0],
		[1, 0],
		[1, 1]
	],
	[
		[0, 1],
		[0, 1],
		[1, 1]
	],
	[
		[1, 1, 0],
		[0, 1, 1]
	],
	[
		[0, 1, 1],
		[1, 1, 0]
	],
	[
		[0, 1, 0],
		[1, 1, 1]
	],
]

let game = {
	playing: false,
	timer: 0,
	speed: 500,
	intervalId: setInterval(runGame, 500),
	score: 0,
	level: 1,
	currentPiece: shapes[0],
	currentColor: 'red',
	positionY: -2,
	positionX: 4
}

let initialGameState = { ...game }

// DOM elements
let playBTN = document.getElementById('play')
let resetBTN = document.getElementById('reset')
let table = document.getElementById('table')
let score = document.getElementById('score')
let level = document.getElementById('level')

// Game Board
for (let i = 0; i < 24; i++) {
	createRow();
}

// Event Listeners
playBTN.addEventListener('click', () => {
	game.playing = !game.playing;
	game.playing ? playBTN.innerText = 'Pause' : playBTN.innerText = 'Play';
	(playBTN).blur();
})

resetBTN.addEventListener('click', () => {
	clearInterval(game.intervalId);
	game = {
		...initialGameState,
		intervalId: setInterval(runGame, 500)
	}
	console.log(game.playing);
	for (let i = 0; i < 24; i++) {
		table.children[i].remove();
		createRow();
	}
	playBTN.innerText = 'Start'
	score.innerText = 0;
	level.innerText = 1;
	(resetBTN).blur()
})

window.addEventListener('keydown', (event) => {
	if (event.key === 'p') {
		game.playing = !game.playing
		game.playing ? playBTN.innerText = 'Pause' : playBTN.innerText = 'Play';
	}

	if (!game.playing) {
		return;
	}

	if (event.key === 'ArrowLeft'
		&& game.positionX > 0
		&& !checkLeft()) {
		removePiece();
		game.positionX--;
		drawPiece();
	}

	if (event.key === 'ArrowRight'
		&& game.positionX < (10 - game.currentPiece[0].length)
		&& !checkRight()
	) {
		removePiece();
		game.positionX++;
		drawPiece();
	}

	if (event.key === 'ArrowDown') {
		removePiece();
		useGravity();
		drawPiece();
	}

	if (event.key === 'ArrowUp') {
		removePiece()
		rotate()
		drawPiece()
	}

	if (event.key === ' ') {
		let atBottom = checkBottom()
		removePiece()
		while (!atBottom) {
			useGravity()
			atBottom = checkBottom()
		}
		drawPiece()
	}
})

// Game functions
const drawPiece = () => {
	let piece = game.currentPiece;
	for (i = 0; i < piece.length; i++) {
		for (j = 0; j < piece[i].length; j++) {
			if (piece[i][j] === 0) { continue }
			let boardRow = i + game.positionY;
			let boardCol = j + game.positionX;
			if (boardRow >= 0) {
				let pixel = table.children[boardRow].children[boardCol]
				pixel.classList.add(game.currentColor)
			}
		}
	}
	let atBottom = checkBottom()
	let atTop = checkTop()
	if (atBottom && atTop) {
		game.playing = false;
		alert('GAME OVER')
	} else if (atBottom) {
		checkLineClear()
		selectNewPiece()
	}
}

function useGravity() {
	game.positionY++;
}

function removePiece() {
	let piece = game.currentPiece;
	for (i = 0; i < piece.length; i++) {
		for (j = 0; j < piece[i].length; j++) {
			let boardRow = i + game.positionY;
			let boardCol = j + game.positionX;
			if (boardRow >= 0) {
				let pixel = table.children[boardRow].children[boardCol]
				pixel.classList.remove(game.currentColor)
			}
		}
	}
}

function checkBottom() {
	let piece = game.currentPiece;
	let tableBottom = table.children.length - 1;
	let pieceBottom = piece.length - 1 + game.positionY;

	// hitting board bottom
	if (pieceBottom === tableBottom) {
		return true;
	}

	// hitting top of another piece
	for (i = 0; i < piece.length; i++) {
		for (j = 0; j < piece[i].length; j++) {
			if (piece[i][j] && !piece[i + 1]?.[j]) {
				let y = game.positionY + i + 1;
				let x = game.positionX + j;
				if (table.children[y].children[x].classList.length)
					return true
			}
		}
	}
	return false;
}

function checkRight() {
	for (i = 0; i < game.currentPiece.length; i++) {
		if (table.children[game.positionY + i].children[game.positionX + game.currentPiece[0].length].classList.length) {
			return true
		}
	}
	return false
}

function checkLeft() {
	for (i = 0; i < game.currentPiece.length; i++) {
		if (table.children[game.positionY + i].children[game.positionX - 1].classList.length) {
			return true
		}
	}
	return false
}

function checkTop() {
	if (game.positionY <= 0) {
		return true
	}
	return false
}

function checkLineClear() {
	for (i = 0; i < game.currentPiece.length; i++) {
		for (j = 0; j < 10; j++) {
			let square = table.children[game.positionY + i].children[j]
			if (!square.classList.length) {
				break
			} else if (j === 9 && square.classList.length) {
				table.children[game.positionY + i].remove();
				increaseScore()
				createRow()
			}
		}
	}
}

function createRow() {
	let newRow = document.createElement('tr')
	for (l = 0; l < 10; l++) {
		let cell = document.createElement('td');
		newRow.appendChild(cell);
	}
	table.prepend(newRow)
}

function selectNewPiece() {
	let randomNumberShapes = Math.floor(Math.random() * shapes.length)
	game.currentPiece = shapes[randomNumberShapes]
	game.currentColor = colors[randomNumberShapes]
	game.positionY = 0 - game.currentPiece.length;
	let pieceWidth = game.currentPiece[0].length;
	if (game.positionX + pieceWidth > 10) {
		game.positionX = 10 - pieceWidth
	}
}

function rotate() {
	let piece = game.currentPiece;
	let newPiece = [];
	for (i = 0; i < piece[0].length; i++) {
		let newRow = [];
		for (j = 0; j < piece.length; j++) {
			newRow.unshift(piece[j][i])
		}
		newPiece.push(newRow)
	}
	let oldX = game.positionX
	let oldPiece = game.currentPiece
	game.currentPiece = newPiece
	for (i = 0; i < game.currentPiece[0].length; i++) {
		if (table.children[game.positionY].children[game.positionX + i].classList.length) {
			game.positionX--
		}
		if (game.positionX + game.currentPiece[0].length > 9) {
			game.positionX = 10 - game.currentPiece[0].length
		}
	}
	if (game.positionX < 0 ||
		table.children[game.positionY].children[game.positionX].classList.length) {
		game.currentPiece = oldPiece;
		game.positionX = oldX;
	}
}

function increaseScore() {
	game.score++
	score.innerText = game.score
	setLevel()
}

function setLevel() {
	let newLevel = Math.floor((game.score / 5) + 1)
	if (newLevel !== game.level) {
		game.level = newLevel
		level.innerText = game.level
		adjustSpeed()
	}
}

function adjustSpeed() {
	game.speed = (500 * (0.91 ** (game.level - 1)))
	console.log(game.speed);
	clearInterval(game.intervalId)
	game.intervalId = setInterval(runGame, game.speed)
}

// Time
function advanceTime() {
	game.timer++;
}

function runGame() {
	if (!game.playing) return;
	removePiece()
	useGravity()
	drawPiece()
	advanceTime()
}
