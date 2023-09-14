'use client';

import useUIStore from '@/store/uiStore';

interface Props {
	children: React.ReactNode;
}

export const MainContent: React.FC<Props> = ({ children }) => {
	const { isShoppingListOpen } = useUIStore();

	return (
		<main
			className={`${
				isShoppingListOpen ? 'lg:mr-[400px]' : 'lg:mr-0'
			} min-h-screen h-full bg-background ml-[80px] mr-0 p-6 md:p-12 lg:px-24 transition-all duration-300 ease-in`}>
			{children}
		</main>
	);
};
