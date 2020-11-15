import styled from "styled-components";
import React, {useEffect} from "react";
import { MAP_HEIGHT, PLAYER_INFO_PANEL_WIDTH } from "../../consts/consts";
import { useDispatch, useSelector } from "react-redux";
import { setPlayer } from "../../redux/actions";
import arrow from "../../assets/other/arrow.png";
import {ExperienceBar} from "./experienceBar";
import coins from "../../assets/other/coins.png"

export const PlayerInfoPanel = ({ blockedMovement, refreshApp }) => {
  const UP = "up";
  const DOWN = "down";
  const LEFT = "left";
  const RIGHT = "right";

  const r_playerData = useSelector((p) => p.player);
  // TODO: jazda
  const r_utils = useSelector((p) => p.utils);
  const { directionUnavailable } = useSelector((p) => p.interactions);
  const buttonsDisablingList = directionUnavailable ?? [];
  const dispatch = useDispatch();

  const movementKeysContainerSize = (PLAYER_INFO_PANEL_WIDTH * 2) / 3;
  const marginMovementKeysContainer =
    (PLAYER_INFO_PANEL_WIDTH - movementKeysContainerSize) / 2;

  const updatePositionToDispatch = (direction) => {

    // for now heals every time player moves
    healEveryStep()

    switch (direction) {
      case "up":
        r_playerData.position.y -= 1;
        return r_playerData;

      case "down":
        r_playerData.position.y += 1;
        return r_playerData;

      case "left":
        r_playerData.position.x -= 1;
        return r_playerData;

      case "right":
        r_playerData.position.x += 1;
        return r_playerData;

      default:
        return r_playerData;
    }
  };

  function saveToLocalStorage() {
    localStorage.setItem("player", JSON.stringify(r_playerData));
  }

  function clearDataAndReloadPage() {
    let clear = window.confirm(
      "You're going to reset WHOLE GAME\nAre you sure about that?"
    );
    if (clear) {
      localStorage.clear();
      window.location.reload(false);
    }
  }

  function changeVision(plusOrMinus) {
    if (plusOrMinus === "plus") {
      r_playerData.vision += 20;
      dispatch(setPlayer(r_playerData));
    } else {
      r_playerData.vision -= 20;
      dispatch(setPlayer(r_playerData));
    }
  }

  function triggerFullVisionChange() {
    r_playerData.fullVision = !r_playerData.fullVision;
    dispatch(setPlayer(r_playerData));
    saveToLocalStorage();
  }

  function lvlUp(){
    const remainingExp = r_playerData.exp - r_playerData.nextLvlExp;
    const previousNeededExp = r_playerData.nextLvlExp;
    r_playerData.lvl += 1;
    console.log(r_playerData)

    // na razie tylko!
    r_playerData.str += 1;
    r_playerData.maxHp += 5;
    r_playerData.vision += 10;
    r_playerData.nextLvlExp = Math.floor((previousNeededExp * 2) - (previousNeededExp / 3))
    r_playerData.exp = remainingExp;
    dispatch(setPlayer(r_playerData));
    console.log(r_playerData)
    refreshApp();
    // alert("You just gained new level!!!")
  }

  useEffect(() => {
    if (r_playerData.exp >= r_playerData.nextLvlExp){
      lvlUp();
    }
  },[r_playerData.exp])

function healEveryStep(){
  if (r_playerData.curHp < r_playerData.maxHp){
    r_playerData.curHp += 1;
    dispatch(setPlayer(r_playerData));
  }
}

  function playerGainsExp(exp){
    r_playerData.exp += exp;
  }

  function healPlayer(){
    r_playerData.curHp = r_playerData.maxHp;
  }

  return (
    <Container style={{ position: "relative" }}>
      {/*<button onClick={() => healPlayer()}>(cheat)heal to full</button>*/}
      <Table>
        <Tr>
          <Td>level</Td>
          <Td>{r_playerData.lvl}</Td>
        </Tr>
        <Tr>
          <Td colSpan="2">
            <ExperienceBar nextLvlExp={r_playerData.nextLvlExp} curExp={r_playerData.exp} />
          </Td>
        </Tr>
        <Tr>
          <Td>health points</Td>
          <Td>
            {r_playerData.curHp} / {r_playerData.maxHp}
          </Td>
        </Tr>
        <Tr>
          <Td>strength</Td>
          <Td>{r_playerData.str}</Td>
        </Tr>
        <Tr>
          <Td>defence</Td>
          <Td>{r_playerData.def}</Td>
        </Tr>
        <Tr>
          <Td>damage</Td>
          <Td>tbd</Td>
        </Tr>
        <Tr>
          <Td>damage reduction</Td>
          <Td>tbd</Td>
        </Tr>
        <Tr>
          <Td><CoinImg src={coins}/></Td>
          <Td>{r_playerData.coins}</Td>
        </Tr>
      </Table>
      <HorizontalSeparator />
      <div style={{ textAlign: "center" }}>
        <label>
          full vision:
          <input
            type="checkbox"
            checked={r_playerData.fullVision}
            onChange={() => triggerFullVisionChange()}
          />
        </label>
        <div
          style={{
            display: r_playerData.fullVision ? "none" : "flex",
            marginTop: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <VisionButton onClick={() => changeVision("minus")}>-</VisionButton>
          <div>vision radius modifier</div>
          <VisionButton onClick={() => changeVision("plus")}>+</VisionButton>
        </div>
      </div>

      <MovementKeysContainer
        block={r_utils.blockedMovement}
        size={movementKeysContainerSize}
        margin={marginMovementKeysContainer}
        onClick={() => saveToLocalStorage()}
      >
        <MovementKeys>
          <MovementKey
            disabled={buttonsDisablingList.includes(UP)}
            onClick={() => dispatch(setPlayer(updatePositionToDispatch(UP)))}
            left={70}
            top={6}
          >
            <MovementArrow src={arrow} rotation={0} />
          </MovementKey>
          <MovementKey
            disabled={buttonsDisablingList.includes(DOWN)}
            onClick={() => dispatch(setPlayer(updatePositionToDispatch(DOWN)))}
            left={70}
            top={134}
          >
            <MovementArrow src={arrow} rotation={180} />
          </MovementKey>
          <MovementKey
            disabled={buttonsDisablingList.includes(LEFT)}
            onClick={() => dispatch(setPlayer(updatePositionToDispatch(LEFT)))}
            left={6}
            top={70}
          >
            <MovementArrow src={arrow} rotation={270} />
          </MovementKey>
          <MovementKey
            disabled={buttonsDisablingList.includes(RIGHT)}
            onClick={() => dispatch(setPlayer(updatePositionToDispatch(RIGHT)))}
            left={134}
            top={70}
          >
            <MovementArrow src={arrow} rotation={90} />
          </MovementKey>
        </MovementKeys>
      </MovementKeysContainer>
      <ClearLocalStorage onClick={() => clearDataAndReloadPage()}>
        reset
      </ClearLocalStorage>
    </Container>
  );
};

const CoinImg = styled.img`
width: 60px;
`

const MovementArrow = styled.img`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(${(props) => props.rotation}deg);
`;

const HorizontalSeparator = styled.div`
  height: 1px;
  margin-bottom: 5px;
  text-align: center;
  background: black;
`;

const Td = styled.td`
  padding: 2px 4px;
`;

const Tr = styled.tr`
${Td}:last-of-type{
color: #940000;
text-align: right;
}
`;

const Table = styled.table`
width: 100%;
`;

const VisionButton = styled.button`
  width: 20px;
  height: 20px;
  margin: 0 5px;
`;

const MovementKeys = styled.div`
  position: relative;
`;

const ClearLocalStorage = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 2px 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
  color: white;
  background-color: #940000;
  }
`;

const Container = styled.div`
  position: relative;
  background-color: #dedede;
  width: ${PLAYER_INFO_PANEL_WIDTH}px;
  height: ${MAP_HEIGHT}px;
  //left: 640px;
  //top: -640px;
  padding: 15px;
  box-sizing: border-box;
  border: 2px solid black;
  z-index: 10;
`;

const MovementKeysContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: ${(props) => props.margin}px;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  display: ${(props) => (props.block ? "none" : "block")};
  //background-color: red;
`;

const MovementKey = styled.div`
  color: white;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: #484848;
  border-radius: 50%;
  box-shadow: 3px 3px 10px #ffffff;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? `none` : `auto`)};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  user-select: none;
  &:hover {
    transform: scale(1.1);
    background: #000000;
  }
`;
