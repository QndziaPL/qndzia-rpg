import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducers";
import { GenerateOptions } from "./ui/components/generateOptions";
import "./fonts/AncientModernTales.ttf"

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GenerateOptions>{/*<App />*/}</GenerateOptions>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
