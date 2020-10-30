import { Game } from "src/core/game.js";
import { Grid, Cell } from "src/core/grid.js";

let game;

describe("Game", () => {
  beforeEach(() => {
    game = new Game();
  });

  it("initializes with a Grid", () => {
    expect(game).toBeInstanceOf(Game);
    expect(game.grid).toBeInstanceOf(Grid);
  });

  test("randCoords()", () => {
    let coords = game.randCoords();
    expect(coords).toBeInstanceOf(Array);
    expect(coords[0]).toEqual(
      expect.objectContaining({
        x: expect.any(Number),
        y: expect.any(Number),
      })
    );
  });

  test("populateLife()", () => {
    let coords = game.randCoords();
    game.populateLife(coords);

    let cell = game.grid.getCell(coords[1]);
    cell.alive = true;

    cell = game.grid.getCell(coords[1]);
    expect(cell.alive).toBe(true);
  });

  describe("neighbours", () => {
    it("should return an array of cells", () => {
      let cell = game.grid.getCell({ x: 0, y: 0 });

      expect(cell.neighbours).toEqual(
        expect.arrayContaining([expect.any(Cell)])
      );
    });

    it("handles 'edge' cases =)", () => {
      let cell = game.grid.getCell({ x: 0, y: 0 });

      expect(cell.neighbours.length).toBe(3);
    });
  });

  describe("liveOrDie", () => {
    beforeEach(() => {
      game = new Game();

      let aliveCoords = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 2, y: 1 },
      ];

      game.populateLife(aliveCoords);
    });

    test("Become alive if there are exactly three living neighbours", () => {
      // x1,y1 is dead but should come to life.

      let cell = game.grid.getCell({ x: 1, y: 1 });
      expect(cell.alive).toBe(false);

      expect(cell.livingNeighbours.length).toBe(3);
      expect(game.liveOrDie(cell)).toBe(true);
    });

    test("Die if there are less than two living neighbours", () => {
      let cell = game.grid.getCell({ x: 2, y: 1 });
      expect(cell.alive).toBe(true);

      expect(cell.livingNeighbours.length).toBe(1);
      expect(game.liveOrDie(cell)).toBe(false);
    });

    test("Continue living if there are exactly two to three living neighbours", () => {
      let cell = game.grid.getCell({ x: 1, y: 0 });
      expect(cell.alive).toBe(true);

      expect(cell.livingNeighbours.length).toBe(2);

      game.grid.getCell({ x: 1, y: 1 }).alive = true;
      expect(cell.livingNeighbours.length).toBe(3);
      expect(game.liveOrDie(cell)).toBe(true);
    });

    test("Die if there are more than three living neighbours", () => {
      game.grid.getCell({ x: 1, y: 1 }).alive = true;
      game.grid.getCell({ x: 0, y: 0 }).alive = true;

      let cell = game.grid.getCell({ x: 1, y: 0 });

      expect(cell.livingNeighbours.length).toBe(4);
      expect(game.liveOrDie(cell)).toBe(false);
    });
  });

  describe("tick", () => {
    beforeEach(() => {
      game = new Game();

      let aliveCoords = [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 }
      ];

      game.populateLife(aliveCoords);
    });

    it("should correctly update life", () => {
      game.tick();
      expect(game.grid.getCell({ x: 1, y: 0 }).alive).toBe(true);
      expect(game.grid.getCell({ x: 1, y: 1 }).alive).toBe(true);
      expect(game.grid.getCell({ x: 1, y: 2 }).alive).toBe(true);
      game.tick();
      expect(game.grid.getCell({ x: 1, y: 0 }).alive).toBe(false);
      expect(game.grid.getCell({ x: 1, y: 1 }).alive).toBe(true);
      expect(game.grid.getCell({ x: 1, y: 2 }).alive).toBe(false);
    });
  });
});
