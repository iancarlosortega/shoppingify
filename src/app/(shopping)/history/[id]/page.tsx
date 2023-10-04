import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { BsCalendarWeek } from 'react-icons/bs';
import { CategoriesList } from '@/components/products/CategoriesList';
import { formatDate } from '@/utils';
import { ShoppingList } from '@/types/shoppingLists';
import { Database } from '@/types/database';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	const id = params.id;
	const shoppingList = await getShoppingList(id);
	return {
		title: `${shoppingList?.name ?? 'Shopping List'} | Shoppingify`,
		description: 'Shopping List with all the items you need to buy',
	};
}

const getShoppingList = async (id: string): Promise<ShoppingList | null> => {
	const supabase = createServerComponentClient<Database>({ cookies });
	const { data: shoppingList, error } = await supabase
		.from('shopping_lists')
		.select()
		.eq('id', id);
	if (error) {
		console.error(error);
		return null;
	}
	return shoppingList[0] ?? null;
};

export default async function ShoppingListPage({
	params,
}: {
	params: { id: string };
}) {
	const shoppingList = await getShoppingList(params.id);

	if (shoppingList === null) notFound();

	return (
		<>
			<Link
				href='/history'
				className='text-primary w-auto bg-transparent flex items-center justify-start gap-2 font-bold'>
				<HiArrowLongLeft className='stroke-primary stroke-2' />
				back
			</Link>
			<header className='my-8'>
				<h2 className='text-2xl font-bold'>{shoppingList.name}</h2>
				<div className='flex gap-4 items-center mt-4'>
					<BsCalendarWeek className='text-gray-500' />
					<p className='text-gray-500 font-medium'>
						{formatDate(new Date(shoppingList.created_at))}
					</p>
				</div>
			</header>
			<section>
				<CategoriesList
					categories={shoppingList.items as any[]}
					showQuantities={true}
				/>
			</section>
		</>
	);
}
