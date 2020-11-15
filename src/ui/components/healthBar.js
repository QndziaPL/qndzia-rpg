import styled from "styled-components";
import React from "react";

export const HealthBar = ({ maxHp, curHp, bottom }) => {
  if (curHp < 0) {
    curHp = 0;
  }
  const barWidth = (curHp / maxHp) * 100;

  return (
    <HealthBarContainer bottom={bottom}>
      {
        <ActualHealthBar barWidth={barWidth}>
          {curHp + " / " + maxHp}&nbsp;&nbsp;
        </ActualHealthBar>
      }
    </HealthBarContainer>
  );
};

const ActualHealthBar = styled.div`
  text-align: right;
  width: ${(props) => props.barWidth}%;
  min-width: 20%;
  background: rgb(3, 0, 0);
  font-size: 20px;
  color: #d4d4d4;
  background: linear-gradient(
    0deg,
    rgba(3, 0, 0, 1) 0%,
    rgba(209, 0, 0, 1) 37%,
    rgba(20, 0, 0, 1) 100%
  );
  border-radius: 10px;
  padding: 2px;
  height: 24px;
  transition-duration: 0.5s;
`;

const HealthBarContainer = styled.div`
  position: absolute;
  margin: 0 10%;
  width: 80%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  bottom: ${(props) => props.bottom}px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.8);
`;
