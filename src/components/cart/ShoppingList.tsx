import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { BottleIcon } from '../icons/BottleIcon';

export const ShoppingList = () => {
	return (
		<aside className='w-[400px] flex flex-col fixed right-0 min-h-screen'>
			<main className='p-8 flex-1 bg-primary-lt'>
				<header className='h-[135px] flex gap-4 bg-tertiary-dk rounded-3xl py-4 px-6 relative'>
					<div className='absolute top-[-15px]'>
						<BottleIcon />
					</div>
					<div className='w-[95px]'></div>
					<div className='flex flex-col justify-between'>
						<p className='text-white font-bold'>
							Didn&apos;t find what you need?
						</p>
						<Button className='bg-white text-black font-bold inline'>
							Add Item
						</Button>
					</div>
				</header>
			</main>
			<footer className='p-8'>
				<div className='flex relative'>
					<Input
						size='lg'
						type='text'
						placeholder='Enter a name'
						classNames={{
							inputWrapper: [
								'bg-white border border-2 border-primary',
								'focus-within:!ring-0 w-[80%] focus-within:!ring-transparent pr-10',
							],
						}}
					/>
					<Button
						size='lg'
						className='bg-primary text-white font-bold absolute right-0 z-10'>
						Save
					</Button>
				</div>
			</footer>
		</aside>
	);
};
