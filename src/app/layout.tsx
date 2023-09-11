import './globals.css';
import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import { Providers } from '@/providers';
import { Sidebar } from '@/components/UI/Sidebar';
import { ShoppingList } from '@/components/UI/ShoppingList';

const quicksand = Quicksand({
	weight: ['500', '700'],
	subsets: ['latin'],
});

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
		<html lang='es'>
			<body className={quicksand.className}>
				<Providers>
					<div className='flex h-screen w-full'>
						<Sidebar />
						<main className='flex-1 bg-background'>{children}</main>
						<ShoppingList />
					</div>
				</Providers>
			</body>
		</html>
	);
}
