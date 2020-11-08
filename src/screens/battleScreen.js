import styled from "styled-components";
import {GAME_HEIGHT, GAME_WIDTH} from "../consts/consts";
import React from "react";

const BattleScreen = ({ close }) => {
    return (
        <BattleScreenDiv>
            <CloseButton onClick={close}>x</CloseButton>
        </BattleScreenDiv>
    );
};
const CloseButton = styled.div`
  position: absolute;
  font-size: 50px;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
`;

const BattleScreenDiv = styled.div`
  width: ${GAME_WIDTH}px;
  height: ${GAME_HEIGHT}px;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #516e9d;
  z-index: 10;
`;

export default BattleScreen;