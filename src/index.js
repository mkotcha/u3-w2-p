import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "weather-icons-lite/css/weather-icons-lite.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./scss/style.scss";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
