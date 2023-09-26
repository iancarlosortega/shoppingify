import { Category } from './categories';

export type History = {
	id: string;
	name: string;
	created_at: string;
	state: string;
	items: Category[];
};
