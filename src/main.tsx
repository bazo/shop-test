import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import store from "app/store";
import theme from "app/theme";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const queryClient = new QueryClient();

ReactDOM.render(
	<StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<ChakraProvider theme={theme}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ChakraProvider>
			</QueryClientProvider>
		</Provider>
	</StrictMode>,
	document.getElementById("root")
);
