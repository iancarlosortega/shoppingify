import { create } from 'zustand';

type State = {
	isShoppingListOpen: boolean;
};

type Actions = {
	toggleShoppingList: () => void;
};

const useUIStore = create<State & Actions>()(set => ({
	isShoppingListOpen: false,
	toggleShoppingList: () =>
		set(state => ({ isShoppingListOpen: !state.isShoppingListOpen })),
}));

export default useUIStore;
