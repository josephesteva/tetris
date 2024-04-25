// GAME STATE
let game = {
	playing: false,
	timer: 0
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
for (let i = 0; i < 30; i++) {
	let row = document.createElement('tr');
	table.appendChild(row)
	for (let j = 0; j < 10; j++) {
		let cell = document.createElement('td')
		cell.id = ((i*10)+(j+1))
		table.appendChild(cell)
	}
}

document.getElementById('36').classList.add('red')
document.getElementById('52').classList.add('red')

function advanceTime() {
	if (game.playing) {
		timer.innerText = game.timer;
		game.timer++;
	}
}

setInterval(advanceTime, 100)