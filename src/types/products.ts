import { Category } from './categories';
import { Database } from './database';

export type ProductEntity = Database['public']['Tables']['products']['Row'];

export type Product = ProductEntity & {
	category: Category;
};
