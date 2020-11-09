import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MAP_WIDTH, PLAYER_INFO_PANEL_WIDTH } from "./consts/consts";
import { SecondMap } from "./maps/secondMap/secondMap";
import { GenerateEnemyMap } from "./helpers/generateEnemyMap";
import { CompileAll } from "./helpers/compileAllLayersMapByID";
import { generateId } from "./helpers/createIDforEnemies";
import { useDispatch, useSelector } from "react-redux";
import { setEnemies, setInteractions } from "./redux/actions";
import { checkInteraction } from "./helpers/checkInteraction";
import BattleScreen from "./screens/battleScreen";
import MapScreen from "./screens/mapScreen";

const MAP_SCREEN = 0;
const BATTLE_SCREEN = 1;

const App = () => {
  const dispatch = useDispatch();
  const r_enemies = useSelector((p) => p.enemies);
  const r_map = useSelector((p) => p.mapIDs);
  const r_playerData = useSelector((p) => p.player);
  const { interaction: r_interactionData } = useSelector((p) => p.interactions);
  const r_currentEnemyData = useSelector((p) => p.currentEnemy);
  // const visionRadiusModifier =
  // const interactionData =

  const [refresh, setRefresh] = useState(2);
  function refreshFunction() {
    setRefresh((prevState) => prevState + 1);
  }

  const [letGenerateEnemies, setLetGenerateEnemies] = useState(true);
  const [activeTerrainMap, setActiveTerrainMap] = useState(SecondMap);

  const [gamePhase, setGamePhase] = useState(MAP_SCREEN);
  const [currentEnemy, setCurrentEnemy] = useState(null);

  /** do dorobienia treasures, wjebanie ich do compileAll i nareszcie mechanika do sprawdzania interakcji !!!!!! */

  if (letGenerateEnemies) {
    setLetGenerateEnemies(false);
    let enemyMap;
    if (
      Object.keys(r_enemies).length === 0 &&
      r_enemies.constructor === Object
    ) {
      enemyMap = GenerateEnemyMap({ amount: 15, terrainMap: activeTerrainMap });
    } else {
      enemyMap = r_enemies;
    }
    dispatch(setEnemies(enemyMap));
    saveToLocalStorage();
  }

  function saveToLocalStorage() {
    localStorage.setItem("enemies", JSON.stringify(r_enemies));
  }

  // na razie przesyłam jako mapę stan komponentu
  const compiledIDs = CompileAll(r_enemies, activeTerrainMap);

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
        setGamePhase(BATTLE_SCREEN);
        setCurrentEnemy(r_interactionData.id);
        if (!beginBattle) {
          setTimeout(() => {
            setBeginBattle(true);
          }, 1000);
        }
      }
    }
  }, [r_interactionData]);

  const closeBattleScreen = () => {
    setGamePhase(MAP_SCREEN);
    setBeginBattle(false);
  };

  return (
    <GameContainer className="gameContainer" onClick={refreshFunction}>
      <MapScreen
        map={activeTerrainMap}
        playerPosition={r_playerData.position}
        enterBattleAnimation={gamePhase === BATTLE_SCREEN}
        currentVision={r_playerData.vision}
      />
      {beginBattle && (
        <BattleScreen close={closeBattleScreen} enemyId={currentEnemy} />
      )}
    </GameContainer>
  );
};

const GameContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  position: relative;
  width: ${MAP_WIDTH + PLAYER_INFO_PANEL_WIDTH}px;
  margin: ${(window.innerHeight - 640) / 2}px auto;
  @media (max-width: 840px) {
    transform: scale(0.5);
    margin: 0;
  }
`;

export default App;
