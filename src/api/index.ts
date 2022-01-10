import { HttpClient } from "@bazo/fetch-client";
import { BasketItem, CheckoutResponse, Product } from "types";

const http = new HttpClient();

export function getProducts() {
	return http.get<Product[]>("/api/products");
	//return http.get<Product[]>("/api/unreliable_products");
}

export function checkout(basket: BasketItem[], cardNumber: string) {
	return http.post<CheckoutResponse>("/api/checkout", {
		basket,
		cardNumber,
	});
}
