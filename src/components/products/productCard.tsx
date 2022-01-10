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
console.log(product.name, basketState)
	return (
		<Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
			<Box p="6">
				<Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
					{product.name}
				</Box>

				<Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" ml="2">
					{product.description}
				</Box>

				<Box>
					{product.price}
					<Box as="span" color="gray.600" fontSize="sm">
						$
					</Box>

					{canAdd && (
						<Button colorScheme="teal" size="md" onClick={addToBasket}>
							Add to basket
						</Button>
					)}

					{basketState && (
						<Button colorScheme="teal" size="md" onClick={removeFromBasket}>
							Remove from basket
						</Button>
					)}
				</Box>
			</Box>
		</Box>
	);
}
