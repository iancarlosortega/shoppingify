import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { MdEmail } from 'react-icons/md';
import { AiTwotoneLock } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';

export const metadata: Metadata = {
	title: 'Register | Shoppingify',
	description: 'Create your shopping list with ease and style.',
};

export default function RegisterPage() {
	return (
		<div className='bg-white p-6 shadow-lg rounded-md w-[400px] max-w-[90%]'>
			<h1 className='text-center text-2xl font-bold text-primary'>
				Create an account
			</h1>
			<p className='text-center text-sm text-gray-500'>
				Setup a new account in a minute.
			</p>

			<form>
				<Input
					classNames={{
						inputWrapper: 'mt-8',
					}}
					placeholder='Full name'
					type='text'
					label='Name'
					startContent={<BsFillPersonFill />}
				/>

				<Input
					classNames={{
						inputWrapper: 'mt-4',
					}}
					placeholder='example@test.com'
					type='email'
					label='Email'
					startContent={<MdEmail />}
				/>

				<Input
					classNames={{
						inputWrapper: 'mt-4',
					}}
					placeholder='Password'
					type='Password'
					label='Password'
					startContent={<AiTwotoneLock />}
				/>

				<Button
					fullWidth
					className='bg-secondary text-white font-bold mt-6 mb-4'>
					Login
				</Button>

				<footer>
					<p className='mt-4 text-center text-sm text-gray-500'>
						Already have an account?{' '}
						<Link href='/login' className='text-secondary underline'>
							Sign in
						</Link>
					</p>
				</footer>
			</form>
		</div>
	);
}
