import { HttpClient } from "@bazo/fetch-client";
import { BasketState, Product } from "types";

const http = new HttpClient();

export function getProducts() {
	return http.get<Product[]>("/api/products");
}

export function checkout(basket: BasketState, cardNumber: string) {
	return http.post<Product[]>("/api/checkout", {
		basket,
		cardNumber,
	});
}
