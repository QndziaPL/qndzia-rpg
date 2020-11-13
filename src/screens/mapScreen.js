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
  fullVision,
    bloodyMap,
   refreshApp
}) => {
  return (
    <MapScreenDiv key={key} bloodyMap={bloodyMap}>
      <Map map={map}>
        <Player
          playerPosition={playerPosition}
          enterBattleAnimation={enterBattleAnimation}
          currentVision={currentVision}
          fullVision={fullVision}
        />
        <Enemies />
      </Map>
      <PlayerInfoPanel refreshApp={refreshApp}/>
    </MapScreenDiv>
  );
};

const MapScreenDiv = styled.div`
  display: flex;
  filter: blur(${props=>props.bloodyMap ? "5px" : 0});
  transition-duration: 1s;
`;

export default MapScreen;
