'use client';

import { NextUIProvider } from '@nextui-org/react';

interface Props {
	children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
	return <NextUIProvider>{children}</NextUIProvider>;
};
