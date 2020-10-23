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

  get neighbourCoords() {
    const top = { x: this.x, y: this.y - 1 };
    const right = { x: this.x + 1, y: this.y };
    const bottom = { x: this.x, y: this.y + 1 };
    const left = { x: this.x - 1, y: this.y };

    return { top, right, bottom, left };
  }

  get neighbourCells() {
    const cells = {};
    for (const cellPosition in this.neighbourCoords) {
      const coord = this.neighbourCoords[cellPosition];
      cells[cellPosition] = this.grid.getCell(coord);
    }
    return cells;
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
