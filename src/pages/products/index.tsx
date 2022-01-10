import { HStack, Spinner } from "@chakra-ui/react";
import { BasketState, getProductFromBasket } from "app/basket.slice";
import { ProductCard } from "components/products/productCard";
import {  Product } from "types";

interface ProductsPageProps {
	products: Product[];
	isLoading: boolean;
	basket: BasketState;
}

export default function ProductsPage({ products, isLoading = false, basket }: ProductsPageProps) {
	if (isLoading) {
		return <Spinner size="xl" />;
	}

	return (
		<div>
			<h2>Choose your products:</h2>

			<HStack spacing="24px">
				{products?.map((product) => {
					return <ProductCard product={product} basketState={getProductFromBasket(product)(basket.items)} key={product.sku} />;
				})}
			</HStack>
		</div>
	);
}
