import { EnemyListEnum } from "../consts/enemyList";
import { RandomNumberBetween } from "./randomNumberBetween";
import { generateId } from "./createIDforEnemies";
import { MAP_TERRAIN_TYPE } from "../enums/mapEnums";

// const PLAYER_SPAWN_POSITION = { x: 10, y: 10 };

export const GenerateEnemyMap = ({ enemyNumber, activeTerrainMap, playerSpawn }) => {
  const { STONE, WATER } = MAP_TERRAIN_TYPE;
  const youShallNotPass = [STONE, WATER];
  console.log(activeTerrainMap.spawns.playerSpawn)
  const PLAYER_SPAWN_POSITION = activeTerrainMap.spawns[playerSpawn];

  console.log(PLAYER_SPAWN_POSITION)
  let enemyMap = [];
  let usedPositions = [];
  let enemiesById = [];

  for (let y = 0; y < enemyNumber; y++) {
    const randomEnemyFromEnum = RandomNumberBetween(
      Object.keys(EnemyListEnum).length
    );
    let randomX = RandomNumberBetween(19, 0);
    let randomY = RandomNumberBetween(19, 0);

    for (let i = 0; i < usedPositions.length; i++) {
      // checks if positions for enemy is already used , also check for terrain where enemies cant spawn
      if (
        (usedPositions[i].randomX === randomX &&
          usedPositions[i].randomY === randomY) ||
        youShallNotPass.includes(activeTerrainMap.map[generateId(randomX, randomY)]) ||
        (randomX === PLAYER_SPAWN_POSITION.x &&
          randomY === PLAYER_SPAWN_POSITION.y)
      ) {
        do {
          randomX = RandomNumberBetween(19, 0);
          randomY = RandomNumberBetween(19, 0);
        } while (
          (usedPositions[i].randomX === randomX &&
            usedPositions[i].randomY === randomY) ||
          youShallNotPass.includes(activeTerrainMap.map[generateId(randomX, randomY)]) ||
          (randomX === PLAYER_SPAWN_POSITION.x &&
            randomY === PLAYER_SPAWN_POSITION.y)
        );
      }
    }
    usedPositions.push({ randomX, randomY });
    const id = generateId(randomX, randomY);
    const enemy = EnemyListEnum[randomEnemyFromEnum]({
      x: randomX,
      y: randomY,
    });
    enemy.tileId = generateId(randomX, randomY);
    enemy.stats.hp = RandomNumberBetween(Math.floor(enemy.stats.hp * 1.4), Math.floor(enemy.stats.hp * 0.7))
    console.log(enemy)
    enemyMap.push(enemy);
    enemiesById = {
      ...enemiesById,
      [id]: enemy,
    };
  }
  return { enemyMap, usedPositions, enemiesById };
};
