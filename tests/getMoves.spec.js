import { getMoves } from "../src/getMoves";

// --- Helpers ---

function isValidKnightMove([x1, y1], [x2, y2]) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
}

function isOnBoard([x, y]) {
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

// --- Tests ---

describe("getMoves", () => {
  // Return value shape
  describe("return value shape", () => {
    it("returns an array", () => {
      expect(Array.isArray(getMoves([4, 4]))).toBe(true);
    });

    it("each entry is a [start, end] pair of two [x,y] coordinates", () => {
      getMoves([4, 4]).forEach((move) => {
        expect(move).toHaveLength(2);
        expect(move[0]).toHaveLength(2);
        expect(move[1]).toHaveLength(2);
      });
    });

    it("the start coordinate in every entry matches the input position", () => {
      const start = [4, 4];
      getMoves(start).forEach((move) => {
        expect(move[0]).toEqual(start);
      });
    });
  });

  // Move count by position
  describe("move count", () => {
    it("returns 8 moves from the center [4,4]", () => {
      expect(getMoves([4, 4])).toHaveLength(8);
    });

    it("returns 2 moves from corner [0,0]", () => {
      expect(getMoves([0, 0])).toHaveLength(2);
    });

    it("returns 2 moves from corner [7,7]", () => {
      expect(getMoves([7, 7])).toHaveLength(2);
    });

    it("returns 2 moves from corner [0,7]", () => {
      expect(getMoves([0, 7])).toHaveLength(2);
    });

    it("returns 2 moves from corner [7,0]", () => {
      expect(getMoves([7, 0])).toHaveLength(2);
    });

    it("returns 3 moves from [1,0]", () => {
      expect(getMoves([1, 0])).toHaveLength(3);
    });

    it("returns 4 moves from [1,1]", () => {
      expect(getMoves([1, 1])).toHaveLength(4);
    });
  });

  // Move validity
  describe("move validity", () => {
    it("every destination is a valid L-shaped knight move from the start", () => {
      getMoves([4, 4]).forEach(([start, end]) => {
        expect(isValidKnightMove(start, end)).toBe(true);
      });
    });

    it("every destination is within board bounds", () => {
      getMoves([4, 4]).forEach(([, end]) => {
        expect(isOnBoard(end)).toBe(true);
      });
    });

    it("never produces out-of-bounds moves from corner [0,0]", () => {
      getMoves([0, 0]).forEach(([, end]) => {
        expect(isOnBoard(end)).toBe(true);
      });
    });

    it("never produces out-of-bounds moves from edge [0,4]", () => {
      getMoves([0, 4]).forEach(([, end]) => {
        expect(isOnBoard(end)).toBe(true);
      });
    });
  });

  // No duplicate destinations
  describe("no duplicate destinations", () => {
    it("returns no duplicate destination squares from center", () => {
      const destinations = getMoves([4, 4]).map(([, [x, y]]) => `${x},${y}`);
      const unique = new Set(destinations);
      expect(unique.size).toBe(destinations.length);
    });

    it("returns no duplicate destination squares from a corner", () => {
      const destinations = getMoves([0, 0]).map(([, [x, y]]) => `${x},${y}`);
      const unique = new Set(destinations);
      expect(unique.size).toBe(destinations.length);
    });
  });
});
