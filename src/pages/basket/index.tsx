/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@chakra-ui/react";
import { checkout } from "api";
import { removeAll } from "app/basket.slice";
import ProductContext from "app/productContext";
import { useAppDispatch, useAppSelector } from "app/store";
import { find, propEq } from "ramda";
import { useContext, useRef } from "react";

export default function BasketPage() {
	const basket = useAppSelector((state) => state.basket);
	const products = useContext(ProductContext);

	const dispatch = useAppDispatch();

	const card = useRef(null);

	const submit = () => {
		//@ts-ignore
		const cardNumber = card.current.value;

		checkout(basket, cardNumber);
	};

	return (
		<div>
			<h2>Basket</h2>

			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Qty</th>
						<th>Price</th>
						<th>Total Price</th>
					</tr>
				</thead>

				<tbody>
					{basket.items.map((item) => {
						const product = find(propEq("sku", item.sku), products);
						return (
							<tr>
								<td>{product?.name}</td>
								<td>{item.quantity}</td>
								<td>{product?.price}</td>
								<td>{product?.price || 0 * item.quantity}</td>
							</tr>
						);
					})}
					<tr></tr>
				</tbody>
			</table>
			<Button onClick={() => dispatch(removeAll())}>Remove all</Button>

			<label>Creadit card number</label>
			<input ref={card}></input>
		</div>
	);
}
