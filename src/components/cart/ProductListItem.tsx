'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import useProductStore from '@/store/productStore';
import { Product } from '@/types/products';

interface Props {
	product: Product;
}

export const ProductListItem: React.FC<Props> = ({ product }) => {
	const [isEditting, setIsEditting] = useState(false);
	const { changeProductQuantity } = useProductStore();

	return (
		<li className='flex justify-between items-center my-3 relative overflow-hidden'>
			<p className='text-lg font-semibold'>{product.name}</p>
			<div
				className={`${
					isEditting
						? 'bg-white opacity-1 translate-x-0'
						: 'bg-primary-lt opacity-0 translate-x-[80px]'
				} flex items-center rounded-full h-10 relative transition-all`}>
				<Button radius='lg' isIconOnly className='bg-primary'>
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
				onPress={() => setIsEditting(!isEditting)}
				className={`border-primary text-primary border-2 font-bold my-1 absolute ${
					isEditting ? '-translate-x-10' : 'translate-x-0'
				} right-0 transition-all duration-1000 ease-in`}>
				{product.quantity} <span className='font-medium'>pcs</span>
			</Button>
		</li>
	);
};
