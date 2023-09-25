import { Database } from './database';

export type ShoppingListEntity =
	Database['public']['Tables']['shopping_lists']['Row'];

export type ShoppingList = ShoppingListEntity;
