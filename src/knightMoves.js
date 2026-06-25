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

  for (const line of queue) {
    for (const pair of line) {
      const [parent, child] = pair;

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

  queue.reverse();
  for (const line of queue) {
    for (const pair of line) {
      const [parent, child] = pair;

      if (isEqual(child, tmp)) {
        if (path.some((position) => isEqual(position, parent))) continue;

        path.push(parent);
        tmp = parent;

        if (isEqual(parent, start)) {
          path.reverse().push(end);

          return path;
        }

        break;
      }
    }
  }
}
