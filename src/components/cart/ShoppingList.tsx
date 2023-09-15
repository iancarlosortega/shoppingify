'use client';

import { Button, Input } from '@nextui-org/react';
import useUIStore from '@/store/uiStore';
import { BottleIcon } from '../icons/BottleIcon';

export const ShoppingList = () => {
	const { isShoppingListOpen, toggleAddItemForm } = useUIStore();

	return (
		<aside
			className={` ${
				isShoppingListOpen ? 'translate-x-0' : 'translate-x-[400px]'
			} w-[400px] max-w-[80%] lg:translate-x-0 flex flex-col fixed top-0 right-0 h-full transition-transform duration-300 ease-in`}>
			<main className='p-8 flex-1 bg-primary-lt dark:bg-orange-800'>
				<header className='h-[135px] flex gap-4 bg-tertiary-dk rounded-3xl py-4 px-6 relative'>
					<div className='absolute left-0 md:left-auto top-[-15px]'>
						<BottleIcon />
					</div>
					<div className='w-[95px]'></div>
					<div className='flex flex-col justify-between'>
						<p className='text-white font-bold'>
							Didn&apos;t find what you need?
						</p>
						<Button
							onClick={toggleAddItemForm}
							className='bg-white text-black font-bold inline'>
							Add Item
						</Button>
					</div>
				</header>
			</main>
			<footer className='p-8 bg-white dark:bg-orange-900'>
				<div className='flex relative'>
					<Input
						size='lg'
						type='text'
						placeholder='Enter a name'
						classNames={{
							inputWrapper: [
								'bg-white border border-2 border-primary hover:!bg-white focus-within:!bg-white',
								'focus-within:!ring-0 w-[80%] focus-within:!ring-transparent pr-10',
								'dark:text-black',
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
