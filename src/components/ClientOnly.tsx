'use client';

import { useEffect, useState } from 'react';

interface Props {
	children: React.ReactNode;
}

export const ClientOnly: React.FC<Props> = ({ children }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return <>{children}</>;
};
