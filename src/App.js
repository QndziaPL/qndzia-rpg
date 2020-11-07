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
import {CreateIdForEnemies, generateId} from "./helpers/createIDforEnemies";
import {useDispatch, useSelector} from "react-redux";
import {setEnemies} from "./redux/actions";
import {checkInteraction} from "./helpers/checkInteraction";
import {MapIDsToMap} from "./maps/component/mapIDsToMap";


export const AppContext = React.createContext({});



const App = () => {
    const dispatch = useDispatch();
    const enemies = useSelector(p => p.enemies);
    const map = useSelector(p => p.mapIDs);
    const playerData = useSelector(p => p.player);


    const [refresh, setRefresh]=useState(0);
    const refreshFunction = () => {
        setRefresh(refresh + 1)
    }

    const [interaction, setInteraction] = useState(null)



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



    /** do dorobienia treasures, wjebanie ich do compileAll i nareszcie mechanika do sprawdzania interakcji !!!!!! */


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
        let enemyMap;
        if (Object.keys(enemies).length === 0 && enemies.constructor === Object){
            enemyMap = GenerateEnemyMap({amount: 50, terrainMap: activeTerrainMap});

        }else {
            enemyMap = enemies
        }
        setGeneratedEnemyMap(enemyMap)
        console.log(enemyMap)
        dispatch(setEnemies(enemyMap))
        saveToLocalStorage()

    }




    // useEffect(()=> localStorage.setItem('player',JSON.stringify(playerData)));

    function saveToLocalStorage(){
        localStorage.setItem('enemies',JSON.stringify(enemies));
    }


    /**
     * next to do !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     */

    const compiledIDs = CompileAll(enemies, map)
    const playerPositionId = generateId(playerData.position.x, playerData.position.y)


    useEffect(() => {
       setInteraction(checkInteraction(compiledIDs, playerPositionId, playerData.position))
    }, [playerPositionId]);
    console.log("useeffect trigger",interaction)


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
