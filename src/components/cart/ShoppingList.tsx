'use client';

import { useForm } from 'react-hook-form';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button, Input, useDisclosure } from '@nextui-org/react';
import { MdOutlineEdit } from 'react-icons/md';
import { toast } from 'sonner';
import useAuthStore from '@/store/authStore';
import useUIStore from '@/store/uiStore';
import useProductStore from '@/store/productStore';
import { BottleIcon } from '@/components/icons/BottleIcon';
import { CategoriesList } from './CategoriesList';
import { NoItemsDraw } from '../UI/NoItemsDraw';
import { classNames } from '@/utils';
import { Database } from '@/types/database';
import { ConfirmCancelList } from '../modals/ConfirmCancelList';

interface IFormValues {
	name: string;
}

export const ShoppingList = () => {
	const { user } = useAuthStore();
	const { isShoppingListOpen, toggleAddItemForm } = useUIStore();
	const {
		shoppingCart,
		setShoppingCartName,
		toggleEdittingMode,
		cleanShoppingCart,
	} = useProductStore();
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

	const supabase = createClientComponentClient<Database>();
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

	const markAsComplete = async () => {
		const { error } = await supabase.from('shopping_lists').insert({
			name: shoppingCart.name,
			state: true,
			items: shoppingCart.items,
			user_id: user!.id,
		});

		if (error) {
			console.log(error);
			toast.error(error.message);
			return;
		}

		toast.success('Shopping List Completed');
		cleanShoppingCart();
	};

	return (
		<aside
			className={` ${
				isShoppingListOpen ? 'translate-x-0' : 'translate-x-[400px]'
			} w-[400px] max-w-[80%] lg:translate-x-0 flex flex-col fixed top-0 right-0 h-full transition-transform duration-300 ease-in`}>
			<div className='p-8 flex flex-1 flex-col bg-primary-lt dark:bg-neutral-800'>
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

				<div className='flex items-center justify-between my-6'>
					<h3 className='text-2xl font-bold'>{shoppingCart.name}</h3>
					<button onClick={toggleEdittingMode} className='bg-transparent mr-2'>
						<MdOutlineEdit className='h-6 w-6' />
					</button>
				</div>

				<main className='flex-1'>
					{shoppingCart.items.length === 0 ? (
						<div className='h-full flex items-center justify-center relative'>
							<p>No Items</p>
							<NoItemsDraw className='absolute -bottom-10 left-[13%] z-10' />
						</div>
					) : (
						<CategoriesList shoppingCart={shoppingCart} />
					)}
				</main>
			</div>

			<footer className='p-8 bg-white dark:bg-neutral-900 relative'>
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
						isDisabled={shoppingCart.items.length === 0}
						classNames={{
							inputWrapper: [
								'border border-2 border-primary dark:border-none',
								'focus-within:!ring-0 w-[80%] focus-within:!ring-transparent pr-10',
								'group-data-[disabled=true]:!border-gray-300',
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
						isDisabled={shoppingCart.items.length === 0}
						className={classNames(
							'bg-primary text-white font-bold absolute right-0 z-10',
							'disabled:bg-gray-300 opacity-1'
						)}>
						Save
					</Button>
				</form>

				<div
					className={`${
						shoppingCart.isEdittingMode
							? 'opacity-1 translate-x-0 visible'
							: 'opacity-0 translate-x-[80px] invisible'
					} absolute top-0 right-0 w-full bg-white z-20 p-8 flex justify-center gap-4 transition-all`}>
					<Button
						size='lg'
						className='bg-transparent dark:text-gray-500 font-bold hover:bg-sky-200'
						onPress={onOpen}>
						Cancel
					</Button>

					<Button
						size='lg'
						className='bg-secondary text-white font-bold'
						onClick={markAsComplete}>
						Complete
					</Button>
				</div>
			</footer>
			<ConfirmCancelList
				isOpen={isOpen}
				onChange={onOpenChange}
				onClose={onClose}
			/>
		</aside>
	);
};
