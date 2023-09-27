import { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from './RegisterForm';

export const metadata: Metadata = {
	title: 'Register | Shoppingify',
	description: 'Create your shopping list with ease and style.',
};

export default function RegisterPage() {
	return (
		<div className='bg-white dark:bg-neutral-900 p-6 shadow-lg rounded-md w-[400px] max-w-[90%]'>
			<h1 className='text-center text-xl font-bold text-primary'>
				Create an account
			</h1>
			<p className='text-center text-xs text-gray-500 dark:text-gray-300'>
				Setup a new account in a minute.
			</p>

			<RegisterForm />

			<footer>
				<p className='mt-4 text-center text-sm text-gray-500 dark:text-gray-300'>
					Already have an account?{' '}
					<Link href='/auth/login' className='text-secondary underline'>
						Sign in
					</Link>
				</p>
			</footer>
		</div>
	);
}
