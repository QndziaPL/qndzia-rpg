
export const EmptyTiles = () => {
    const tiles = [];
    let id = 0;
    let tileType = 0;
    for (let y = 0; y < 640; y = y + 32){
        const row = [];
        for (let x = 0; x < 640; x = x + 32){
            row.push({
                x,y,id: id++, tileType
            })
        }
        tiles.push(row)
    }

    // console.log(tiles)

    return tiles;
}
