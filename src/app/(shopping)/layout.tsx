import type { Metadata } from 'next';
import { MainContent } from '@/components/MainContent';
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
		<div className='min-h-screen h-full w-full'>
			<Sidebar />
			<MainContent>{children}</MainContent>
			<ShoppingList />
		</div>
	);
}
