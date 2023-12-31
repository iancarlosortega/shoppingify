import { ProductCard } from './ProductCard';
import { Category } from '@/types/categories';

interface Props {
	categories: Category[];
	showQuantities?: boolean;
}

export const CategoriesList: React.FC<Props> = ({
	categories,
	showQuantities = false,
}) => {
	return (
		<>
			{categories.map(
				category =>
					category.products!.length > 0 && (
						<div key={category.id} className='my-8'>
							<h3 className='text-xl font-semibold'>{category.name}</h3>
							<ul className='flex flex-wrap gap-4'>
								{category.products?.map(product => (
									<ProductCard
										key={product.id}
										product={product}
										showQuantity={showQuantities}
									/>
								))}
							</ul>
						</div>
					)
			)}
		</>
	);
};
