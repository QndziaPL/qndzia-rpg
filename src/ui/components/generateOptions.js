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
    if (e.target.value < 101 && e.target.value > 0) {
      setEnemyNumber(e.target.value);
    }
  }

  if (startGame) {
    markGameAsInProgress();
    return <App enemyNumber={enemyNumber} />;
  } else {
    return (
      <>
        <GameContainer>
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
      <button onClick={() => setStartGame(true)}>&nbsp;generate</button>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  margin-left: 30px;
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
  border: 2px solid black;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  margin: ${(window.innerHeight - 640) / 2}px auto;
`;
