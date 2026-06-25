export function getMoves(startPosition) {
  const BOARD_SIZE = 8;

  const moveCoefs = [
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
  ];

  const [x, y] = startPosition;
  const moves = [];

  for (const moveCoef of moveCoefs) {
    const [xCoef, yCoef] = moveCoef;

    const nextX = x + xCoef;
    const nextY = y + yCoef;

    if (nextX < 0 || nextY < 0 || nextX >= BOARD_SIZE || nextY >= BOARD_SIZE)
      continue;

    moves.push([startPosition, [nextX, nextY]]);
  }

  return moves;
}
