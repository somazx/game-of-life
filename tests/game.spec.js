import { Game } from "src/core/game.js"
import { Grid } from "src/core/grid.js"

let game = new Game()

it('Game to be a thing with a grid', () => {
  expect(game).toBeInstanceOf(Game)

  expect(game.grid).toBeInstanceOf(Grid)
});

it('randCoords', () => {
  let coords = game.randCoords()
  expect(coords).toBeInstanceOf(Array)
  expect(coords[0]).toEqual(
    expect.objectContaining({
      x: expect.any(Number),
      y: expect.any(Number),
    })
  )
});


it('populateLife', () => {
  let coords = game.randCoords()
  game.populateLife(coords)

  let cell = game.grid.getCell(coords[1])
  cell.alive = true

  cell = game.grid.getCell(coords[1])
  expect(cell.alive).toBe(true)
})
