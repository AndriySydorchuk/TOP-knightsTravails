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

export function getMoves(startPosition) {
  const BOARD_SIZE = 8;
  const [x, y] = startPosition;
  const moves = [];

  for (let i = 0; i < moveCoefs.length; i++) {
    const nextX = x + moveCoefs[i][0];
    const nextY = y + moveCoefs[i][1];

    if (nextX < 0 || nextY < 0 || nextX >= BOARD_SIZE || nextY >= BOARD_SIZE)
      continue;

    moves.push([startPosition, [nextX, nextY]]);
  }

  return moves;
}
