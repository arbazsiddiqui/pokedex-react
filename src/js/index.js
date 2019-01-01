import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/index";
const store = configureStore();
import App from "./containers/App";
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("pokemon-list")
);