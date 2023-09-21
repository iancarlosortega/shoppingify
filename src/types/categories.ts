import { Database } from './database';
import { Product } from './products';

type CategoryEntity = Database['public']['Tables']['categories']['Row'];

export type Category = CategoryEntity & {
	products?: Product[];
};
