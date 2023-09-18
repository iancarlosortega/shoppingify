import { create } from 'zustand';
import { Product } from '@/types/products';
import { Cart } from '@/types/cart';

type State = {
	productSelected: Product | null;
	shoppingCart: Cart;
};

type Actions = {
	updateProductSelected: (product: Product | null) => void;
	addProductToCart: (product: Product) => void;
	changeProductQuantity: (product: Product, condition: Conditions) => void;
};

type Conditions = 'increase' | 'decrease';

const useProductStore = create<State & Actions>()(set => ({
	productSelected: null,
	shoppingCart: JSON.parse(
		localStorage.getItem('shoppingCart') ?? JSON.stringify({ items: [] })
	),
	updateProductSelected: payload =>
		set({
			productSelected: payload,
		}),
	addProductToCart: payload =>
		set(state => {
			const { shoppingCart } = state;
			const { category, id } = payload;

			const cartIndex = shoppingCart?.items.findIndex(
				item => item.id === category.id
			);

			const updatedItems = shoppingCart.items.map((cart, index) => {
				if (index === cartIndex) {
					const productIndex = cart.products.findIndex(
						product => product.id === id
					);
					if (productIndex === -1) {
						cart.products.push({
							...payload,
							quantity: 1,
						});
					} else {
						cart.products[productIndex].quantity!++;
					}
				}
				return cart;
			});

			if (cartIndex === -1) {
				updatedItems.push({
					id: category.id,
					category: category.name,
					products: [{ ...payload, quantity: 1 }],
				});
			}

			const updatedCart = { ...shoppingCart, items: updatedItems };
			setInterval(() => {
				localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
			}, 100);

			return {
				shoppingCart: updatedCart,
			};
		}),
	changeProductQuantity: (payload, condition) =>
		set(state => {
			const { shoppingCart } = state;
			const { category, id } = payload;

			const cartIndex = shoppingCart?.items.findIndex(
				item => item.id === category.id
			);

			const updatedItems = shoppingCart.items.map((cart, index) => {
				if (index === cartIndex) {
					const productIndex = cart.products.findIndex(
						product => product.id === id
					);
					if (condition === 'decrease') {
						if (cart.products[productIndex].quantity! > 1) {
							cart.products[productIndex].quantity!--;
						}
					} else cart.products[productIndex].quantity!++;
				}
				return cart;
			});

			const updatedCart = { ...shoppingCart, items: updatedItems };
			setInterval(() => {
				localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
			}, 100);

			return {
				shoppingCart: updatedCart,
			};
		}),
}));

export default useProductStore;
