

export const CreateIdForEnemies = (enemies) =>{
    enemies.map((enemy) => {
        console.log(enemy)
        console.log(generateId(enemy.randomX, enemy.randomY))


    })

}

function generateId(x,y){
    //
    // const first = x;
    // const second = y+1;
    //
    // const dupa = first * 20 + second;
    // return dupa

    const f = x;
    const s = y;
    const id = s * 20 + f;

    return id
}