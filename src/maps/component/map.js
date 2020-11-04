import React from "react";
import styled from "styled-components";
import {PlayerInfoPanel} from "../../ui/components/playerInfoPanel";
import {EmptyTiles} from "./emptyTiles";
import {MapIDsToMap} from "./mapIDsToMap";
import {MAP_HEIGHT, MAP_WIDTH} from "../../consts/consts";


const Map = ({size = {x: 20, y: 20}, children, map}) =>{

   const emptyTiles = EmptyTiles();

   const mapTiles = MapIDsToMap(map);





    return (
        <MapBackground>

            {children}
          <MapFromTiles tiles={mapTiles}/>
          {/*<MapFromTiles tiles={emptyTiles}/>*/}
        </MapBackground>

)
}
const SingleMapTile = styled.div`
width: 32px;
height: 32px;
background: ${props => props.tileType};
`


const TileType = (number) => {
    switch (number){
        case 0: return "#702b00";
        case 1: return "#176700";
        case 2: return "#565656";
        case 3: return "#0049bf";
        case 4: return "#694918";
        case 5: return "#000000";
        default: return "#ffffff";

    }
}

function RandomMapTile(){
    const random = Math.floor(Math.random() * 6);
   return random;
}



const MapFromTiles = ({tiles}) => {
   return (
       <div>
           {tiles.map((row, y) => (
               <div style={{display: "flex"}}>
                   {row.map((tile, x) => (
                       <SingleMapTile
                           itemKey={tile.id}
                           // tileType={TileType(RandomMapTile())}
                           tileType={TileType(tile.tileType)}
                       />
                   ))}
               </div>
           ))}
       </div>
   )
}

export default Map;



// const matrix = [];
// const mapMatrix = [];
// let key = 0;
// for(let i=1; i<21; i++) {
//     matrix[i] = [];
//     for(let j=1; j<21; j++) {
//         key++;
//         matrix[i][j] =  (<SingleMapTile key={key}></SingleMapTile>)
//         // matrix[i][j] = mapMatrix.push(<SingleMapTile key={key}></SingleMapTile>)
//
//
//     }
// }
// console.log(matrix)



const MapBackground = styled.div`

  position: relative;
  //margin: 100px auto;
  width: ${MAP_WIDTH}px;
  height: ${MAP_HEIGHT}px;
  background-color: crimson;
`

