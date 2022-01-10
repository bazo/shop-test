/* eslint-disable @typescript-eslint/ban-ts-comment */
import "./index.css";

import store from "app/store";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";

//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

//@ts-ignore
root.render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
