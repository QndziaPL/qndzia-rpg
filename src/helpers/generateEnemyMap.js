import {EnemyListEnum} from "../consts/enemyList";
import {RandomNumberBetween} from "./randomNumberBetween";
import {generateId} from "./createIDforEnemies";
import {MAP_TERRAIN_TYPE} from "../enums/mapEnums";



export const GenerateEnemyMap = ({amount, terrainMap}) => {

    const {STONE, WATER} = MAP_TERRAIN_TYPE;
    const youShallNotPass = [STONE, WATER];

    let enemyMap = [];
    let usedPositions = [];
    let enemiesById = [];
    for (let y = 0; y < amount; y++) {
        const rnd = RandomNumberBetween(Object.keys(EnemyListEnum).length)
        let randomX = RandomNumberBetween(19, 0);
        let randomY = RandomNumberBetween(19, 0);
        for (let i = 0; i < usedPositions.length; i++) {
            // checks if positions for enemy is already used , also check for terrain where enemies cant spawn
            if ((usedPositions[i].randomX === randomX && usedPositions[i].randomY === randomY) || youShallNotPass.includes(terrainMap[generateId(randomX, randomY)])) {
                do {
                    randomX = RandomNumberBetween(19, 0);
                    randomY = RandomNumberBetween(19, 0);
                } while ((usedPositions[i].randomX === randomX && usedPositions[i].randomY === randomY) || youShallNotPass.includes(terrainMap[generateId(randomX, randomY)]))
            }
        }
        usedPositions.push({randomX, randomY})
        const id = generateId(randomX, randomY)
        const enemy =  EnemyListEnum[rnd]({x: randomX, y: randomY})
        enemy.tileId = generateId(randomX, randomY)
        enemyMap.push(enemy)

        // enemiesById.push({[id]: enemy})
        enemiesById = {
            ...enemiesById,
            [id]: enemy
        }

    }
    // console.log(enemyMap)
    return {enemyMap, usedPositions, enemiesById};
}