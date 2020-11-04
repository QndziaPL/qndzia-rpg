import {EnemyListEnum} from "../consts/enemyList";
import {RandomNumberBetween} from "./randomNumberBetween";


export const GenerateEnemyMap = ({amount}) => {

    let randomEnemiesMap = [];
    let usedPositions = [];
    for (let y = 0; y < amount; y++) {
        const rnd = RandomNumberBetween(Object.keys(EnemyListEnum).length)
        // console.log(Object.keys(EnemyListEnum))
        // console.log("generateenemymap",rnd)
        let randomX = RandomNumberBetween(19,0);
        let randomY = RandomNumberBetween(19,0);

        for (let i = 0; i < usedPositions.length; i++){
            if (usedPositions[i].randomX === randomX && usedPositions[i].randomY === randomY){
               do {
                    randomX = RandomNumberBetween(19,0);
                    randomY = RandomNumberBetween(19,0);
               }while ((usedPositions[i].randomX === randomX && usedPositions[i].randomY === randomY))
            }
        }
        usedPositions.push({randomX,randomY})

        const enemy = EnemyListEnum[rnd]({x:randomX,y:randomY})

        randomEnemiesMap.push(enemy)
    }
    console.log("chuj",usedPositions)

    return {randomEnemiesMap, usedPositions};

}