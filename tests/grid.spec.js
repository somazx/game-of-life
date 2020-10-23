import {Grid, Row, Cell} from "src/core/grid.js"

describe('Grid', () => {
  it('initializes with Rows and Cells', () => {
    let grid = new Grid(10, 10);

    expect(grid.rows.length).toBe(10)
    expect(grid.rows[9]).toBeInstanceOf(Row)

    expect(grid.rows[9].cols.length).toBe(10)
    expect(grid.rows[9].cols[9]).toBeInstanceOf(Cell)

    expect(grid.getCell({x: 0, y: 0})).toBeInstanceOf(Cell)
    expect(grid.getCell({x: 0, y: 0}).x).toBe(0)
    expect(grid.getCell({x: 0, y: 3}).y).toBe(3)
  });

  describe('getCell', () => {
    let grid = new Grid(10, 10);

    it('returns a cell when given valid coords', () => {
      expect(grid.getCell({x: 1, y: 1})).toBeInstanceOf(Cell)
    });

    it('return null when given invalid coords', () => {
      expect(grid.getCell({x: -10, y: -10})).toBe(undefined)
    });
  })
})

describe('Row', () => {
  it("has rowIndex property", () => {
    let grid = new Grid(10, 10);

    expect(grid.rows[1].rowIndex).toBe(1)
  })
})


describe('Cell', () => {
  it("x and y getters", () => {
    let grid = new Grid(10, 10);

    expect(grid.rows[9].cols[1].x).toBe(1)
    expect(grid.rows[9].cols[1].y).toBe(9)
  })

  describe('neighbourCoords', () => {
    let grid = new Grid(10, 10);

    it('returns an array of coord objects', () => {
      let cell = grid.getCell({x:0, y: 0})

      expect(cell.neighbourCoords).toEqual({
        top: {x: 0, y: -1},
        right: {x: 1, y: 0},
        bottom: {x: 0, y: 1},
        left: {x: -1, y: 0}
      })
    });

  })
})

