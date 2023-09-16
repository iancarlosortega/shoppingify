import { Database } from './database';
import { ProductEntity } from './products';

type CategoryEntity = Database['public']['Tables']['categories']['Row'];

export type Category = CategoryEntity & {
	products?: ProductEntity[];
};
