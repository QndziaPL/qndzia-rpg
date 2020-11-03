import {EnemiesContext} from "../App";
import React, {useContext} from "react";
import Character from "../characters/character";

export const EnemyTypeEnum = Object.freeze({
    "small":"small", "humanoid":"humanoid", "big":"big"
});

export const Enemy = ({name, type, position, stats}) => {

    const context = useContext(EnemiesContext);



    return (<div>
        <Character position={position} letter={"E"}/>
    </div>)

}


export const Enemies = ({listOfEnemies}) => {

    const a = listOfEnemies.map(enemy => <div></div>)


return (a)

}

