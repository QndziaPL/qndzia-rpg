import styled from "styled-components";
import { GAME_HEIGHT, GAME_WIDTH } from "../consts/consts";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import bear_battle from "../assets/battleImages/bear_battle.png";
import thief_battle from "../assets/battleImages/thief_battle.png";
import wolf_battle from "../assets/battleImages/wolf_battle.png";
import bat_battle from "../assets/battleImages/bat_battle.png";


const BattleScreen = ({ close, enemyId }) => {
  const { enemiesById } = useSelector((p) => p.enemies);
  const playerData = useSelector((p) => p.player);

  const [myEnemy, setMyEnemy] = useState(enemiesById[enemyId]);
  const [myPlayer, setMyPlayer] = useState(playerData);
  const [canISetEnemy, setCanISetEnemy] = useState(true);


  function setBattleEnemyImage(){
    switch (myEnemy.name){
      case "bear":
        return bear_battle
      case "thief":
        return thief_battle
      case "wolf":
        return wolf_battle
      case "bat":
        return bat_battle
      default:
        return null
    }
  }
  if (canISetEnemy) {
    myEnemy.maxHp = myEnemy.stats.hp;
    myEnemy.img = setBattleEnemyImage();
    setMyEnemy(myEnemy);
    setCanISetEnemy(false);
  }
  console.log(myEnemy);
  const { curHp, def, eq, lvl, maxHp, str } = myPlayer;

  function hitEnemy(dmg) {
    myEnemy.stats.hp -= dmg;
    setMyEnemy(myEnemy);
  }

  return (
    <BattleScreenDiv>
      <MainEnemyContainer img={myEnemy.img}>
        <HealthBar curHp={myEnemy.stats.hp} maxHp={myEnemy.maxHp} />
        <EnemyImage src={myEnemy.img}/>
      </MainEnemyContainer>
      <EnemyInfoPanel>
        <h1 style={{ textAlign: "center" }}>{myEnemy.name}</h1>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 50 }}>
            <p>damage</p>
            <p>defense</p>
            <p>type</p>
            <br />
          </div>
          <div style={{ flex: 50, textAlign: "center", paddingRight: 20 }}>
            <p>{myEnemy.stats.dmg}</p>
            <p>{myEnemy.stats.def}</p>
            <p>{myEnemy.type}</p>
          </div>
        </div>
        <div style={{ backgroundColor: "black", width: 150, height: 1 }}></div>
        <p>{myEnemy.lore}</p>
      </EnemyInfoPanel>
      <PlayerContainer onClick={() => hitEnemy(1)}>
        <HealthBar bottom={10} curHp={curHp} maxHp={maxHp} />
      </PlayerContainer>

      <CloseButton onClick={close}>x</CloseButton>
    </BattleScreenDiv>
  );
};

const HealthBar = ({ maxHp, curHp, bottom }) => {
  const barWidth = (curHp / maxHp) * 100;
  return (
    <HealthBarContainer bottom={bottom}>
      <ActualHealthBar barWidth={barWidth}>
        {curHp + " / " + maxHp}&nbsp;&nbsp;
      </ActualHealthBar>
    </HealthBarContainer>
  );
};

const EnemyImage = styled.img`
position: absolute;

`
const ActualHealthBar = styled.div`
  text-align: right;
  width: ${(props) => props.barWidth}%;
  background-color: red;
  border-radius: 10px;
`;
const HealthBarContainer = styled.div`
  position: absolute;
  margin: 10px 10%;
  height: 20px;
  width: 80%;
  border: 1px solid black;
  border-radius: 10px;
  bottom: ${(props) => props.bottom}px;
`;

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

const EnemyInfoPanel = styled.div`
  position: absolute;
  width: 200px;
  height: 350px;
  top: 40px;
  right: 30px;
  background-color: #ffffff;
  border: 1px solid black;
  border-radius: 20px;
  padding-left: 20px;
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
