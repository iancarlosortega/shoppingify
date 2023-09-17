'use client';

import { Button } from '@nextui-org/react';
import { AiOutlinePlus } from 'react-icons/ai';
import useProductStore from '@/store/productStore';
import useUIStore from '@/store/uiStore';
import { classNames } from '@/utils';
import { Product } from '@/types/products';

interface Props {
	product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
	const { updateProductSelected } = useProductStore();
	const { isProductInformationOpen, toggleProductInformation } = useUIStore();

	const handleClick = () => {
		updateProductSelected(product);
		if (isProductInformationOpen) return;
		toggleProductInformation(true);
	};

	return (
		<li>
			<Button
				onClick={handleClick}
				className={classNames(
					'bg-white font-bold flex items-center justify-between gap-2',
					'py-2 pl-4 pr-2 mt-6 shadow-light rounded-lg',
					'dark:bg-neutral-700 dark:text-white'
				)}>
				{product.name}
				<AiOutlinePlus className='text-gray-400' />
			</Button>
		</li>
	);
};
