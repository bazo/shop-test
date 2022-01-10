import { useAppSelector } from "./store";

export function useBasket() {
	return useAppSelector(({ basket }) => basket);
}
