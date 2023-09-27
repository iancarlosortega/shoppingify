import { UpdatePasswordForm } from './UpdatePasswordForm';

export default function UpdatePasswordPage() {
	return (
		<div className='bg-white dark:bg-neutral-900 p-6 shadow-lg rounded-md w-[400px] max-w-[90%]'>
			<h1 className='text-center text-xl font-bold text-primary'>
				Update Password
			</h1>
			<p className='text-center text-xs text-gray-500 dark:text-gray-300'>
				Enter your email address and your new password.
			</p>

			<UpdatePasswordForm />
		</div>
	);
}
