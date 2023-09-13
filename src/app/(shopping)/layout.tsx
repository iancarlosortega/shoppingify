import type { Metadata } from 'next';
import { Sidebar } from '@/components/UI/Sidebar';
import { ShoppingList } from '@/components/cart/ShoppingList';

export const metadata: Metadata = {
	title: 'Home | Shoppingify',
	description: 'Create your shopping list with ease and style.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex min-h-screen h-full w-full'>
			<Sidebar />
			<main className='flex-1 bg-background ml-[80px] mr-[400px] px-24 py-12'>
				{children}
			</main>
			<ShoppingList />
		</div>
	);
}
