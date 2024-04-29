// GAME STATE
let colors = ['red', 'blue', 'green', 'yellow', 'purple']
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
	currentPiece: shapes[Math.floor(Math.random() * 7)],
	currentColor: 'red',
	positionY: -3,
	positionX: 3
}

// DOM elements
let playBTN = document.getElementById('play')
let timer = document.getElementById('timer')
let table = document.getElementById('table')

// Game Board
for (let i = 0; i < 24; i++) {
	let row = document.createElement('tr');
	table.appendChild(row)
	for (let j = 0; j < 10; j++) {
		let cell = document.createElement('td')
		row.appendChild(cell)
	}
}

// Event Listeners
playBTN.addEventListener('click', () => {
	game.playing = !game.playing;
	game.playing ? playBTN.innerText = 'Pause' : playBTN.innerText = 'Play';

})

window.addEventListener('keydown', (event) => {
	if (!game.playing) {
		return;
	}

	if (event.key === 'ArrowLeft' && game.positionX > 0) {
		removePiece();
		game.positionX--;
		drawPiece();
	}

	if (event.key === 'ArrowRight'
		&& game.positionX < (10 - game.currentPiece[0].length)
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
		console.log('up');
		// rotate()
	}

	if (event.key === ' ') {
		let status = checkBottom()
		removePiece()
		while (!status) {
			useGravity()
			status = checkBottom()
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
			let boardCol = j + game.positionX;
			let boardRow = i + game.positionY;
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
		return
	}
	if (atBottom) {
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
			let boardCol = j + game.positionX;
			let boardRow = i + game.positionY;
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
	// board bottom
	if (pieceBottom === tableBottom) {
		return true;
	}
	// hitting top of another piece
	let beneathPiece = pieceBottom + 1;
	let classList = table.children[beneathPiece].children[game.positionX].classList
	if (classList.length) {
		return true;
	}
	return false;
}

function checkTop() {
	if (game.positionY <= 0) {
		return true
	}
	return false
}

function selectNewPiece() {
	let randomNumberShapes = Math.floor(Math.random() * shapes.length)
	let randomNumberColors = Math.floor(Math.random() * colors.length)
	game.currentPiece = shapes[randomNumberShapes]
	game.currentColor = colors[randomNumberColors]
	game.positionY = 0 - game.currentPiece.length;
	let pieceWidth = game.currentPiece[0].length;
	if (game.positionX + pieceWidth > 10) {
		game.positionX = 10 - pieceWidth
	}
}

function checkWidth() {
	let width = 0;
	for (let i = 0; i < game.currentPiece.length; i++) {
		console.log(game.currentPiece[i].length);
		if (game.currentPiece[i].length > width) {
			width = game.currentPiece[i].length
		}
	}
	console.log(width);
	return width
}

function advanceTime() {
	timer.innerText = game.timer++;
}

// Time
setInterval(() => {
	if (!game.playing) return;
	removePiece()
	useGravity()
	drawPiece()
	advanceTime()
}, 500)

console.log(table.children);

// function rotate() {
// 	if (game.currentPiece == [[1, 1], [1, 1]]) {
// 		console.log('square');
// 	}

// }
