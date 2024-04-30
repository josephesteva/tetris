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
		checkRight();
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
		removePiece()
		rotate()
		drawPiece()
	}

	if (event.key === 'd') {
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
		return
	}
	if (atBottom) {
		// checkLineClear()
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
	// board bottom
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

function checkTop() {
	if (game.positionY <= 0) {
		return true
	}
	return false
}

// function checkLineClear() {
// 	for (i = 0; i < game.currentPiece.length; i++) {
// 		for (j = 0; j < 10; j++) {
// 			let square = table.children[game.positionY + i].children[j]
// 			if (!square.classList.length) {
// 				break
// 			} else if (j === 9 && square.classList.length) {
// 				console.log('Line', game.positionY + i + 1, 'should be removed');
// 				// console.log('game row index', game.positionY + i, table.children[game.positionY + i]);
// 				// table.splice(game.positionY + i, 1)
// 				table.children[game.positionY + i].remove();
// 				createRow()
// 			}
// 		}
// 	}
// }

// function createRow() {
// 	let newRow = document.createElement('tr')
// 	for (i = 0; i < 10; i++) {
// 		let cell = document.createElement('td');
// 		newRow.appendChild(cell);
// 	}
// 	table.prepend(newRow)
// }

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

// function checkWidth() {
// 	let width = 0;
// 	for (let i = 0; i < game.currentPiece.length; i++) {
// 		console.log(game.currentPiece[i].length);
// 		if (game.currentPiece[i].length > width) {
// 			width = game.currentPiece[i].length
// 		}
// 	}
// 	console.log(width);
// 	return width
// }

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
	console.log(newPiece);
	// before drawing piece, check for each filled in block of new piece, if there is no style class that conflicts 
	// if there is a class bump positionX left by one and continue loop (potential iteration skip to account for bump)
	// need to make sure that bump doesn't push too far left
	// if bump pushes too far left, don't allow rotation
	// potentially need to save old game.currentPiece in order to revert ... this function probably doesn't work if
	// game.current piece hasn't been updated yet ... actually it should as long as you just start with piece at pos x and y?
	// so hopefully don't need to save old game state
	game.currentPiece = newPiece
	for (i = 0; i < game.currentPiece[0].length; i++) {
		if (table.children[game.positionY].children[game.positionX + i].classList.length) {
			console.log('conflict');
		}
		if (game.positionX + game.currentPiece[0].length > 9) {
			game.positionX = 10 - game.currentPiece[0].length
		}
	}
}

function checkRight() {
	for (i = 0; i < game.currentPiece.length; i++) {
		if (table.children[game.positionY + i].children[game.positionX + game.currentPiece[0].length].classList.length) {
			console.log('right collision');
		}
	}
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