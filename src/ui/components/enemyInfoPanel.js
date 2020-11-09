import React from "react";
import styled from "styled-components";
import background from "../../assets/battlePanel/enemy_info_panel.png"


export const EnemyInfoPanel = ({ myEnemy }) => {
  return (
    <EnemyInfoPanelContainer>
            <ImageBackground src={background}/>
            <InfoContainer>
      <h1 style={{ textAlign: "center" }}>{myEnemy.name}</h1>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 50 }}>
          <p>damage</p>
          <p>defense</p>
          <p>type</p>
          <br />
        </div>
        <div style={{ flex: 50, textAlign: "center", paddingRight: 20 }}>
          <p>{myEnemy.stats.dmg}</p>
          <p>{myEnemy.stats.def}</p>
          <p>{myEnemy.type}</p>
        </div>
      </div>
      <p>{myEnemy.lore}</p>
            </InfoContainer>
    </EnemyInfoPanelContainer>
  );
};

const InfoContainer = styled.div`
padding: 0 5px 0 15px;
color: #ffffff;
text-shadow: 1px 1px #414141;
`

const ImageBackground = styled.img`
position: absolute;
top: 0;
left: 0;
z-index: -1;
filter: brightness(70%);

`

const EnemyInfoPanelContainer = styled.div`
box-sizing: border-box;
  position: absolute;
  width: 230px;
  height: 350px;
  top: 15px;
  right: 15px;

  //padding-left: 20px;
`;
