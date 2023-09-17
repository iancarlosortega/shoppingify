import { create } from 'zustand';
import { Product } from '@/types/products';

type State = {
	productSelected: Product | null;
};

type Actions = {
	updateProductSelected: (product: Product | null) => void;
};

const useProductStore = create<State & Actions>()(set => ({
	productSelected: null,
	updateProductSelected: payload =>
		set({
			productSelected: payload,
		}),
}));

export default useProductStore;
