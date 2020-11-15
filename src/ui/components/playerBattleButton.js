import styled from "styled-components";
import React from "react";

export const PlayerBattleButton = ({ label, img, passedFunction }) => {
  return (
    <Button onClick={() => passedFunction()}>
      <Image src={img}></Image>
      <LabelContainer>
        <Label>{label}</Label>
      </LabelContainer>
    </Button>
  );
};
const Image = styled.img`
  width: 60px;
  height: 40px;
  //background: blue;
  margin: 5px auto 0 auto;
`;

const Button = styled.div`
  position: relative;
  width: 31%;
  height: 45%;
  //background: green;
  cursor: pointer;
  border-radius: 15px;
  text-align: center;
  //z-index: 10;
  &:hover {
    transform: scale(1.1);
  }
`;

const LabelContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 5px;
`;
const Label = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
`;
