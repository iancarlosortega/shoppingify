import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Input } from '@nextui-org/input';
import { AiOutlineSearch } from 'react-icons/ai';
import { CategoriesList } from '@/components/products/CategoriesList';
import { NoItems } from '@/components/products/NoItems';
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

	return (
		<>
			<header className='flex flex-col md:flex-row justify-between gap-6 md:gap-12'>
				<h2 className='text-primary text-2xl font-bold'>
					Shoppingify{' '}
					<span className='text-black dark:text-white font-medium'>
						allows you to take your shopping list wherever you go
					</span>
				</h2>

				<Input
					className='w-full lg:max-w-[400px]'
					type='text'
					placeholder='search item'
					startContent={<AiOutlineSearch />}
				/>
			</header>

			{categories.length === 0 ? (
				<NoItems />
			) : (
				<section>
					<CategoriesList categories={categories as Category[]} />
				</section>
			)}
		</>
	);
}
