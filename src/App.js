import React, {useContext, useEffect, useState} from "react";
import Player from "./player/player";
import Map from "./maps/component/map";
import {Enemies, Enemy} from "./enemies/enemy";
import {PlayerInfoPanel} from "./ui/components/playerInfoPanel";
import styled from "styled-components";
import {MAP_WIDTH, PLAYER_INFO_PANEL_WIDTH} from "./consts/consts";
import {SecondMap} from "./maps/secondMap/secondMap";
import {GenerateEnemyMap} from "./helpers/generateEnemyMap";
import {CompileAll} from "./helpers/compileAllLayersMapByID";
import {CreateIdForEnemies} from "./helpers/createIDforEnemies";


export const AppContext = React.createContext({});



const App = () => {

    const [refresh, setRefresh]=useState(0);
    const refreshFunction = () => {
        setRefresh(refresh + 1)
    }

    const [playerLevel, setPlayerLevel] = useState(1);
    const [playerMaxHp, setPlayerMaxHp] = useState(20);
    const [playerCurrentHp, setPlayerCurrentHp] = useState(playerMaxHp);
    const [playerStrength, setPlayerStrength] = useState(3);
    const [playerDefence, setPlayerDefence] = useState(0);

    const [playerPosition, setPlayerPosition] = useState({x: 10, y: 10});

    const [letGenerateEnemies, setLetGenerateEnemies] = useState(true);
    const [generatedEnemyMap, setGeneratedEnemyMap] = useState(null);


    const [activeTerrainMap, setActiveTerrainMap] = useState(SecondMap);


    const store = {
        playerLevel: {get: playerLevel, set: setPlayerLevel},
        playerMaxHp: {get: playerMaxHp, set: setPlayerMaxHp},
        playerCurrentHp: {get: playerCurrentHp, set: setPlayerCurrentHp},
        playerStrength: {get: playerStrength, set: setPlayerStrength},
        playerDefence: {get: playerDefence, set: setPlayerDefence},

        playerPosition: {get: playerPosition, set: setPlayerPosition},

        enemyMap: {get: generatedEnemyMap, set: setGeneratedEnemyMap}

    }



    const mapStore = {
        activeTerrain: {get: activeTerrainMap, set: setActiveTerrainMap}
    }




    // useEffect(() => {
    //
    //     checkIfMapInteraction()
    // }, [playerPosition]);
    //
    //
    // const checkIfMapInteraction = () => {
    //
    // }


    if (letGenerateEnemies) {
        setLetGenerateEnemies(false)
        let enemyMap = GenerateEnemyMap({amount: 15});
        setGeneratedEnemyMap(enemyMap)

    }

    generatedEnemyMap && CreateIdForEnemies(generatedEnemyMap.usedPositions)


    // const testListOfEnemies =[
    //     ENEMY_BAT({x: 1,y:2}),
    //     ENEMY_WOLF({x: 17, y: 12})
    // ]


    /**
     * next to do !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     */

    /**
     * i have to refacotor it to hold this above the rest of the app
     */
    // CompileAll(context)


    if (generatedEnemyMap) return (
        <AppContext.Provider value={store}>


                    <GameContainer className="gameContainer" onClick={refreshFunction}>
                        <Map map={activeTerrainMap}>
                            <Player/>
                            <Enemies/>
                        </Map>
                        <PlayerInfoPanel/>
                    </GameContainer>


        </AppContext.Provider>

    );
    else return null
}

export default App;


const GameContainer = styled.div`
box-sizing: border-box;
display: flex;
width: ${MAP_WIDTH + PLAYER_INFO_PANEL_WIDTH}px;
//height: 640px;
margin: ${(window.innerHeight - 640) / 2}px auto;
@media(max-width: 840px){
transform: scale(0.5);
margin: 0;
}
`
