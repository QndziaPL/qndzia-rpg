import styled from "styled-components";
import React from "react";

export const HealthBar = ({ maxHp, curHp, bottom }) => {
  const barWidth = (curHp / maxHp) * 100;
  return (
    <HealthBarContainer bottom={bottom}>
      <ActualHealthBar barWidth={barWidth}>
        {curHp + " / " + maxHp}&nbsp;&nbsp;
      </ActualHealthBar>
    </HealthBarContainer>
  );
};

const ActualHealthBar = styled.div`


  text-align: right;
  width: ${(props) => props.barWidth}%;
  background-color: #a90000;
  border-radius: 10px;
    padding: 2px;
height: 24px;
transition-duration: 0.5s;


  //z-index: -10;
`;
const HealthBarContainer = styled.div`

  //z-index: 10;
  position: absolute;
  margin: 0 10%;
  //height: 20px;
  width: 80%;
  border: 1px solid rgb(76,56,26, 0.7);
  border-radius: 10px;
  bottom: ${(props) => props.bottom}px;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.8);
`;
