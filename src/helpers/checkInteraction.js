import { MAP_TERRAIN_TYPE } from "../enums/mapEnums";

export function checkInteraction(
  compiledIDs,
  playerPositionId,
  playerPosition
) {
  const { STONE, WATER } = MAP_TERRAIN_TYPE;

  const playerX = playerPosition.x;
  const playerY = playerPosition.y;

  const directionUnavailable = [];
  let interaction = [];

  if (compiledIDs[playerPositionId]) {
    if (compiledIDs[playerPositionId].enemyId === 1) {
      interaction.push({ type: "battle", id: playerPositionId });
    }

    // terrain and window cases
    if (
      (playerY > 0 &&
        (compiledIDs[playerPositionId - 20].mapId === STONE ||
          compiledIDs[playerPositionId - 20].mapId === WATER)) ||
      playerY === 0
    ) {
      directionUnavailable.push("up");
    }
    if (
      (playerY < 19 &&
        (compiledIDs[playerPositionId + 20].mapId === STONE ||
          compiledIDs[playerPositionId + 20].mapId === WATER)) ||
      playerY === 19
    ) {
      directionUnavailable.push("down");
    }
    if (
      (playerX > 0 &&
        (compiledIDs[playerPositionId - 1].mapId === STONE ||
          compiledIDs[playerPositionId - 1].mapId === WATER)) ||
      playerX === 0
    ) {
      directionUnavailable.push("left");
    }
    if (
      (playerX < 19 &&
        (compiledIDs[playerPositionId + 1].mapId === STONE ||
          compiledIDs[playerPositionId + 1].mapId === WATER)) ||
      playerX === 19
    ) {
      directionUnavailable.push("right");
    }
  }

  // interaction.push({type: "nopass", tile: "stone" })

  const interactionOutput = {
    directionUnavailable,
    interaction,
  };

  return interactionOutput;
}
