import { HealthBar } from "./healthBar";
import styled from "styled-components";
import React from "react";

export const EnemyBattlePhotoPanel = ({ myEnemy, isAttacking }) => {
  return (
    <MainEnemyContainer img={myEnemy.img}>
      <HealthBar curHp={myEnemy.stats.hp} maxHp={myEnemy.maxHp} />
      <EnemyImage src={myEnemy.img} isAttacking={isAttacking} />
    </MainEnemyContainer>
  );
};

const EnemyImage = styled.img`
  position: absolute;
  transform: scale(${(props) => props.isAttacking && 1.3});
  transition-duration: 0.5s;
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
