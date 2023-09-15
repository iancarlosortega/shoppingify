import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { MainContent } from '@/components/MainContent';
import { Sidebar } from '@/components/UI/Sidebar';
import { ShoppingList } from '@/components/cart/ShoppingList';
import { AddItemForm } from '@/components/products/AddItemForm';

export const metadata: Metadata = {
	title: 'Home | Shoppingify',
	description: 'Create your shopping list with ease and style.',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = createServerComponentClient({
		cookies,
	});
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data: categories } = await supabase.from('categories').select();

	return (
		<div className='min-h-screen h-full w-full'>
			<Sidebar />
			<MainContent session={session}>{children}</MainContent>
			<ShoppingList />
			<AddItemForm categories={categories} />
		</div>
	);
}
