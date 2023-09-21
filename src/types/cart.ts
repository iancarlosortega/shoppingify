import { Product } from './products';

export type Cart = {
	id?: string;
	name: string;
	items: CartItem[];
};

type CartItem = {
	id: string;
	category: string;
	products: Product[];
};
