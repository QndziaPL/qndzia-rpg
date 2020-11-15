import styled from "styled-components";
import { GAME_HEIGHT, GAME_WIDTH } from "../consts/consts";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import bear_battle from "../assets/battleImages/bear_battle.png";
import thief_battle from "../assets/battleImages/thief_battle.png";
import wolf_battle from "../assets/battleImages/wolf_battle.png";
import bat_battle from "../assets/battleImages/bat_battle.png";
import anaconda_battle from "../assets/battleImages/anaconda_battle.png";
import {
  setCurrentEnemy,
  setEnemies,
  setGameOn,
  setPlayer,
} from "../redux/actions";
import { EnemyInfoPanel } from "../ui/components/enemyInfoPanel";
import { PlayerBattlePanel } from "../ui/components/playerBattlePanel";
import { EnemyBattlePhotoPanel } from "../ui/components/enemyBattlePhotoPanel";
import {RandomNumberBetween} from "../helpers/randomNumberBetween";

const BattleScreen = ({ close, enemyId, dispatch, setStartGame }) => {
  const { enemiesById } = useSelector((p) => p.enemies);
  const r_enemies = useSelector((p) => p.enemies);
  const r_playerData = useSelector((p) => p.player);

  const [myEnemy, setMyEnemy] = useState(enemiesById[enemyId]);
  const [myPlayer, setMyPlayer] = useState(r_playerData);
  const [victory, setVictory] = useState(false);
  const [canISetEnemy, setCanISetEnemy] = useState(true);
  const [myTurn, setMyTurn] = useState(true);
  const [isEnemyAttacking, setIsEnemyAttacking] = useState(false);
  const [goingToFlee, setGoingToFlee ] = useState(false);
  const [expFromEnemy, setExpFromEnemy] = useState(0);

  /** saving list without defeated enemy */
  function deleteDefeatedEnemy() {
    const copy1 = enemiesById;
    delete copy1[enemyId];
    const { x, y } = myEnemy.position;
    const index = r_enemies.usedPositions.findIndex(
      (value) => value.randomX === x && value.randomY === y
    );
    const copy2 = r_enemies.usedPositions;
    copy2.splice(index, 1);
    const copy3 = r_enemies.enemyMap;
    copy3.splice(index, 1);
    const updatedEnemies = {
      enemiesById: copy1,
      enemyMap: copy3,
      usedPositions: copy2,
    };

    dispatch(setEnemies(updatedEnemies));
    localStorage.setItem("enemies", JSON.stringify(updatedEnemies));
  }

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
      case "anaconda":
        return anaconda_battle;
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

  function hitEnemy(dmg) {
    myEnemy.stats.hp -= dmg;
    setMyEnemy(myEnemy);
    setMyTurn(false);
  }

  function block() {
    myPlayer.isBlocking = true;
    setMyPlayer(myPlayer);
    setMyTurn(false);
  }

  function getHitOnFlee(){
    setGoingToFlee(true)
    setMyTurn(false)
  }

  function enemyStrikes(dmg) {
    console.log("enemy strikes");
    setIsEnemyAttacking(true);
    myPlayer.curHp -= myPlayer.isBlocking ? dmg / 2 : dmg;
    setMyPlayer(myPlayer);
  }

  function enemyAction() {
    console.log("enemy action");
    let enemyStrikeDamage = RandomNumberBetween(myEnemy.stats.dmg.highest, myEnemy.stats.dmg.lowest);
    setTimeout(() => {
      enemyStrikes(enemyStrikeDamage);
      setTimeout(() => {
        setIsEnemyAttacking(false);
        setMyTurn(true);
      }, 500);
    }, 300);
    //TODO tutaj będzie mechanika wyboru zagrania przeciwnika, na razie defaulowo leci attack
  }

  useEffect(()=>{
    if (myTurn && goingToFlee){
      setTimeout(()=>{
        alert("you took some damage and fled like a coward")
        close()
      },300)
    }
  },[myTurn])

  useEffect(() => {
    if (myPlayer.curHp < 1) {
      console.log("reset wszystkiego");

      //TODO: coś tu ogarnąć jakoś logicznie aby miało ręce i nogi, na pewno ekran porażki dorobić
      localStorage.clear();
      window.location.reload(false);
      alert("Uh... that was... terrible\ngame over, bro...");

      // setTimeout(()=>{
      //   localStorage.clear()
      //   window.location.reload(false);
      //
      // }, 3000)
    }
    dispatch(setPlayer(myPlayer));
  });

  function givePlayerBattleTreasures(){
    // TODO: dodać mechanizm golda, lootów itd
    const exp = RandomNumberBetween(myEnemy.exp.highest, myEnemy.exp.lowest);
    setExpFromEnemy(exp)
    console.log(exp)
    myPlayer.exp += exp;
    setMyPlayer(myPlayer);
  }



  // useEffect(() => {
  //   if (myEnemy.stats.hp < 1) {
  //   }
  //   dispatch(setCurrentEnemy(myEnemy));
  // }, [myEnemy.stats]);

  useEffect(() => {
    if (!myTurn) {
      if (myEnemy.stats.hp > 0) {
        enemyAction();
      } else {
        setVictory(true);
        givePlayerBattleTreasures()
        setMyTurn(true);
      }
    } else {
      myPlayer.isBlocking = false;
      setMyPlayer(myPlayer);
      setTimeout(() => {}, 1000);
    }
  }, [myTurn]);

  function whenDisablePointerEvents() {
    return victory || !myTurn;
  }



  //TODO: !!! MUSZĘ WYkąbinować w jaki sposób najlepiej, kiedy i gdize przekazywać ilosć expa przeciwnika z którym walczymy
  return (
    <div>
      <VictoryScreen
        victory={victory}
        close={close}
        deleteEnemy={deleteDefeatedEnemy}
      />
      <div
        style={{ pointerEvents: whenDisablePointerEvents() ? "none" : "auto" }}
      >
        <BattleScreenDiv blur={victory ? 5 : 0}>
          <EnemyBattlePhotoPanel
            myEnemy={myEnemy}
            isAttacking={isEnemyAttacking}
          />

          <EnemyInfoPanel myEnemy={myEnemy} />
          <PlayerBattlePanel
            hitEnemy={hitEnemy}
            block={block}
            myPlayer={myPlayer}
          />

          <CloseButton onClick={() =>
            getHitOnFlee()

          }>flee</CloseButton>
        </BattleScreenDiv>
      </div>
    </div>
  );
};

const VictoryScreen = ({ victory, close, deleteEnemy }) => {
  const hidden = { width: 70, height: 0 };
  const visible = { width: 70, height: 70 };

  return (
    <VictoryScreenContainer
      visible={victory ? visible : hidden}
      className={"victoryScreenContainer"}
    >
      <div style={{ display: victory ? "block" : "none" }}>
        <VictoryTitle opacity={victory}>VICTORY</VictoryTitle>
        <VictoryInfo>werwerwerewr</VictoryInfo>
        <CloseButton
          onClick={() => {
            close();
            deleteEnemy();
          }}
        >
          close
        </CloseButton>
      </div>
    </VictoryScreenContainer>
  );
};

const VictoryTitle = styled.div`
  text-align: center;
  font-size: 50px;
  opacity: ${(props) => (props.opacity ? 1 : 0)};
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
  &:hover {
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
