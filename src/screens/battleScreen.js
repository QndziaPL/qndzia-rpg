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
import ancientFont from "../fonts/AncientModernTales.ttf"

const BattleScreen = ({ close, enemyId, dispatch }) => {
  // const dispatch = useDispatch;

  const { enemiesById } = useSelector((p) => p.enemies);
  const r_playerData = useSelector((p) => p.player);

  const [myEnemy, setMyEnemy] = useState(enemiesById[enemyId]);
  const [myPlayer, setMyPlayer] = useState(r_playerData);
  const [victory, setVictory] = useState(false);
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

  useEffect(() => {
    if (myEnemy.stats.hp < 1) {
      setVictory(true);
    }
  });

  //updates enemy in store
  dispatch(setCurrentEnemy(myEnemy));

  return (
    <div>
      <VictoryScreen victory={victory} />

      <BattleScreenDiv blur={victory ? 5 : 0}>
        <EnemyBattlePhotoPanel myEnemy={myEnemy} />

        <EnemyInfoPanel myEnemy={myEnemy} />
        <PlayerBattlePanel hitEnemy={hitEnemy} myPlayer={myPlayer} />

        <CloseButton onClick={close}>close</CloseButton>
      </BattleScreenDiv>
    </div>
  );
};

const VictoryScreen = ({ victory }) => {
  const hidden = { width: 0, height: 0 };
  const visible = { width: 70, height: 70 };

  return (
    <VictoryScreenContainer
      visible={victory ? visible : hidden}
      className={"victoryScreenContainer"}
    >
      <VictoryTitle opacity={victory}>VICTORY</VictoryTitle>
      <VictoryInfo></VictoryInfo>
    </VictoryScreenContainer>
  );
};
const VictoryTitle = styled.div`
  text-align: center;
  font-size: 50px;
  opacity: ${props => props.opacity ? 1 : 0};
  transition-duration: 1s;
  margin-top: 20px;
`;
const VictoryInfo = styled.div`
  width: 90%;
  height: 70%;
  text-align: center;
  margin: 25px auto;
  background-color: blue;
`;

const VictoryScreenContainer = styled.div`
  position: absolute;
  top: ${(props) => (100 - props.visible.height) / 2}%;
  left: ${(props) => (100 - props.visible.width) / 2}%;

  width: ${(props) => props.visible.width}%;
  height: ${(props) => props.visible.height}%;
  background: white;
  //opacity: 0.7;
  z-index: 100;
  transition-duration: 1s;
`;

const CloseButton = styled.div`
  position: absolute;
  font-size: 50px;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  color: white;
  text-shadow: 5px 5px 10px black;
  &:hover{
  transform: scale(1.1);
  }
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
  transition-duration: 2s;
  filter: blur(${(props) => props.blur}px);
`;

export default BattleScreen;
