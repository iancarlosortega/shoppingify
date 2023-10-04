import Link from 'next/link';
import { FaRegSadTear } from 'react-icons/fa';

export default function NotFoundPage() {
	return (
		<main className='h-[calc(100vh-5rem)] flex flex-col items-center justify-center'>
			<FaRegSadTear className='w-20 h-20 text-gray-600 dark:text-gray-200' />
			<h3 className='text-3xl text-gray-600 dark:text-gray-400 font-bold'>
				Not Found
			</h3>
			<p className='text-gray-400 dark:text-gray-200'>
				Go back to{' '}
				<Link className='font-bold text-lg' href='/history'>
					History
				</Link>
			</p>
		</main>
	);
}
