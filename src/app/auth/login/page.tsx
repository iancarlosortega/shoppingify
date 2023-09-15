import { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
	title: 'Login | Shoppingify',
	description: 'Create your shopping list with ease and style.',
};

export default function LoginPage() {
	return (
		<div className='bg-white dark:bg-neutral-900 p-6 shadow-lg rounded-md w-[400px] max-w-[90%]'>
			<h1 className='text-center text-2xl font-bold text-primary'>
				Login your account
			</h1>
			<p className='text-center text-sm text-gray-500 dark:text-gray-300'>
				Use your credentials to access your account.
			</p>

			<LoginForm />

			<footer>
				<p className='mt-2 text-center text-sm text-gray-500 dark:text-gray-300'>
					Don&apos;t have an account?{' '}
					<Link href='/auth/register' className='text-secondary underline'>
						Sign up
					</Link>
				</p>
			</footer>
		</div>
	);
}
