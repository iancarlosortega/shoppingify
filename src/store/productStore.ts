import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Product } from '@/types/products';
import { Cart } from '@/types/cart';

type State = {
	productSelected: Product | null;
	shoppingCart: Cart;
};

type Actions = {
	updateProductSelected: (product: Product | null) => void;
	setShoppingCartName: (name: string) => void;
	toggleEdittingMode: () => void;
	addProductToCart: (product: Product) => void;
	changeProductQuantity: (product: Product, condition: Conditions) => void;
	toggleProductCheck: (product: Product) => void;
	removeProductFromCart: (product: Product) => void;
	cleanShoppingCart: () => void;
};

type Conditions = 'increase' | 'decrease';

const useProductStore = create<State & Actions>()(
	persist(
		set => ({
			productSelected: null,
			shoppingCart: { name: 'Shopping List', items: [], isEdittingMode: false },
			updateProductSelected: payload =>
				set({
					productSelected: payload,
				}),
			setShoppingCartName: payload =>
				set(state => {
					const { shoppingCart } = state;
					const updatedCart = { ...shoppingCart, name: payload };

					return {
						shoppingCart: updatedCart,
					};
				}),
			toggleEdittingMode: () =>
				set(state => {
					const { shoppingCart } = state;
					const updatedCart = {
						...shoppingCart,
						isEdittingMode: !shoppingCart.isEdittingMode,
					};

					return {
						shoppingCart: updatedCart,
					};
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
									isChecked: false,
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
							products: [{ ...payload, isChecked: false, quantity: 1 }],
						});
					}

					return {
						shoppingCart: { ...shoppingCart, items: updatedItems },
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

					return {
						shoppingCart: { ...shoppingCart, items: updatedItems },
					};
				}),
			toggleProductCheck: payload =>
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
							cart.products[productIndex].isChecked =
								!cart.products[productIndex].isChecked;
						}
						return cart;
					});

					return {
						shoppingCart: { ...shoppingCart, items: updatedItems },
					};
				}),
			removeProductFromCart: payload =>
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
							cart.products.splice(productIndex, 1);
						}
						return cart;
					});

					// And remove category if empty
					const updatedItemsFiltered = updatedItems.filter(
						item => item.products.length > 0
					);

					return {
						shoppingCart: { ...shoppingCart, items: updatedItemsFiltered },
					};
				}),
			cleanShoppingCart: () =>
				set({
					shoppingCart: {
						name: 'Shopping List',
						items: [],
						isEdittingMode: false,
					},
				}),
		}),
		{
			name: 'shoppingCart',
			storage: createJSONStorage(() => localStorage),
			partialize(state) {
				return {
					shoppingCart: state.shoppingCart,
				};
			},
		}
	)
);

export default useProductStore;
