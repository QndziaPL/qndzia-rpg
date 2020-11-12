import styled from "styled-components";
import React from "react";


// TODO: tutaj jutro zacząć napierdalać !!!!
// rozszerzyć drugą kolumnę tabeli, co by ładnie wyglądało i wziąć się za system EXPA ! <3
export const ExperienceBar = ({ nextLvlExp, curExp, bottom }) => {
  const barWidth = (curExp / nextLvlExp) * 100;
  return (
    <ExperienceBarContainer bottom={bottom}>


        <ActualExperienceBar barWidth={barWidth}>
          {/*{curExp + " / " + nextLvlExp}&nbsp;&nbsp;*/}
        </ActualExperienceBar>

    </ExperienceBarContainer>
  );
};

const ActualExperienceBar = styled.div`
  text-align: center;
  width: ${(props) => props.barWidth}%;
  //min-width: 20%;
  background-color: #8100ff;
  border-radius: 10px;
  padding: 2px;
  height: 14px;
  transition-duration: 0.5s;

  //z-index: -10;
`;
const ExperienceBarContainer = styled.div`
  //z-index: 10;
  //position: absolute;
  //margin: 0 10%;
  //height: 20px;
  width: 100%;
  border: 1px solid rgb(76, 56, 26, 0.7);
  border-radius: 10px;
  bottom: ${(props) => props.bottom}px;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.8);
`;
