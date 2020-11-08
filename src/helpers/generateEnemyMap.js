import {EnemyListEnum} from "../consts/enemyList";
import {RandomNumberBetween} from "./randomNumberBetween";
import {generateId} from "./createIDforEnemies";



export const GenerateEnemyMap = ({amount, terrainMap}) => {
    /**
     * terrainID cheatsheet
     *      0 : brown path
     *      1 : grass
     *      2 : stone
     *      3 : water
     *
     */
    const youShallNotPass = [2,3]
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