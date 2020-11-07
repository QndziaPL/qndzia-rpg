import React from "react";

export const CompileAll=(enemies, map)=>{
    const em = enemies.enemyMap

    let compile = [];
    for (const i in map){
        compile.push({
            mapId: map[i],
            enemyId: 0
        })
    }
    for (const j in em){
        const id = em[j].tileId
        // NIE DZIAła !!!!!!! wywala program
        // compile[id].enemyId = 1
        compile[id] = {...compile[id], enemyId: 1}
    }
    console.log(compile)
    return compile;
}