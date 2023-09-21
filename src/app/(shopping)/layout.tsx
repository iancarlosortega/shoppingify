import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { MainContent } from '@/components/MainContent';
import { Sidebar } from '@/components/UI/Sidebar';
import { ShoppingList } from '@/components/cart/ShoppingList';
import { AddItemForm } from '@/components/products/AddItemForm';
import { ProductInformation } from '@/components/products/ProductInformation';
import { Database } from '@/types/database';
import { Category } from '@/types/categories';
import { ClientOnly } from '@/components/ClientOnly';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'Home | Shoppingify',
	description: 'Create your shopping list with ease and style.',
};

const getSession = async () => {
	const supabase = createServerComponentClient<Database>({
		cookies,
	});
	const {
		data: { session },
	} = await supabase.auth.getSession();

	return session;
};

const getCategories = async (): Promise<Category[]> => {
	const supabase = createServerComponentClient<Database>({
		cookies,
	});
	const { data: categories } = await supabase.from('categories').select();
	return categories ?? [];
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getSession();
	const categories = await getCategories();

	return (
		<div className='min-h-screen h-full w-full'>
			<ClientOnly>
				<Sidebar />
				<MainContent session={session}>{children}</MainContent>
				<ShoppingList />
				<ProductInformation />
				<AddItemForm categories={categories} />
			</ClientOnly>
		</div>
	);
}
