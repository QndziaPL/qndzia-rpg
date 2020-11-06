import {EnemyListEnum} from "../consts/enemyList";
import {RandomNumberBetween} from "./randomNumberBetween";
import {generateId} from "./createIDforEnemies";


/** Generating enemy map and returning 1: map 2: used positions*/
export const GenerateEnemyMap = ({amount}) => {

    let enemyMap = [];
    let usedPositions = [];
    for (let y = 0; y < amount; y++) {
        const rnd = RandomNumberBetween(Object.keys(EnemyListEnum).length)
        let randomX = RandomNumberBetween(19, 0);
        let randomY = RandomNumberBetween(19, 0);
        for (let i = 0; i < usedPositions.length; i++) {
            if (usedPositions[i].randomX === randomX && usedPositions[i].randomY === randomY) {
                do {
                    randomX = RandomNumberBetween(19, 0);
                    randomY = RandomNumberBetween(19, 0);
                } while ((usedPositions[i].randomX === randomX && usedPositions[i].randomY === randomY))
            }
        }
        usedPositions.push({randomX, randomY})
        const enemy = EnemyListEnum[rnd]({x: randomX, y: randomY})
        enemy.tileID = generateId(randomX, randomY)
        enemyMap.push(enemy)
    }
    return {enemyMap, usedPositions};
}