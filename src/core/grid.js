export class Grid {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.rows = this.initRows(height);
  }

  initRows(count) {
    return Array(count)
      .fill()
      .map((_v, rowIndex) => {
        return new Row(this, rowIndex);
      });
  }

  getCell({ x, y }) {
    return this.rows[y]?.cols[x];
  }

  get cells() {
    const cells = [];
    for (const row of this.rows) {
      for (const cell of row.cols) {
        cells.push(cell);
      }
    }
    return cells;
  }

  clear() {
    this.cells.forEach((cell) => (cell.alive = false));
  }
}

export class Cell {
  constructor(row, cellIndex) {
    this.row = row;
    this.grid = this.row.grid;
    this.cellIndex = cellIndex;
    this.alive = false;
  }

  get x() {
    return this.cellIndex;
  }

  get y() {
    return this.row.rowIndex;
  }

  get neighbours() {
    // prettier-ignore
    const matrix = [
      [-1,-1],[-1, 0],[-1, 1],
      [ 0,-1],        [ 0, 1],
      [ 1,-1],[ 1, 0],[ 1, 1],
     ];

    return matrix
      .map(([x, y]) => this.grid.getCell({ x: this.x + x, y: this.y + y }))
      .filter((cell) => cell);
  }

  get livingNeighbours() {
    return this.neighbours.filter((cell) => cell.alive);
  }
}

export class Row {
  constructor(grid, rowIndex) {
    this.grid = grid;
    this.rowIndex = rowIndex;
    this.cols = this.initCols(this.grid.width);
  }

  initCols(count) {
    return Array(count)
      .fill()
      .map((_v, cellIndex) => {
        return new Cell(this, cellIndex);
      });
  }
}
