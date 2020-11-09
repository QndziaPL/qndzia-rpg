import styled from "styled-components";
import { GAME_HEIGHT, GAME_WIDTH } from "../consts/consts";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bear_battle from "../assets/battleImages/bear_battle.png";
import thief_battle from "../assets/battleImages/thief_battle.png";
import wolf_battle from "../assets/battleImages/wolf_battle.png";
import bat_battle from "../assets/battleImages/bat_battle.png";
import { setCurrentEnemy } from "../redux/actions";
import { HealthBar } from "../ui/components/healthBar";
import { EnemyInfoPanel } from "../ui/components/enemyInfoPanel";
import { PlayerBattlePanel } from "../ui/components/playerBattlePanel";
import { EnemyBattlePhotoPanel } from "../ui/components/enemyBattlePhotoPanel";

const BattleScreen = ({ close, enemyId, dispatch }) => {
  // const dispatch = useDispatch;

  const { enemiesById } = useSelector((p) => p.enemies);
  const r_playerData = useSelector((p) => p.player);

  const [myEnemy, setMyEnemy] = useState(enemiesById[enemyId]);
  const [myPlayer, setMyPlayer] = useState(r_playerData);
  const [canISetEnemy, setCanISetEnemy] = useState(true);
  const [myTurn, setMyTurn] = useState(true);

  function setBattleEnemyImage() {
    switch (myEnemy.name) {
      case "bear":
        return bear_battle;
      case "thief":
        return thief_battle;
      case "wolf":
        return wolf_battle;
      case "bat":
        return bat_battle;
      default:
        return null;
    }
  }
  if (canISetEnemy) {
    myEnemy.maxHp = myEnemy.stats.hp;
    myEnemy.img = setBattleEnemyImage();
    setMyEnemy(myEnemy);
    setCanISetEnemy(false);
  }
  const { curHp, def, eq, lvl, maxHp, str } = myPlayer;

  function hitEnemy(dmg) {
    myEnemy.stats.hp -= dmg;
    setMyEnemy(myEnemy);
  }
  //updates enemy in store
  dispatch(setCurrentEnemy(myEnemy));

  return (
    <BattleScreenDiv>
      <EnemyBattlePhotoPanel myEnemy={myEnemy} />

      <EnemyInfoPanel myEnemy={myEnemy} />
      <PlayerBattlePanel hitEnemy={hitEnemy} myPlayer={myPlayer} />

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
  color: white;
`;

const BattleScreenDiv = styled.div`
  width: ${GAME_WIDTH}px;
  height: ${GAME_HEIGHT}px;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #b7b7b7;
  z-index: 10;
`;

export default BattleScreen;
