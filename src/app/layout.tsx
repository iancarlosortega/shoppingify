import './globals.css';
import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import { Providers } from '@/providers';

const quicksand = Quicksand({
	weight: ['500', '600', '700'],
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
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
