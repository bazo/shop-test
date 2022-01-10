import { Container } from "@chakra-ui/react";
import { getProducts } from "api";
import { useBasket } from "app/hooks";
import Header from "components/header";
import BasketPage from "pages/basket";
import ProductsPage from "pages/products";
import ThanksPage from "pages/thanks";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import { Product } from "types";

function App() {
	const { data, isLoading } =
		useQuery("products", getProducts, {
			refetchInterval: false,
		}) || [];
	const basket = useBasket();

	return (
		<>
			<Header products={data as Product[]} />
			<Container maxW="container.xl" marginTop="5">
				<Routes>
					<Route path="/" element={<ProductsPage products={data as Product[]} basket={basket} isLoading={isLoading} />} />
					<Route path="/basket" element={<BasketPage products={data as Product[]} basket={basket} />} />
					<Route path="/thanks" element={<ThanksPage />} />
				</Routes>
			</Container>
		</>
	);
}

export default App;
