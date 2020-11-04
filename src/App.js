import React, {useEffect, useState} from "react";
import Player from "./player/player";
import Map from "./maps/component/map";
import {FirstMap} from "./maps/firstMap/firstMap";
import {ENEMY_BAT} from "./enemies/bat";
import {ENEMY_WOLF} from "./enemies/wolf";
import {Enemies, Enemy} from "./enemies/enemy";
import {PlayerInfoPanel} from "./ui/components/playerInfoPanel";
import styled from "styled-components";
import {MAP_WIDTH, PLAYER_INFO_PANEL_WIDTH} from "./consts/consts";
import {RandomNumberBetween} from "./helpers/randomNumberBetween";
import {SecondMap} from "./maps/secondMap/secondMap";
import {GenerateEnemyMap} from "./helpers/generateEnemyMap";
import {CompileAll} from "./helpers/compileAllLayersMapByID";
import {CreateIdForEnemies} from "./helpers/createIDforEnemies";


export const AppContext = React.createContext({});
export const EnemiesContext = React.createContext({});

const App = () => {


    const [playerLevel, setPlayerLevel] = useState(1);
    const [playerMaxHp, setPlayerMaxHp] = useState(20);
    const [playerCurrentHp, setPlayerCurrentHp] = useState(playerMaxHp);
    const [playerStrength, setPlayerStrength] = useState(3);
    const [playerDefence, setPlayerDefence] = useState(0);

    const [playerPosition, setPlayerPosition] = useState({x: 10, y: 10});




    const activeTerrainMap = SecondMap;


    const activeEnemiesMap = {
        ENEMY_BAT,ENEMY_WOLF
    }






    const store = {
        playerLevel: {get: playerLevel, set: setPlayerLevel},
        playerMaxHp: {get: playerMaxHp, set: setPlayerMaxHp},
        playerCurrentHp: {get: playerCurrentHp, set: setPlayerCurrentHp},
        playerStrength: {get: playerStrength, set: setPlayerStrength},
        playerDefence: {get: playerDefence, set: setPlayerDefence},

        playerPosition: {get: playerPosition, set: setPlayerPosition},

    }

    const enemiesStore = {
        // enemiesMap: {get: activeEnemiesMap, set:}
    }

    useEffect(() => {

        checkIfMapInteraction()
    }, [playerPosition]);


    const checkIfMapInteraction = () => {

    }

    const [letGenerateEnemies, setLetGenerateEnemies] = useState(true);
    const [generatedEnemyMapState, setGeneratedEnemyMap] = useState(null);
    const [usedEnemyPositions, setUsedEnemyPositions] = useState(null);


    let enemyMap = [];
    if (letGenerateEnemies){
        enemyMap = GenerateEnemyMap({amount: 12});
        setGeneratedEnemyMap(enemyMap.generatedEnemyMap)
        setUsedEnemyPositions(enemyMap.usedPositions)
        setLetGenerateEnemies(false)
    }


    console.log(usedEnemyPositions)
    console.log(generatedEnemyMapState)
    usedEnemyPositions && CreateIdForEnemies(usedEnemyPositions)




    // const testListOfEnemies =[
    //     ENEMY_BAT({x: 1,y:2}),
    //     ENEMY_WOLF({x: 17, y: 12})
    // ]



    /**
     * next to do !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     */
    // console.log(CompileAll({terrain: activeTerrainMap, enemies:usedEnemyPositions, treasures: []}))



    return (
        <AppContext.Provider value={store}>
            <EnemiesContext.Provider value={enemiesStore}>
                <GameContainer className="gameContainer">

                <Map map={activeTerrainMap}>
                    <Player/>
                    {console.log(generatedEnemyMapState)}
                    <Enemies listOfEnemies={generatedEnemyMapState}/>
                </Map>
                    <PlayerInfoPanel/>

                </GameContainer>
            </EnemiesContext.Provider>


        </AppContext.Provider>

    );
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
