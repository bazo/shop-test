import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { find, findIndex,  propEq, remove } from "ramda";
import { BasketState, Product } from "types";

import { RootState } from "./store";



const initialState: BasketState = {
	items: [],
};

export const basketSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		addProduct: (state, { payload: product }: PayloadAction<Product>) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			const index = findIndex(propEq("sku", product.sku), state.items);
			if (index < 0) {
				state.items.push({
					sku: product.sku,
					quantity: 1,
				});
			} else {
				if (state.items[index].quantity < product.basketLimit) {
					state.items[index].quantity += 1;
				}
			}
			return state;
		},
		removeProduct: (state, { payload: product }: PayloadAction<Product>) => {
			const index = findIndex(propEq("sku", product.sku), state.items);
			if (index > -1) {
				if (state.items[index].quantity >= 2) {
					state.items[index].quantity -= 1;
				} else {
					state.items = remove(index, 1, state.items);
				}
			}
			return state;
		},
		removeAll: (state) => {
			return { items: [] };
		},
	},
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, removeAll } = basketSlice.actions;

export default basketSlice.reducer;

export function getProductFromBasket(product: Product) {
	return ({ basket }: RootState) => {
		return find(propEq("sku", product.sku), basket.items);
	};
}
