import { isEqual } from "./isEqual";
import { getMoves } from "./getMoves";

export function knightMoves(start, end) {
  if (isEqual(start, end)) return [start];

  const [queue, visited] = traverseUntilFound(start, end);

  return reconstructPath(queue, start, end);
}

function traverseUntilFound(start, end) {
  const visited = [start];
  const queue = [getMoves(start)];

  for (let i = 0; i < queue.length; i++) {
    const line = queue[i];
    for (let j = 0; j < line.length; j++) {
      const pair = line[j];
      const parent = pair[0];
      const child = pair[1];

      if (isEqual(child, end)) return [queue, visited];

      if (visited.find((position) => isEqual(position, child))) continue;

      queue.push(getMoves(child));
      visited.push(child);
    }
  }
}

function reconstructPath(queue, start, end) {
  const path = [];
  let tmp = end;

  for (let i = queue.length - 1; i >= 0; i--) {
    const line = queue[i];

    for (let j = 0; j < line.length; j++) {
      const pair = line[j];
      const parent = pair[0];
      const child = pair[1];

      if (isEqual(child, tmp)) {
        if (path.some((position) => isEqual(position, parent))) continue;

        path.push(parent);
        tmp = parent;

        if (isEqual(parent, start)) {
          path.reverse();
          path.push(end);
          return path;
        }

        break;
      }
    }
  }
}
