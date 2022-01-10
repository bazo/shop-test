export interface Product {
	sku: number;
	name: string;
	description: string;
	price: number;
	basketLimit: number;
}

export interface BasketItem {
	sku: number;
	quantity: number;
}

export interface CheckoutResponse {
	msg: string;
}
