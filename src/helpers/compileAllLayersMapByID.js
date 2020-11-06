import {AppContext, EnemiesContext, MapContext, TreasureContext} from "../App";
import React,{useContext} from "react";


export const CompileAll=()=>{

    let compile = [];
    for (let i = 1; i < 401; i++){
        compile.push({
            // terrain: terrain[i],
                // enemy: enemies,
                // treasures: treasures
        })
    }


    return compile;
    // terrain.forEach(ter => compile.push()terrain.id)

    // return
}