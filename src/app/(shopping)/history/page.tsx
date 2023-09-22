import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/database';

export default async function HistoryPage() {
	const supabase = createServerComponentClient<Database>({
		cookies,
	});

	const { data: shoppingLists } = await supabase
		.from('shopping_lists')
		.select();

	return (
		<>
			<header className='flex flex-col md:flex-row justify-between gap-6 md:gap-12'>
				<h2 className='text-2xl font-bold'>Shoppingify history</h2>
			</header>
			<main>
				<pre>{JSON.stringify(shoppingLists, null, 2)}</pre>
			</main>
		</>
	);
}
