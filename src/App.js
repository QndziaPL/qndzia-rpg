import React, { useEffect, useState } from "react";
import Player from "./player/player";
import Map from "./maps/component/map";
import { Enemies, Enemy } from "./enemies/enemy";
import { PlayerInfoPanel } from "./ui/components/playerInfoPanel";
import styled from "styled-components";
import {
  MAP_WIDTH,
  PLAYER_INFO_PANEL_WIDTH,
  GAME_HEIGHT,
  GAME_WIDTH,
} from "./consts/consts";
import { SecondMap } from "./maps/secondMap/secondMap";
import { GenerateEnemyMap } from "./helpers/generateEnemyMap";
import { CompileAll } from "./helpers/compileAllLayersMapByID";
import { generateId } from "./helpers/createIDforEnemies";
import { useDispatch, useSelector } from "react-redux";
import { setEnemies, setInteractions } from "./redux/actions";
import { checkInteraction } from "./helpers/checkInteraction";
import { Switch } from "react-router-dom";
import Router from "react-router-dom";
import { Route } from "react-router-dom";
import BattleScreen from "./screens/battleScreen";

const MAP_SCREEN = 0;
const BATTLE_SCREEN = 1;

const App = () => {
  const dispatch = useDispatch();
  const enemies = useSelector((p) => p.enemies);
  const map = useSelector((p) => p.mapIDs);
  const playerData = useSelector((p) => p.player);
  const { interaction } = useSelector((p) => p.interactions);
  // const interactionData =

  const [refresh, setRefresh] = useState(2);
  function refreshFunction() {
    setRefresh((prevState) => prevState + 1);
  }

  const [letGenerateEnemies, setLetGenerateEnemies] = useState(true);
  const [activeTerrainMap, setActiveTerrainMap] = useState(SecondMap);

  const [gamePhase, setGamePhase] = useState(MAP_SCREEN);

  /** do dorobienia treasures, wjebanie ich do compileAll i nareszcie mechanika do sprawdzania interakcji !!!!!! */

  if (letGenerateEnemies) {
    setLetGenerateEnemies(false);
    let enemyMap;
    if (Object.keys(enemies).length === 0 && enemies.constructor === Object) {
      enemyMap = GenerateEnemyMap({ amount: 15, terrainMap: activeTerrainMap });
    } else {
      enemyMap = enemies;
    }
    dispatch(setEnemies(enemyMap));
    saveToLocalStorage();
  }

  function saveToLocalStorage() {
    localStorage.setItem("enemies", JSON.stringify(enemies));
  }

  // na razie przesyłam jako mapę stan komponentu
  const compiledIDs = CompileAll(enemies, activeTerrainMap);

  const playerPositionId = generateId(
    playerData.position.x,
    playerData.position.y
  );

  useEffect(() => {
    dispatch(
      setInteractions(
        checkInteraction(compiledIDs, playerPositionId, playerData.position)
      )
    );
  }, [playerPositionId]);

  useEffect(() => {
    if (interaction) {
      if (interaction.type === "battle") {
        setGamePhase(BATTLE_SCREEN);
      }
    }
  }, [interaction]);

  const closeBattle = () => {
    setGamePhase(MAP_SCREEN);
  };

  console.log("log game phase: ", gamePhase);

  // useEffect(()=>console.log("tu cos biedzei w sprawie pdrzucania nowych ekranow"),[gamePhase]);

  return (
    <GameContainer className="gameContainer" onClick={refreshFunction}>
      <MapScreen map={activeTerrainMap} playerPosition={playerData.position} />
      {gamePhase === 1 && <BattleScreen close={closeBattle} />}
    </GameContainer>
  );
};

export default App;



const MapScreen = ({ map, playerPosition, key }) => {
  return (
    <MapScreenDiv key={key}>
      <Map map={map}>
        <Player playerPosition={playerPosition} />
        <Enemies />
      </Map>
      <PlayerInfoPanel />
    </MapScreenDiv>
  );
};

/** styled components */

const MapScreenDiv = styled.div`
  display: flex;
  :before {
    position: absolute;
    font-size: 30px;

    top: 0;
    left: 0;
    content: "${(props) => props.refreshKey}";
    opacity: 0;
  }
`;

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
