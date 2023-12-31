import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { HistoryList } from '@/components/history/HistoryList';
import { groupDataByDate } from '@/utils';
import { Database } from '@/types/database';
import { History } from '@/types/history';
import { NoItems } from '@/components/products/NoItems';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'History | Shoppingify',
	description: 'History of shopping lists created.',
};

const getHistory = async (): Promise<[string, History[]][]> => {
	const supabase = createServerComponentClient<Database>({
		cookies,
	});

	const { data: shoppingLists, error } = await supabase
		.from('shopping_lists')
		.select()
		.order('created_at', { ascending: false });

	if (error) {
		console.error(error);
		return [];
	}

	return groupDataByDate(shoppingLists);
};

export default async function HistoryPage() {
	const shoppingLists = await getHistory();

	return (
		<>
			<header className='flex flex-col md:flex-row justify-between gap-6 md:gap-12'>
				<h2 className='text-2xl font-bold'>Shoppingify history</h2>
			</header>
			<section className='my-12'>
				{shoppingLists.length === 0 ? (
					<NoItems />
				) : (
					<>
						{shoppingLists.map(([key, value]) => (
							<article key={key} className='mt-6 mb-12'>
								<h3 className='font-bold'>{key}</h3>
								<HistoryList shoppingList={value} />
							</article>
						))}
					</>
				)}
			</section>
		</>
	);
}
