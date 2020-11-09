import {HealthBar} from "./healthBar";
import styled from "styled-components";
import React from "react";


export const PlayerBattlePanel = ({hitEnemy, myPlayer}) => {
    const { curHp, def, eq, lvl, maxHp, str } = myPlayer;

    //need to figure out how dmg should be calculated (prob randoms multiplied by lvl, str, eq modif etc)
    const normalAttackDmg = str;
    return (
        <PlayerContainer onClick={() => hitEnemy(normalAttackDmg)}>
            <HealthBar bottom={10} curHp={curHp} maxHp={maxHp} />
        </PlayerContainer>
    )
}

const PlayerContainer = styled.div`
  position: absolute;
  width: 660px;
  height: 220px;
  bottom: 20px;
  left: 50px;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid black;
  box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.75);
`;