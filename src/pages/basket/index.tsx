/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "@chakra-ui/react";
import { checkout } from "api";
import { BasketState, removeAll } from "app/basket.slice";
import { useAppDispatch } from "app/store";
import { find, propEq } from "ramda";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "types";

interface BasketPageProps {
	products: Product[];
	basket: BasketState;
}

export default function BasketPage({ products, basket }: BasketPageProps) {
	const dispatch = useAppDispatch();

	const [error, setError] = useState("");

	const card = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

	const clearBasket = () => {
		dispatch(removeAll());
	};

	const submit = async () => {
		const cardNumber = card.current?.value || "";

		try {
			const res = await checkout(basket.items, cardNumber);
			clearBasket();
			navigate(`/thanks?msg=${res.msg}`);
		} catch (e: any) {
			const { error } = await e.json();
			setError(error);
		}
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
							<tr key={item.sku}>
								<td>{product?.name}</td>
								<td>{item.quantity}</td>
								<td>{product?.price}</td>
								<td>{((product?.price || 0) * item.quantity).toFixed(2)}</td>
							</tr>
						);
					})}
					<tr></tr>
				</tbody>
			</table>
			<Button colorScheme="red" onClick={() => confirm("remove all") && clearBasket()}>
				Remove all
			</Button>
			<br />
			<br />
			<br />

			{error && (
				<>
					<span>{error}</span>
					<br />
				</>
			)}
			<label>Credit card number</label>
			<input ref={card}></input>
			<br />
			<Button onClick={submit}>Submit</Button>
		</div>
	);
}
