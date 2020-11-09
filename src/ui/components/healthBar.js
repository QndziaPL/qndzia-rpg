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