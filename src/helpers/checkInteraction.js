import { MAP_TERRAIN_TYPE } from "../enums/mapEnums";

// mechanism to check if player interacts with environment
export function checkInteraction(
  compiledIDs,
  playerPositionId,
  playerPosition
) {
  const { STONE, WATER, TREASURE } = MAP_TERRAIN_TYPE;

  const playerX = playerPosition.x;
  const playerY = playerPosition.y;

  const directionUnavailable = [];
  let interaction;
  let openedChests = [];

  if (compiledIDs[playerPositionId]) {
    if (compiledIDs[playerPositionId].enemyId === 1) {
      interaction = { type: "battle", id: playerPositionId };
    }

    if (compiledIDs[playerPositionId].mapId === TREASURE){
      interaction = {type: "treasure", id: playerPositionId }
      openedChests.push(playerPositionId);
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

  const interactionOutput = {
    directionUnavailable,
    interaction,
    openedChests
  };

  return interactionOutput;
}
