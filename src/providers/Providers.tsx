'use client';

import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'sonner';

interface Props {
	children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
	return (
		<NextUIProvider>
			<Toaster richColors position='top-right' />
			{children}
		</NextUIProvider>
	);
};
