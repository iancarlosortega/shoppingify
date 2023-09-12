import { Product } from './product';

export interface Category {
	id: string;
	name: string;
	items: Product[];
}
