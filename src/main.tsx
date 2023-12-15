import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { AppProvider } from "./context/app.context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
	</React.StrictMode>
);
