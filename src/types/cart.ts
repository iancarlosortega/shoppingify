import { Product } from './products';

export type Cart = {
	id?: string;
	name: string;
	isEdittingMode: boolean;
	items: CartItem[];
};

type CartItem = {
	id: string;
	name: string;
	products: Product[];
};
