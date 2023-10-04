import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { HomeClient } from './HomeClient';
import { Database } from '@/types/database';
import { Category } from '@/types/categories';

export const dynamic = 'force-dynamic';

const getCategories = async () => {
	const supabase = createServerComponentClient<Database>({ cookies });
	const { error, data: categories } = await supabase
		.from('categories')
		.select('*, products(*, category:categories(*))');

	if (error) {
		console.error(error);
		return [];
	}

	return categories;
};

export default async function Home() {
	const categories = await getCategories();

	return <HomeClient categories={categories as Category[]} />;
}
