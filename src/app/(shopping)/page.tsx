import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Input } from '@nextui-org/input';
import { AiOutlineSearch } from 'react-icons/ai';
import { CategoriesList } from '@/components/products/CategoriesList';
import { Database } from '@/types/database';

export default async function Home() {
	const supabase = createServerComponentClient<Database>({ cookies });
	const { data: categories } = await supabase
		.from('categories')
		.select('*, products(*, category:categories(*))');

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

			<section>
				<CategoriesList categories={categories!} />
			</section>
		</>
	);
}
