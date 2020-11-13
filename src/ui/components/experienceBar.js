import styled from "styled-components";
import React from "react";



export const ExperienceBar = ({ nextLvlExp, curExp, bottom }) => {
  const barWidth = (curExp / nextLvlExp) * 100;
  return (
    <ExperienceBarContainer bottom={bottom}>
        <ActualExperienceBar barWidth={barWidth} />
      <HoverInfo>
        {barWidth}% towards next level<br/>
        {curExp}/{nextLvlExp} experience points
      </HoverInfo>
    </ExperienceBarContainer>
  );
};

const HoverInfo = styled.div`
display: none;
position: absolute;
width: 100%;
color: black;
background-color: #e3e3e3;
text-align: center;
padding: 5px;
border-radius: 10px;
border: 1px solid black;
top: 20px;
opacity: 0.9;
box-shadow: 2px 2px 10px black;
`

const ActualExperienceBar = styled.div`
  text-align: center;
  width: ${(props) => props.barWidth}%;
  background-color: #8100ff;
  border-radius: 10px;
  padding: 2px;
  height: 14px;
  transition-duration: 0.5s;
`;
const ExperienceBarContainer = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid rgb(76, 56, 26, 0.7);
  border-radius: 10px;
  bottom: ${(props) => props.bottom}px;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.8);
  &:hover{
  background-color: white;
  }
  &:hover ${HoverInfo}{
  display: block;
  }
`;
