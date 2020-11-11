import { HealthBar } from "./healthBar";
import styled from "styled-components";
import React from "react";
import { PlayerBattleButton } from "./playerBattleButton";
import normal_attack_button from "../../assets/battleButtons/normal_attack_button.png";
import defence_button from "../../assets/battleButtons/defence_button.png";
import inventory_button from "../../assets/battleButtons/inventory_button.png";
import spells_button from "../../assets/battleButtons/spells_button.png";
import character_button from "../../assets/battleButtons/character_button.png";
import player_battle_panel from "../../assets/battlePanel/player_battle_panel.png";

export const PlayerBattlePanel = ({ hitEnemy, myPlayer, block }) => {
  const { curHp, def, eq, lvl, maxHp, str } = myPlayer;

  //need to figure out how dmg should be calculated (prob randoms multiplied by lvl, str, eq modif etc)
  const normalAttackDmg = str;
  return (
    <div style={{ position: "relative" }}>
      <PlayerContainer>
        <PanelImage src={player_battle_panel} />

        <ButtonContainer>
          <PlayerBattleButton label={"inventory"} img={inventory_button} />
          <PlayerBattleButton label={"block"} img={defence_button} passedFunction={block}/>
          <PlayerBattleButton label={"attack"} img={normal_attack_button} passedFunction={hitEnemy} functionParam={normalAttackDmg}/>
          <PlayerBattleButton label={"character"} img={character_button} />
          <PlayerBattleButton label={"coś tu będzie"} />
          <PlayerBattleButton label={"spellbook"} img={spells_button} />
        </ButtonContainer>
        <HealthBar bottom={-30} curHp={curHp} maxHp={maxHp} />
      </PlayerContainer>
    </div>
  );
};

const PanelImage = styled.img`
  position: relative;
  width: 750px;
  height: 230px;
  z-index: 0;
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  top: -230px;

  margin: 20px auto 0 auto;
  width: 80%;
  height: 70%;
  //border: 1px solid blue;
`;

const PlayerContainer = styled.div`
  position: absolute;
  width: 750px;
  height: 230px;
  bottom: 40px;
  left: 50px;
  //background-color: #e3d2c7;
  //border-radius: 20px;
  //border: 1px solid black;
  //box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.75);
`;
