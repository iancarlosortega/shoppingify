import { create } from 'zustand';

type State = {
	isShoppingListOpen: boolean;
	isAddItemFormOpen: boolean;
	theme: string;
};

type Actions = {
	toggleShoppingList: () => void;
	toggleAddItemForm: () => void;
	setTheme: (theme: string) => void;
};

const getInitialTheme = (): string => {
	if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
		return localStorage.getItem('theme')!;
	}
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}
	return 'light';
};

const useUIStore = create<State & Actions>()(set => ({
	isShoppingListOpen: false,
	isAddItemFormOpen: false,
	theme: getInitialTheme(),
	toggleShoppingList: () =>
		set(state => ({ isShoppingListOpen: !state.isShoppingListOpen })),
	toggleAddItemForm: () =>
		set(state => ({ isAddItemFormOpen: !state.isAddItemFormOpen })),
	setTheme: theme => set({ theme }),
}));

export default useUIStore;
