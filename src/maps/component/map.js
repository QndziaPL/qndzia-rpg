import React, { useState } from "react";
import styled from "styled-components";
import { MapIDsToMap } from "./mapIDsToMap";
import { MAP_HEIGHT, MAP_WIDTH } from "../../consts/consts";
import "../../../src/assets/mapTiles/green_tile.png";
import green_tile from "../../../src/assets/mapTiles/green_tile.png";
import green_background from "../../../src/assets/mapTiles/grass_map_background.png";
import brown_tile from "../../../src/assets/mapTiles/brown_path_tile.png";
import water_tile from "../../../src/assets/mapTiles/water_tile.png";
import stone_tile from "../../../src/assets/mapTiles/stone_tile.png";
import treasure_tile from "../../../src/assets/treasureTiles/treasure.png";
import { useDispatch, useSelector } from "react-redux";
import { setMapWithIDs } from "../../redux/actions/index";

const Map = ({ size = { x: 20, y: 20 }, children, map }) => {
  const dispatch = useDispatch();
  const r_mapIDs = useSelector((p) => p.mapIDs);

  const [dispatchAllowed, setDispatchAllowed] = useState(true);

  let mapTiles;

  if (Object.keys(r_mapIDs).length === 0 && r_mapIDs.constructor === Object) {
    mapTiles = MapIDsToMap(map);
    updateStore();
    updateLocalStorage(map);
  } else {
    mapTiles = MapIDsToMap(r_mapIDs);
  }

  function updateStore() {
    if (dispatchAllowed) {
      dispatch(setMapWithIDs(map));
      setDispatchAllowed(false);
    }
  }
  function updateLocalStorage(map) {
    localStorage.setItem("mapIDs", JSON.stringify(map));
  }

  return (
    <MapBackground>
      {children}
      <MapBackgroundImage src={green_background} />
      <MapFromTiles tiles={mapTiles} />
    </MapBackground>
  );
};

const SingleMapTile = styled.img`
  width: 32px;
  height: 32px;
  z-index: 1;
`;

const MapBackgroundImage = styled.img`
  position: absolute;
  z-index: 0;
`;

const TileType = (number) => {
  switch (number) {
    case 0:
      return brown_tile;
    case 1:
      return green_tile;
    case 2:
      return stone_tile;
    case 3:
      return water_tile;
    case 4:
      return treasure_tile;
    case 5:
      return "#000000";
    default:
      return "#ffffff";
  }
};

const MapFromTiles = ({ tiles }) => {
  return (
    <div>
      {tiles.map((row, index) => (
        <div style={{ display: "flex" }}>
          {row.map((tile, index) => (
            <SingleMapTile
              src={TileType(tile.tileType)}
              itemKey={tile.id}
              tileType={TileType(tile.tileType)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Map;

const MapBackground = styled.div`
  position: relative;
  width: ${MAP_WIDTH}px;
  height: ${MAP_HEIGHT}px;
  background-color: crimson;
  z-index: 0;
  overflow: hidden;
`;
