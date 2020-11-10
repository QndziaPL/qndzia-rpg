import Map from "../maps/component/map";
import Player from "../player/player";
import { Enemies } from "../enemies/enemy";
import { PlayerInfoPanel } from "../ui/components/playerInfoPanel";
import styled from "styled-components";
import React from "react";

const MapScreen = ({
  map,
  playerPosition,
  key,
  enterBattleAnimation,
  currentVision,
    fullVision
}) => {
  return (
    <MapScreenDiv key={key}>
      <Map map={map}>
        <Player
          playerPosition={playerPosition}
          enterBattleAnimation={enterBattleAnimation}
          currentVision={currentVision}
          fullVision={fullVision}
        />
        <Enemies />
      </Map>
      <PlayerInfoPanel />
    </MapScreenDiv>
  );
};

const MapScreenDiv = styled.div`
  display: flex;
`;

export default MapScreen;
