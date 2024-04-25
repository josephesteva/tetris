// GAME STATE
let game = {
	playing: false,
	timer: 0,
	currentPiece: [
		[1, 1],
		[1, 1],
	],
	positionY: 0,
}

// DOM elements
let playBTN = document.getElementById('play')
let timer = document.getElementById('timer')
let table = document.getElementById('table')

playBTN.addEventListener('click', () => {
	game.playing = !game.playing;
	game.playing ? playBTN.innerText = 'Pause' : playBTN.innerText = 'Play';

})

// Game Board
for (let i = 0; i < 24; i++) {
	let row = document.createElement('tr');
	table.appendChild(row)
	for (let j = 0; j < 10; j++) {
		let cell = document.createElement('td')
		cell.id = (i + '-' + j)
		table.appendChild(cell)
	}
}

// Game functions
const drawPiece = () => {
	let piece = game.currentPiece;
	for (i = 0; i < piece.length; i++) {
		for (j = 0; j < piece[i].length; j++) {
			let boardRow = i + game.positionY;
			let pixel = document.getElementById(boardRow + '-' + j)
			console.log(pixel);
			pixel.classList.add('red')
			// if (boardRow >= 2) {
			// 	document.getElementById(boardRow - 2 + '-' + j).classList.remove('red')
			// }
		}
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
			let pixel = document.getElementById(boardRow + '-' + j)
			console.log(pixel);
			pixel.classList.remove('red')
		}
	}
}

function advanceTime() {
	timer.innerText = game.timer++;
	console.log(game.positionY);
}

// Time
setInterval(() => {
	if (!game.playing) return;
	removePiece()
	useGravity()
	drawPiece()
	advanceTime()
}, 1000)

drawPiece()

