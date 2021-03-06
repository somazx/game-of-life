import { Grid } from "./grid.js";

export class Game {
  constructor() {
    this.initGrid();
  }

  initGrid(height = 10, width = 10) {
    this.grid = new Grid(height, width);
  }

  rng(max) {
    return Math.floor(Math.random() * max);
  }

  randCoords(cellDivisor = 2) {
    const cellCount = this.grid.height * this.grid.width;
    const maxLife = this.rng(cellCount / cellDivisor);

    return Array(maxLife)
      .fill()
      .map((value) => {
        const x = this.rng(this.grid.width);
        const y = this.rng(this.grid.height);

        return { x, y };
      });
  }

  populateLife(randCoords = this.randCoords()) {
    this.grid.clear();
    randCoords.forEach((coord) => {
      let cell = this.grid.getCell(coord);
      // if cell was found, set it as alive
      if (cell) cell.alive = true;
    });
  }

  liveOrDie(cell) {
    const count = cell.livingNeighbours.length;

    if (cell.alive && count >= 2 && count <= 3) return true;
    if (!cell.alive && count === 3) return true;

    return false;
  }

  tick() {
    const newGrid = new Grid(this.grid.height, this.grid.width);
    this.grid.cells.forEach(
      (cell) => (newGrid.getCell(cell).alive = this.liveOrDie(cell))
    );
    this.grid = newGrid;
  }

  draw() {
    return this.grid.cells.reduce((output, cell, count) => {
      output += cell.alive ? "X" : "O";
      if ((count + 1) % 10 === 0) output += "\n";
      return output;
    }, "");
  }
}
