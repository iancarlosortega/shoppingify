'use client';

import { AiOutlinePlus } from 'react-icons/ai';
import useProductStore from '@/store/productStore';
import useUIStore from '@/store/uiStore';
import { classNames } from '@/utils';
import { Product } from '@/types/products';

interface Props {
	product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
	const { updateProductSelected, addProductToCart, productSelected } =
		useProductStore();
	const { isProductInformationOpen, toggleProductInformation } = useUIStore();

	const handleToggleProductInformation = () => {
		// If the product is already selected, we close the product information
		if (productSelected?.id === product.id) {
			toggleProductInformation(false);
			updateProductSelected(null);
			return;
		}

		updateProductSelected(product);

		if (!isProductInformationOpen) {
			toggleProductInformation(true);
		}
	};

	const addProduct = (e: any) => {
		e.stopPropagation();
		addProductToCart(product);
	};

	return (
		<li>
			<div
				onClick={handleToggleProductInformation}
				className={classNames(
					'bg-white mt-6 font-bold flex items-center justify-between gap-2',
					'shadow-light rounded-lg cursor-pointer',
					'dark:bg-neutral-700 dark:text-white'
				)}>
				<p className='py-2 pl-4 pr-2'>{product.name}</p>
				<button className='p-2 rounded-lg' onClick={addProduct}>
					<AiOutlinePlus className='text-gray-400' />
				</button>
			</div>
		</li>
	);
};
