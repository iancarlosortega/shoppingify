import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { TopItems } from '@/components/statistics/TopItems';
import { Chart } from '@/components/statistics/Chart';
import { getNumberOfItemsByMonth, getTopStatistics } from '@/utils';
import { Database } from '@/types/database';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Statistics | Shoppingify',
	description: 'Statistics of your shopping lists',
};

const getStatistics = async () => {
	const supabase = createServerComponentClient<Database>({ cookies });
	const { data: shoppingLists, error } = await supabase
		.from('shopping_lists')
		.select();
	if (error) {
		console.log(error);
		return null;
	}

	const chartStatistics = getNumberOfItemsByMonth(shoppingLists);
	const topStatistics = getTopStatistics(shoppingLists);

	return {
		chartStatistics,
		topStatistics,
	};
};

export default async function StatisticsPage() {
	const shoppingLists = await getStatistics();

	if (shoppingLists === null) redirect('/');

	const { topStatistics, chartStatistics } = shoppingLists;

	return (
		<>
			<section className='grid md:grid-cols-2 gap-4 md:gap-12'>
				<TopItems title='Top items' items={topStatistics.topProducts} />
				<TopItems
					title='Top Categories'
					items={topStatistics.topCategories}
					color='secondary'
				/>
			</section>

			<section className='h-[400px] my-8'>
				<h3 className='text-2xl md:text-3xl font-semibold mb-8'>
					Monthly Summary
				</h3>
				<Chart data={chartStatistics} />
			</section>
		</>
	);
}
