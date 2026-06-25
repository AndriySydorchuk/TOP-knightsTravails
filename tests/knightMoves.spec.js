import { knightMoves } from "../src/knightMoves";

// --- Helpers ---

function isValidKnightMove([x1, y1], [x2, y2]) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
}

function isValidPath(path) {
  for (let i = 0; i < path.length - 1; i++) {
    if (!isValidKnightMove(path[i], path[i + 1])) return false;
  }
  return true;
}

function isOnBoard([x, y]) {
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

// --- Tests ---

describe("knightMoves", () => {
  // Return value shape
  describe("return value", () => {
    it("returns an array", () => {
      const result = knightMoves([0, 0], [1, 2]);
      expect(Array.isArray(result)).toBe(true);
    });

    it("returns an array of [x, y] coordinate pairs", () => {
      const result = knightMoves([0, 0], [1, 2]);
      result.forEach((pos) => {
        expect(Array.isArray(pos)).toBe(true);
        expect(pos).toHaveLength(2);
        expect(typeof pos[0]).toBe("number");
        expect(typeof pos[1]).toBe("number");
      });
    });
  });

  // Start and end positions
  describe("path start and end", () => {
    it("starts at the given start position", () => {
      const result = knightMoves([0, 0], [7, 7]);
      expect(result[0]).toEqual([0, 0]);
    });

    it("ends at the given end position", () => {
      const result = knightMoves([0, 0], [7, 7]);
      expect(result[result.length - 1]).toEqual([7, 7]);
    });

    it("returns only the start position when start equals end", () => {
      const result = knightMoves([3, 3], [3, 3]);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual([3, 3]);
    });
  });

  // Move validity
  describe("move validity", () => {
    it("every step in the path is a valid knight move", () => {
      const result = knightMoves([0, 0], [7, 7]);
      expect(isValidPath(result)).toBe(true);
    });

    it("all positions in the path are within the board", () => {
      const result = knightMoves([0, 0], [7, 7]);
      result.forEach((pos) => {
        expect(isOnBoard(pos)).toBe(true);
      });
    });
  });

  // Known shortest path lengths
  describe("shortest path length", () => {
    it("[0,0] → [1,2] takes 1 move (2 squares)", () => {
      const result = knightMoves([0, 0], [1, 2]);
      expect(result).toHaveLength(2);
    });

    it("[0,0] → [3,3] takes 2 moves (3 squares)", () => {
      const result = knightMoves([0, 0], [3, 3]);
      expect(result).toHaveLength(3);
    });

    it("[3,3] → [0,0] takes 2 moves (3 squares) — symmetry check", () => {
      const result = knightMoves([3, 3], [0, 0]);
      expect(result).toHaveLength(3);
    });

    it("[0,0] → [7,7] takes 6 moves (7 squares)", () => {
      const result = knightMoves([0, 0], [7, 7]);
      expect(result).toHaveLength(7);
    });

    it("[0,0] → [0,0] takes 0 moves (1 square)", () => {
      const result = knightMoves([0, 0], [0, 0]);
      expect(result).toHaveLength(1);
    });

    it("[0,0] → [7,0] takes 5 moves (6 squares)", () => {
      const result = knightMoves([0, 0], [7, 0]);
      expect(result).toHaveLength(6);
    });
  });

  // Corner and edge cases
  describe("corner and edge positions", () => {
    it("handles start from corner [0,0]", () => {
      const result = knightMoves([0, 0], [2, 1]);
      expect(result[0]).toEqual([0, 0]);
      expect(result[result.length - 1]).toEqual([2, 1]);
      expect(isValidPath(result)).toBe(true);
    });

    it("handles start from corner [7,7]", () => {
      const result = knightMoves([7, 7], [5, 6]);
      expect(result[0]).toEqual([7, 7]);
      expect(result[result.length - 1]).toEqual([5, 6]);
      expect(isValidPath(result)).toBe(true);
    });

    it("handles start from corner [0,7]", () => {
      const result = knightMoves([0, 7], [7, 0]);
      expect(isValidPath(result)).toBe(true);
      expect(isOnBoard(result[0])).toBe(true);
      expect(result[result.length - 1]).toEqual([7, 0]);
    });

    it("handles start from edge position [0,4]", () => {
      const result = knightMoves([0, 4], [3, 3]);
      expect(isValidPath(result)).toBe(true);
      expect(result[result.length - 1]).toEqual([3, 3]);
    });
  });

  // No duplicate positions
  describe("no revisiting squares", () => {
    it("does not visit the same square twice", () => {
      const result = knightMoves([0, 0], [7, 7]);
      const seen = new Set(result.map(([x, y]) => `${x},${y}`));
      expect(seen.size).toBe(result.length);
    });
  });
});
