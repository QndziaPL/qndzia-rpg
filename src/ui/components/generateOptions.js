import App from "../../App";
import React, { useState } from "react";
import styled from "styled-components";
import { GAME_HEIGHT, GAME_WIDTH } from "../../consts/consts";
import { useDispatch, useSelector } from "react-redux";
import { setGameOn } from "../../redux/actions";

export const GenerateOptions = () => {
  const dispatch = useDispatch();

  const isGameOn = useSelector((p) => p.gameOn);

  const [startGame, setStartGame] = useState(isGameOn);
  const [enemyNumber, setEnemyNumber] = useState(5);

  function markGameAsInProgress() {
    dispatch(setGameOn(true));
    localStorage.setItem("gameOn", JSON.stringify(true));
  }

  function changeValue(e) {
    if (/^\d+$/.test(e.target.value) || e.target.value === "") {
      setEnemyNumber(e.target.value);
    }
  }

  if (startGame) {
    markGameAsInProgress();
    return (<GameContainer id={"gameContainer"}><App enemyNumber={enemyNumber} /></GameContainer>);
  } else {
    return (
      <>
        <GameContainer id={"gameContainer"}>
          <InputPanel>
            <Input
              enemyNumber={enemyNumber}
              changeValue={changeValue}
              setStartGame={setStartGame}
            />
          </InputPanel>
        </GameContainer>
      </>
    );
  }
};

const Input = ({ enemyNumber, changeValue, setStartGame }) => {
  return (
    <InputContainer>
      <p>enemies on map (recommended lower than 50)</p>
      <input
        type="number"
        value={enemyNumber}
        onChange={(e) => changeValue(e)}
      />
      <button onClick={() => setStartGame(true)} disabled={enemyNumber < 1}>
        {enemyNumber < 1 ? "at least 1..." : "\u00A0generate"}
      </button>
    </InputContainer>
  );
};

const InputContainer = styled.div`
margin-left: 30px;
margin-top: 50px;
`;

const InputPanel = styled.div`
  position: relative;
  //margin: 0 auto;
  width: 400px;
  height: 200px;
  background: #a4a4a4;
`;

const GameContainer = styled.div`
  width: ${GAME_WIDTH}px;
  height: ${GAME_HEIGHT}px;
  border: 12px solid #ffffff;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: ${(window.innerHeight - 640) / 2}px auto;
`;
