'use client';

import { useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import useAuthStore from '@/store/authStore';

interface Props {
	session: Session | null;
	children: React.ReactNode;
}

export const MainContent: React.FC<Props> = ({ session, children }) => {
	const { updateLoginUser } = useAuthStore();

	useEffect(() => {
		if (session) {
			updateLoginUser({
				id: session.user.id,
				email: session.user.email!,
				fullName: session.user.user_metadata.full_name,
			});
		}
	}, [session, updateLoginUser]);

	return (
		<main className='min-h-screen h-full bg-light-gray dark:bg-zinc-900 ml-[80px] lg:mr-[400px] p-6 md:p-12 lg:px-24 transition-all duration-300 ease-in'>
			{children}
		</main>
	);
};
