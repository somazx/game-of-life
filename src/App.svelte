<script>
	import { Game } from "./core/game.js";

	const game = new Game();
	let matrix;
	let runSim = 0;
	let width = 20;
	let height = 20;

	init();

	function init() {
		game.initGrid(height, width);
		game.populateLife();
		matrix = getCells();
	}

	function advanceSim() {
		console.log("calculating next tick");
		game.tick();
		matrix = getCells();

		if (runSim !== 0) setTimeout(advanceSim, 200);
	}

	function getCells() {
		return game.grid.rows.map((row) => row.cols.map((cell) => cell));
	}

	function nextHandler() {
		runSim = 0;
		advanceSim();
	}

	function playHandler() {
		runSim += 1;
		advanceSim();
	}

	function stopHandler() {
		runSim = 0;
	}

	function resetHandler() {
		runSim = 0;
		game.populateLife();
		matrix = getCells();
	}

	function handleClick(cell) {
		cell.alive = !cell.alive;
		matrix = getCells();
	}

	function updateHeightWidth() {
		const savedState = game.grid.cells.filter((cell) => cell.alive);
		game.initGrid(height, width);
		game.populateLife(savedState);
		matrix = getCells();
	}

	function clearHandler() {
		game.initGrid(height, width);
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
					<td
						on:click={() => handleClick(cell)}
						class:alive={cell.alive} />
				{/each}
			</tr>
		{/each}
	</table>

	<button on:click={nextHandler}>Step</button>
	<button on:click={playHandler}>Play {runSim + 1}x</button>
	<button on:click={stopHandler}>Stop</button>
	<button on:click={resetHandler}>Random</button>
	<button on:click={clearHandler}>Clear</button>

	<div>
		<label for="height">Height ({height})</label>
		<input
			type="range"
			min="5"
			max="100"
			on:input={updateHeightWidth}
			bind:value={height}
			id="height" />
	</div>
	<div>
		<label for="width">Width ({width})</label>
		<input
			type="range"
			min="5"
			max="100"
			on:input={updateHeightWidth}
			bind:value={width}
			id="width" />
	</div>
</main>
