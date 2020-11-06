export const CalculateTooltipPosition = (containerHeight, containerWidth, {x, y}) => {
    let newX = x * 32;
    let newY = y * 32;
    if (y < 10) {
        newY += 48;
    } else {
        newY -= (16 + containerHeight);
    }

    newX -= Math.floor(containerWidth / 2);
    newX += 16;
    if (x === 19){
        newX -= 64
    }
    if (x === 18){
        newX -= 32
    }

    return {x: newX, y: newY}
}

