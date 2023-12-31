'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button, Input, Tooltip, useDisclosure } from '@nextui-org/react';
import {
	MdOutlineEdit,
	MdOutlineEditOff,
	MdRemoveShoppingCart,
} from 'react-icons/md';
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
import { ConfirmClearList } from '../modals/ConfirmClearList';

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
	const {
		isOpen: isOpenClear,
		onOpen: onOpenClear,
		onOpenChange: onOpenChangeClear,
		onClose: onCloseClear,
	} = useDisclosure();

	const supabase = createClientComponentClient<Database>();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		reset,
		setFocus,
		formState: { errors },
	} = useForm<IFormValues>();

	const onSubmit = (formData: IFormValues) => {
		setShoppingCartName(formData.name);
		reset();
	};

	const handleEdittingMode = () => {
		toggleEdittingMode();
		if (shoppingCart.isEdittingMode) setFocus('name');
	};

	const markAsComplete = async () => {
		const { error } = await supabase.from('shopping_lists').insert({
			name: shoppingCart.name,
			state: 'completed',
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
		router.refresh();
	};

	return (
		<aside
			className={` ${
				isShoppingListOpen ? 'translate-x-0' : 'translate-x-[400px]'
			} w-[400px] max-w-[80%] lg:translate-x-0 flex flex-col fixed top-0 right-0 h-full transition-transform duration-300 ease-in`}>
			<div className='p-8 flex h-[calc(100%-8rem)] flex-col bg-primary-lt dark:bg-neutral-800'>
				<header className='h-[135px] flex gap-4 bg-tertiary-dk rounded-3xl py-4 px-6 relative'>
					<div className='absolute left-0 md:left-auto top-[-15px]'>
						<BottleIcon />
					</div>
					<div className='w-[95px]'></div>
					<div className='flex flex-col gap-2 justify-between'>
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
					<div className='flex justify-start gap-2 w-[80%]'>
						<h3 className='text-2xl font-bold truncate'>{shoppingCart.name}</h3>
						<Tooltip
							hidden={shoppingCart.items.length === 0}
							showArrow
							content='toggle edit mode'
							placement='bottom'
							closeDelay={300}
							classNames={{
								base: 'shadow-xl text-white bg-dark',
								arrow: 'bg-dark',
							}}>
							<button
								disabled={shoppingCart.items.length === 0}
								onClick={handleEdittingMode}
								className={classNames(
									'bg-transparent',
									'hover:text-gray-700 transition-colors ease-in',
									'dark:text-gray-500 dark:hover:text-gray-300',
									'disabled:text-gray-700 disabled:cursor-not-allowed'
								)}>
								{shoppingCart.isEdittingMode ? (
									<MdOutlineEdit className='h-6 w-6' />
								) : (
									<MdOutlineEditOff className='h-6 w-6' />
								)}
							</button>
						</Tooltip>
					</div>
					<Tooltip
						hidden={shoppingCart.items.length === 0}
						showArrow
						content='clear list'
						placement='bottom'
						closeDelay={300}
						classNames={{
							base: 'shadow-xl text-white bg-dark',
							arrow: 'bg-dark',
						}}>
						<button
							disabled={shoppingCart.items.length === 0}
							onClick={onOpenClear}
							className={classNames(
								'bg-transparent mr-2',
								'hover:text-gray-700 transition-colors ease-in',
								'dark:text-gray-500 dark:hover:text-gray-300',
								'disabled:text-gray-700 disabled:cursor-not-allowed'
							)}>
							<MdRemoveShoppingCart className='h-6 w-6' />
						</button>
					</Tooltip>
				</div>

				<main
					className={`h-full ${
						shoppingCart.items.length > 0
							? 'overflow-y-scroll'
							: 'overflow-y-visible'
					}`}>
					{shoppingCart.items.length === 0 ? (
						<div className='h-full flex items-center justify-center relative'>
							<p className='font-bold'>No Items</p>
							<NoItemsDraw className='absolute -bottom-10 left-[13%] z-10' />
						</div>
					) : (
						<CategoriesList shoppingCart={shoppingCart} />
					)}
				</main>
			</div>

			<footer className='p-8 h-[8rem] bg-white dark:bg-neutral-900 relative'>
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
								'border border-2 border-primary',
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
							maxLength: {
								value: 30,
								message: 'Maximum length should be 30',
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
					} absolute top-0 right-0 w-full bg-white dark:bg-neutral-900 z-20 p-8 flex justify-center gap-4 transition-all`}>
					<Button
						size='lg'
						className='bg-transparent dark:text-gray-500 font-bold hover:bg-sky-200 dark:hover:bg-gray-200'
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

			<ConfirmClearList
				isOpen={isOpenClear}
				onChange={onOpenChangeClear}
				onClose={onCloseClear}
			/>
		</aside>
	);
};
