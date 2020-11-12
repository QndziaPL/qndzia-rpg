const TILE_SIZE = 32;

// function used for showing tooltip about enemy in good, visible position, not for example outside the map or screen
export const CalculateTooltipPosition = (
  containerHeight,
  containerWidth,
  { x, y }
) => {
  let newX = x * TILE_SIZE;
  let newY = y * TILE_SIZE;
  if (y < 10) {
    newY += TILE_SIZE * 1.5;
  } else {
    newY -= TILE_SIZE / 2 + containerHeight;
  }

  newX -= Math.floor(containerWidth / 2);
  newX += TILE_SIZE / 2;
  if (x === 19) {
    newX -= TILE_SIZE * 2;
  }
  if (x === 18) {
    newX -= TILE_SIZE;
  }

  return { x: newX, y: newY };
};
