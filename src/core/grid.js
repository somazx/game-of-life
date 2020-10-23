export class Grid {
  constructor(height, width) {
    this.height = height
    this.width = width
    this.rows = this.initRows(height);
  }

  initRows(count) {
    return Array(count).fill().map((_v, rowIndex) => {
      return new Row(this, rowIndex)
    })
  }

  getCell({x, y}) {
    return this.rows[y]?.cols[x]
  }
}

export class Cell {
  constructor(row, cellIndex) {
    this.row = row;
    this.cellIndex = cellIndex;
    this.alive = false;
  }

  get x() {
    return this.cellIndex
  }

  get y() {
    return this.row.rowIndex
  }
}

export class Row {
  constructor(grid, rowIndex) {
    this.grid = grid
    this.rowIndex = rowIndex
    this.cols = this.initCols(this.grid.width)
  }

  initCols(count) {
    return Array(count).fill().map((_v, cellIndex) => {
      return new Cell(this, cellIndex)
    })
  }
}
