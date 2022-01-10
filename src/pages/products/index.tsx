import { HStack, Spinner } from "@chakra-ui/react";
import { getProductFromBasket } from "app/basket.slice";
import { useAppSelector } from "app/store";
import { ProductCard } from "components/products/productCard";
import { Product } from "types";

interface ProductsPageProps {
	products: Product[];
	isLoading: boolean;
}

export default function ProductsPage({ products, isLoading = false }: ProductsPageProps) {
	const basket = useAppSelector((state) => state.basket);

	if (isLoading) {
		return <Spinner size="xl" />;
	}

	return (
		<div>
			<h2>Choose your products:</h2>

			<HStack spacing="24px">
				{products?.map((product) => {
					return <ProductCard product={product} basketState={getProductFromBasket(product)({ basket })} />;
				})}
			</HStack>
		</div>
	);
}
