import { Cart } from '@/types/cart';
import { ProductListItem } from './ProductListItem';

interface Props {
	shoppingCart: Cart;
}

export const CategoriesList: React.FC<Props> = ({ shoppingCart }) => {
	return (
		<>
			{shoppingCart.items.map(item => (
				<div key={item.id} className='my-6'>
					<h5 className='text-[#828282] text-sm'>{item.category}</h5>
					<ul>
						{item.products.map(product => (
							<ProductListItem key={product.id} product={product} />
						))}
					</ul>
				</div>
			))}
		</>
	);
};