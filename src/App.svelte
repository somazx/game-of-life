<script>
	import { Game } from "./core/game.js";

	const game = new Game();
	let matrix;
	let runSim;

	game.initGrid(20, 20)
	game.populateLife();
	matrix = getCells();

	function advanceSim() {
		console.log("calculating next tick");
		game.tick();
		matrix = getCells();

		if (runSim === true) setTimeout(advanceSim, 200);
	}

	function getCells() {
		return game.grid.rows.map((row) => row.cols.map((cell) => cell));
	}

	function nextHandler() {
		runSim = false;
		advanceSim();
	}

	function playHandler() {
		runSim = true;
		advanceSim();
	}

	function stopHandler() {
		runSim = false;
	}

	function resetHandler() {
		runSim = false;
		game.populateLife();
		matrix = getCells();
	}

	function handleClick(cell) {
		cell.alive = !cell.alive
		matrix = getCells();
	}
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	table.grid {
		margin-bottom: 2em;
	}

	table.grid td {
		width: 20px;
		height: 20px;
		border: 1px solid lightgray;
	}

	table.grid td.alive {
		background-color: lightskyblue;
		/* transition: background-color 0.2s ease-out; */
	}
</style>

<main>
	<h1>Conway's Game of Life</h1>

	<table class="grid" align="center">
		{#each matrix as row}
			<tr>
				{#each row as cell}
					<td on:click={() => handleClick(cell)} class:alive={cell.alive}></td>
				{/each}
			</tr>
		{/each}
	</table>

	<button on:click={nextHandler}>Next</button>
	<button on:click={playHandler}>Play</button>
	<button on:click={stopHandler}>Stop</button>
	<button on:click={resetHandler}>Reset</button>
</main>
