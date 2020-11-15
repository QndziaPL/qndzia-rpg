import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  MAP_WIDTH,
  PLAYER_INFO_PANEL_WIDTH,
} from "./consts/consts";
import { SecondMap } from "./maps/secondMap/secondMap";
import { GenerateEnemyMap } from "./helpers/generateEnemyMap";
import { CompileAll } from "./helpers/compileAllLayersMapByID";
import { generateId } from "./helpers/createIDforEnemies";
import { useDispatch, useSelector } from "react-redux";
import {
  setEnemies,
  setGameOn,
  setInteractions,
  setPlayer,
  setUtils,
} from "./redux/actions";
import { checkInteraction } from "./helpers/checkInteraction";
import BattleScreen from "./screens/battleScreen";
import MapScreen from "./screens/mapScreen";

const MAP_SCREEN = 0;
const BATTLE_SCREEN = 1;

const App = ({ enemyNumber, setStartGame }) => {
  const dispatch = useDispatch();

  // SOME MECHANICS TO FIRST SET MAP AND PLAYER SPAWN
  // THEN UPDATE PLAYER MODEL IN STORE
  const [activeTerrainMap, setActiveTerrainMap] = useState(SecondMap);
  const r_playerData = useSelector((p) => p.player);

  // it will depend on previous map
  if (!r_playerData.alreadySpawned) {
    const spawnPoint = 4;
    const playerSpawnPoint = activeTerrainMap.spawns[spawnPoint];
    let updateSpawnsPlayer = r_playerData;
    updateSpawnsPlayer.position = playerSpawnPoint;
    updateSpawnsPlayer.alreadySpawned = true;
    dispatch(setPlayer(updateSpawnsPlayer));
  }

  const r_enemies = useSelector((p) => p.enemies);
  const r_map = useSelector((p) => p.mapIDs);
  const { interaction: r_interactionData } = useSelector((p) => p.interactions);
  const r_currentEnemyData = useSelector((p) => p.currentEnemy);

  const [refresh, setRefresh] = useState(2);
  function refreshFunction() {
    setRefresh((prevState) => prevState + 1);
  }

  const [letGenerateEnemies, setLetGenerateEnemies] = useState(true);

  const [gamePhase, setGamePhase] = useState(MAP_SCREEN);
  const [currentEnemy, setCurrentEnemy] = useState(null);

  const [enteringBattle, setEnteringBattle] = useState(false);

  // i need to do mechanism for passing player spawn to another map
  const [playerSpawn, setPlayerSpawn] = useState(4);

  /** do dorobienia treasures, wjebanie ich do compileAll i nareszcie mechanika do sprawdzania interakcji !!!!!! */

  if (letGenerateEnemies) {
    setLetGenerateEnemies(false);
    let enemyMap;
    if (
      Object.keys(r_enemies).length === 0 &&
      r_enemies.constructor === Object
    ) {
      enemyMap = GenerateEnemyMap({
        enemyNumber,
        activeTerrainMap,
        playerSpawn,
      });
      localStorage.setItem("enemies", JSON.stringify(enemyMap));
    } else {
      enemyMap = r_enemies;
    }
    // saveToLocalStorage();
    dispatch(setEnemies(enemyMap));
  }

  function saveToLocalStorage() {
    localStorage.setItem("enemies", JSON.stringify(r_enemies));
  }

  // na razie przesyłam jako mapę stan komponentu
  const compiledIDs = CompileAll(r_enemies, activeTerrainMap.map);
  const playerPositionId = generateId(
    r_playerData.position.x,
    r_playerData.position.y
  );

  useEffect(() => {
    dispatch(
      setInteractions(
        checkInteraction(compiledIDs, playerPositionId, r_playerData.position)
      )
    );
  }, [playerPositionId]);

  const [beginBattle, setBeginBattle] = useState(false);

  useEffect(() => {
    if (r_interactionData) {
      if (r_interactionData.type === "battle") {
        dispatch(setUtils({ blockedMovement: true }));
        setGamePhase(BATTLE_SCREEN);
        setCurrentEnemy(r_interactionData.id);
        if (!beginBattle) {
          setEnteringBattle(true);
          setTimeout(() => {
            setBeginBattle(true);
            setEnteringBattle(false);
            dispatch(setUtils({ blockedMovement: false }));
          }, 1500);
        }
      }
    }
  }, [r_interactionData]);

  const closeBattleScreen = () => {
    setGamePhase(MAP_SCREEN);
    setBeginBattle(false);
  };

  return (
    <div onClick={refreshFunction}>
      <MapScreen
        map={activeTerrainMap.map}
        playerPosition={r_playerData.position}
        enterBattleAnimation={gamePhase === BATTLE_SCREEN}
        currentVision={r_playerData.vision}
        fullVision={r_playerData.fullVision}
        bloodyMap={enteringBattle}
        refreshApp={refreshFunction}
      />
      {beginBattle && (
        <BattleScreen
          close={closeBattleScreen}
          enemyId={currentEnemy}
          dispatch={dispatch}
          setStartGame={setStartGame}
        />
      )}
    </div>
  );
};

const GameContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  position: relative;
  width: ${MAP_WIDTH + PLAYER_INFO_PANEL_WIDTH}px;
  margin: ${(window.innerHeight - 640) / 2}px auto;
  border: 2px solid #ffffff;
  @media (max-width: 840px) {
    margin: 0;
  }
`;

export default App;
