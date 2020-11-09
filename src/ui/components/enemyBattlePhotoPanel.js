import { HealthBar } from "./healthBar";
import styled from "styled-components";
import React from "react";

export const EnemyBattlePhotoPanel = ({ myEnemy }) => {
  return (
    <MainEnemyContainer img={myEnemy.img}>
      <HealthBar curHp={myEnemy.stats.hp} maxHp={myEnemy.maxHp} />
      <EnemyImage src={myEnemy.img} />
    </MainEnemyContainer>
  );
};

const EnemyImage = styled.img`
  position: absolute;
`;

const MainEnemyContainer = styled.div`
  position: absolute;
  width: 600px;
  height: 400px;
  top: 10px;
  left: 80px;
  //background-color: white;
  //border: 1px solid black;
`;
