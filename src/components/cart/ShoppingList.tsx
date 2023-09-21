'use client';

import { Button, Input } from '@nextui-org/react';
import { MdOutlineEdit } from 'react-icons/md';
import useUIStore from '@/store/uiStore';
import useProductStore from '@/store/productStore';
import { BottleIcon } from '@/components/icons/BottleIcon';
import { CategoriesList } from './CategoriesList';
import { useForm } from 'react-hook-form';

interface IFormValues {
	name: string;
}

export const ShoppingList = () => {
	const { isShoppingListOpen, toggleAddItemForm } = useUIStore();
	const { shoppingCart, setShoppingCartName } = useProductStore();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormValues>();

	const onSubmit = (formData: IFormValues) => {
		setShoppingCartName(formData.name);
		reset();
	};

	return (
		<aside
			className={` ${
				isShoppingListOpen ? 'translate-x-0' : 'translate-x-[400px]'
			} w-[400px] max-w-[80%] lg:translate-x-0 flex flex-col fixed top-0 right-0 h-full transition-transform duration-300 ease-in`}>
			<div className='p-8 flex flex-1 overflow-y-scroll flex-col bg-primary-lt dark:bg-neutral-800'>
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

				<main>
					<div className='flex items-center justify-between my-6'>
						<h3 className='text-2xl font-bold'>
							{shoppingCart.name ? shoppingCart.name : 'Shopping List'}
						</h3>
						<button className='bg-transparent mr-2'>
							<MdOutlineEdit className='h-6 w-6' />
						</button>
					</div>
					<CategoriesList shoppingCart={shoppingCart} />
				</main>
			</div>
			<footer className='p-8 bg-white dark:bg-neutral-900'>
				<form
					autoComplete='off'
					onSubmit={handleSubmit(onSubmit)}
					className='flex relative'>
					<Input
						size='lg'
						type='text'
						placeholder='Change name'
						color={errors.name ? 'danger' : undefined}
						errorMessage={errors.name?.message}
						classNames={{
							inputWrapper: [
								'border border-2 border-primary dark:border-none',
								'focus-within:!ring-0 w-[80%] focus-within:!ring-transparent pr-10',
							],
						}}
						{...register('name', {
							required: 'This field is required',
							minLength: {
								value: 3,
								message: 'Minimum length should be 3',
							},
						})}
					/>
					<Button
						size='lg'
						type='submit'
						className='bg-primary text-white font-bold absolute right-0 z-10'>
						Save
					</Button>
				</form>
			</footer>
		</aside>
	);
};
