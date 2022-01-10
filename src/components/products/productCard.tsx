import { Box, Button } from "@chakra-ui/react";
import { addProduct, removeProduct } from "app/basket.slice";
import { useAppDispatch } from "app/store";
import { BasketItem, Product } from "types";

interface ProductCardProps {
	product: Product;
	basketState: BasketItem | undefined;
}

export function ProductCard({ product, basketState }: ProductCardProps) {
	const dispatch = useAppDispatch();

	const addToBasket = () => {
		dispatch(addProduct(product));
	};

	const removeFromBasket = () => {
		dispatch(removeProduct(product));
	};

	const canAdd = (basketState?.quantity || 0) < product.basketLimit;

	return (
		<Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
			<Box p="6">
				<Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
					{product.name}
				</Box>

				<Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" ml="2">
					{product.description}
				</Box>

				{product.price}
				<br />
				{canAdd && (
					<Button colorScheme="teal" size="md" onClick={addToBasket}>
						Add to basket
					</Button>
				)}
				<br />
				{basketState && (
					<Button colorScheme="red" size="md" onClick={removeFromBasket}>
						Remove from basket
					</Button>
				)}
			</Box>
		</Box>
	);
}
