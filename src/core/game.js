import { Grid } from "src/core/grid.js"

export class Game {
  constructor() {
    this.initGrid()
  }

  initGrid(height=10, width=10) {
    this.grid = new Grid(height, width)
  }

  rng(max) {
    return Math.floor(Math.random() * max);
  }

  randCoords(cellDivisor = 5) {
    const cellCount = this.grid.height * this.grid.width
    const maxLife = this.rng(cellCount / cellDivisor)

    return Array(maxLife).fill().map(value => {
      const x = this.rng(this.grid.width)
      const y = this.rng(this.grid.height)

      return {x, y}
    });

  }

  populateLife(randCoords = this.randCoords()) {
    randCoords.forEach(coord => {
      let cell = this.grid.getCell(coord)
      cell.alive = true
    })
  }
}
