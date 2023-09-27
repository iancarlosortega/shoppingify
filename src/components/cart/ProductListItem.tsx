'use client';

import { useEffect, useState } from 'react';
import { Button, Checkbox } from '@nextui-org/react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import useProductStore from '@/store/productStore';
import { Product } from '@/types/products';

interface Props {
	product: Product;
}

export const ProductListItem: React.FC<Props> = ({ product }) => {
	const [isEditting, setIsEditting] = useState(false);
	const {
		shoppingCart,
		changeProductQuantity,
		removeProductFromCart,
		toggleProductCheck,
	} = useProductStore();

	const handleToggleEditting = () => {
		if (shoppingCart.isEdittingMode) return;
		setIsEditting(!isEditting);
	};

	useEffect(() => {
		setIsEditting(false);
	}, [shoppingCart.isEdittingMode]);

	return (
		<li className='flex justify-between items-center h-12 my-3 px-1 relative overflow-hidden'>
			{shoppingCart.isEdittingMode ? (
				<Checkbox
					onValueChange={() => toggleProductCheck(product)}
					lineThrough={product.isChecked}
					isSelected={product.isChecked}
					classNames={{
						wrapper: 'animate-appearance-in',
						label: 'text-lg font-semibold',
					}}>
					{product.name}
				</Checkbox>
			) : (
				<p className='text-lg font-semibold'>{product.name}</p>
			)}
			<div
				className={`${
					isEditting
						? 'bg-white dark:bg-neutral-900 opacity-1 translate-x-0 visible'
						: 'bg-primary-lt opacity-0 translate-x-[80px] invisible'
				} flex items-center rounded-full h-10 absolute right-0 transition-all`}>
				<Button
					radius='lg'
					isIconOnly
					className='bg-primary'
					onPress={() => removeProductFromCart(product)}>
					<MdOutlineDeleteOutline className='text-white font-bold' />
				</Button>
				<Button
					isIconOnly
					className='bg-transparent mr-8'
					onPress={() => changeProductQuantity(product, 'decrease')}>
					<AiOutlineMinus className='text-primary font-bold' />
				</Button>
				<Button
					isIconOnly
					className='bg-transparent ml-8'
					onPress={() => changeProductQuantity(product, 'increase')}>
					<AiOutlinePlus className='text-primary font-bold' />
				</Button>
			</div>
			<Button
				size='sm'
				radius='full'
				variant='bordered'
				onPress={handleToggleEditting}
				className={`${
					isEditting ? '-translate-x-10' : 'translate-x-0'
				} border-primary text-primary border-2 font-bold my-1 absolute right-1 transition-all duration-1000 ease-in`}>
				{product.quantity} <span className='font-medium'>pcs</span>
			</Button>
		</li>
	);
};
