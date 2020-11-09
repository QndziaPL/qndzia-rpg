import React from "react";
import styled from "styled-components";

export const EnemyInfoPanel = ({myEnemy}) => {
    return (<EnemyInfoPanelContainer>
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
        <div style={{ backgroundColor: "black", width: 150, height: 1 }}></div>
        <p>{myEnemy.lore}</p>
    </EnemyInfoPanelContainer>)
}

const EnemyInfoPanelContainer = styled.div`
  position: absolute;
  width: 200px;
  height: 350px;
  top: 40px;
  right: 30px;
  background-color: #ffffff;
  border: 1px solid black;
  border-radius: 20px;
  padding-left: 20px;
`;
