import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login | Shoppingify',
	description: 'Create your shopping list with ease and style.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
