import { Button } from '@nextui-org/button';
import { AiOutlinePlus } from 'react-icons/ai';
import { classNames } from '@/utils';
import { Product } from '@/types/products';

interface Props {
	product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
	return (
		<li
			className={classNames(
				'bg-white font-bold flex items-center justify-between gap-2',
				'py-2 pl-4 pr-2 mt-6 shadow-light rounded-lg',
				'dark:bg-neutral-700 dark:text-white'
			)}>
			<p>{product.name}</p>
			<Button isIconOnly className='bg-transparent'>
				<AiOutlinePlus className='text-gray-400' />
			</Button>
		</li>
	);
};
