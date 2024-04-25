// GAME STATE
let game = {
	playing: false,
	timer: 0,
	currentPiece: [
		[1, 1],
		[1, 1],
	]
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
			let pixel = document.getElementById(i + '-' + j)
			console.log(pixel);
			pixel.classList.add('red')
		}
	}
}

function advanceTime() {
	timer.innerText = game.timer++;
}

// Time
setInterval(() => {
	if (!game.playing) return;
	drawPiece
	advanceTime()
}, 1000)

drawPiece()

document.getElementById('3-6').classList.add('red')
document.getElementById('5-2').classList.add('red')
