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
	positionY: 0,
	positionX: 3
}

// DOM elements
let playBTN = document.getElementById('play')
let timer = document.getElementById('timer')
let table = document.getElementById('table')
let left = document.getElementById('left')
let right = document.getElementById('right')

// Game Board
for (let i = 0; i < 24; i++) {
	let row = document.createElement('tr');
	table.appendChild(row)
	for (let j = 0; j < 10; j++) {
		let cell = document.createElement('td')
		cell.id = (i + '-' + j)
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

	if (event.key === 'ArrowLeft') {
		removePiece();
		game.positionX--;
		drawPiece();
	}

	if (event.key === 'ArrowRight') {
		removePiece();
		game.positionX++;
		drawPiece();
	}

	if (event.key === 'ArrowDown') {
		removePiece();
		useGravity();
		drawPiece();
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
			let pixel = document.getElementById(boardRow + '-' + boardCol)
			console.log(pixel);
			pixel.classList.add(game.currentColor)
		}
	}
	checkBottom()
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
			let pixel = document.getElementById(boardRow + '-' + boardCol)
			console.log(pixel);
			pixel.classList.remove(game.currentColor)
		}
	}
}

function checkBottom() {
	let piece = game.currentPiece;
	let tableBottom = table.children.length - 1;
	let pieceBottom = piece.length - 1 + game.positionY;
	console.log(tableBottom);
	if (pieceBottom === tableBottom) {
		selectNewPiece()
		return;
	}
	let beneathPiece = pieceBottom + 1;
	let classList = document.getElementById(beneathPiece + '-' + game.positionX).classList //x position needs to be dynamic
	if (classList.length) {
		selectNewPiece()
		return;
	}

}

function selectNewPiece() {
	game.positionY = 0;
	let randomNumberShapes = Math.floor(Math.random() * shapes.length)
	let randomNumberColors = Math.floor(Math.random() * colors.length)
	game.currentPiece = shapes[randomNumberShapes]
	game.currentColor = colors[randomNumberColors]
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
