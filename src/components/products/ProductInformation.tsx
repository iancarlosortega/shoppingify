'use client';

import Image from 'next/image';
import { Button, useDisclosure } from '@nextui-org/react';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { ConfirmDeleteProduct } from '@/components/modals/ConfirmDeleteProduct';
import useUIStore from '@/store/uiStore';
import useProductStore from '@/store/productStore';
import { classNames } from '@/utils';

export const ProductInformation = () => {
	const {
		productSelected: product,
		addProductToCart,
		shoppingCart,
	} = useProductStore();
	const { isProductInformationOpen, toggleProductInformation } = useUIStore();
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

	const handleAddProductToList = () => {
		addProductToCart(product!);
		toggleProductInformation(false);
		localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
	};

	return (
		<aside
			className={classNames(
				`
      ${isProductInformationOpen ? 'translate-x-0' : 'translate-x-[400px]'}`,
				'w-[400px] max-w-[80%] flex flex-col fixed top-0 right-0 h-full',
				'transition-transform duration-300 ease-in overflow-y-scroll',
				'bg-white px-8 py-4 dark:bg-neutral-900'
			)}>
			<header>
				<button
					onClick={() => toggleProductInformation(false)}
					className='text-primary w-auto bg-transparent flex items-center justify-start gap-2 font-bold'>
					<HiArrowLongLeft />
					back
				</button>

				<div className='my-2'>
					<Image
						src={
							product?.image
								? product?.image
								: '/images/no-image-placeholder.png'
						}
						alt='Product Image'
						width={400}
						height={200}
						className='rounded-lg object-cover aspect-video h-[225px]'
					/>
				</div>
			</header>

			<section className='flex-1'>
				<div className='my-2'>
					<h2 className='text-sm text-[#C1C1C4] font-bold'>name</h2>
					<p className='text-xl font-bold'>{product?.name}</p>
				</div>

				<div className='my-2'>
					<h2 className='text-sm text-[#C1C1C4] font-bold'>category</h2>
					<p className='text-lg font-bold'>{product?.category.name}</p>
				</div>

				<div className='my-2'>
					<h2 className='text-sm text-[#C1C1C4] font-bold'>note</h2>
					<p className='text-lg font-bold'>
						{product?.note ? product?.note : 'No note'}
					</p>
				</div>
			</section>

			<footer className='flex justify-center gap-4 mt-8 mb-4'>
				<Button
					size='lg'
					className='bg-transparent dark:text-gray-500 font-bold hover:bg-sky-200'
					onPress={onOpen}>
					Delete
				</Button>

				<Button
					size='lg'
					className='bg-primary text-white font-bold'
					onPress={handleAddProductToList}>
					Add to list
				</Button>
			</footer>

			<ConfirmDeleteProduct
				isOpen={isOpen}
				onChange={onOpenChange}
				onClose={onClose}
			/>
		</aside>
	);
};
