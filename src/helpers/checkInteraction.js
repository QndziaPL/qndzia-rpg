import {useSelector} from "react-redux";

export function checkInteraction(compiledIDs, playerPositionId, playerPosition) {

    /**
     * terrainID cheatsheet
     *      0 : brown path
     *      1 : grass
     *      2 : stone
     *      3 : water
     *
     */
    const cID = compiledIDs;
    const pID = playerPositionId;
    const x = playerPosition.x
    const y = playerPosition.y

    // console.log("compiledIDs",cID)
    // console.log("playerPositionIDs",pID)
    //
    // console.log(cID[pID])
    // console.log(x,y)

    const directionUnavailable = []
    let interaction = []

    if (cID[pID]){
        if (cID[pID].enemyId === 1) {

            interaction.push({type: "battle", id: playerPositionId})

        }




        // terrain and window cases
        if ((pID > 19 && ((cID[pID-20].mapId === 2) || (cID[pID-20].mapId === 3))) || y<1){
            directionUnavailable.push("up")

        }
        if ((pID <380 && ((cID[pID+20].mapId === 2) || (cID[pID+20].mapId === 3))) || y > 18){
            directionUnavailable.push("down")
        }
        /** TERAZ KONIECZNIE DO ZROBIENIA */
        if ((pID <380 && ((cID[pID+20].mapId === 2) || (cID[pID+20].mapId === 3))) || x < 1){
            directionUnavailable.push("left")
        }
        if ((pID <380 && ((cID[pID+20].mapId === 2) || (cID[pID+20].mapId === 3))) || x > 18){
            directionUnavailable.push("right")
        }


    }

    // interaction.push({type: "nopass", tile: "stone" })


    const interactionOutput = {
        directionUnavailable, interaction
    }


return interactionOutput
}