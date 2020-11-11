import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducers";
import { GenerateOptions } from "./ui/components/generateOptions";
import "./fonts/AncientModernTales.ttf";
import styled from "styled-components";
import {GAME_WIDTH} from "./consts/consts";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const oppositeGameRatio = 640/940;
const test1 = oppositeGameRatio * window.innerWidth;
console.log(test1)

const ratioX = window.innerHeight / 940;
const ratioY = window.innerWidth / 640;

const RotateForMobile = styled.div`
box-sizing: content-box;
  @media (max-width: 840px) {
    position: absolute;
    top: 3%;
    left: ${-test1}px;
    transform: scale(${ratioY* 0.96} , ${ratioX* 0.96} ) rotate(90deg);
  }
`;


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <RotateForMobile>
          <GenerateOptions />
        </RotateForMobile>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
