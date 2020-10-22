import {Grid, Row, Cell} from "src/core/grid.js"

it('Grid to initialize with Rows and Cells', () => {
  let grid = new Grid(10, 10);

  expect(grid.rows.length).toBe(10)
  expect(grid.rows[9]).toBeInstanceOf(Row)

  expect(grid.rows[9].cols.length).toBe(10)
  expect(grid.rows[9].cols[9]).toBeInstanceOf(Cell)

  expect(grid.getCell({x: 0, y: 0})).toBeInstanceOf(Cell)
  expect(grid.getCell({x: 0, y: 0}).x).toBe(0)
  expect(grid.getCell({x: 0, y: 3}).y).toBe(3)
});

it("Row has index property", () => {
  let grid = new Grid(10, 10);

  expect(grid.rows[1].rowIndex).toBe(1)
})

it("Cell can return x and y", () => {
  let grid = new Grid(10, 10);

  expect(grid.rows[9].cols[1].x).toBe(1)
  expect(grid.rows[9].cols[1].y).toBe(9)
})

