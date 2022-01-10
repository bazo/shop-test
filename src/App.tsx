import { Container } from "@chakra-ui/react";
import { getProducts } from "api";
import ProductContext from "app/productContext";
import Header from "components/header";
import BasketPage from "pages/basket";
import ProductsPage from "pages/products";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import { Product } from "types";



function App() {
	const { data, isLoading } = useQuery("products", getProducts) || [];

	return (
		<>
			<Header products={data as Product[]} />
			<Container maxW="container.xl" marginTop="5">
				<ProductContext.Provider value={data || []}>
					<Routes>
						<Route path="/" element={<ProductsPage products={data as Product[]} isLoading={isLoading} />} />
						<Route path="/basket" element={<BasketPage />} />
					</Routes>
				</ProductContext.Provider>
			</Container>
		</>
	);
}

export default App;
