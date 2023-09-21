import { create } from 'zustand';

type State = {
	isShoppingListOpen: boolean;
	isAddItemFormOpen: boolean;
	isProductInformationOpen: boolean;
	theme: string;
};

type Actions = {
	toggleShoppingList: () => void;
	toggleAddItemForm: () => void;
	toggleProductInformation: (value: boolean) => void;
	setTheme: (theme: string) => void;
};

const getInitialTheme = (): string => {
	if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
		return localStorage.getItem('theme')!;
	}
	if (
		typeof window != 'undefined' &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	) {
		return 'dark';
	}
	return 'light';
};

const useUIStore = create<State & Actions>()(set => ({
	isShoppingListOpen: false,
	isAddItemFormOpen: false,
	isProductInformationOpen: false,
	theme: getInitialTheme(),
	toggleShoppingList: () =>
		set(state => ({ isShoppingListOpen: !state.isShoppingListOpen })),
	toggleAddItemForm: () =>
		set(state => ({ isAddItemFormOpen: !state.isAddItemFormOpen })),
	toggleProductInformation: value => set({ isProductInformationOpen: value }),
	setTheme: theme => set({ theme }),
}));

export default useUIStore;
