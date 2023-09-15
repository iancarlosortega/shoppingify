import { create } from 'zustand';

type State = {
	isShoppingListOpen: boolean;
	theme: string;
};

type Actions = {
	toggleShoppingList: () => void;
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
	theme: getInitialTheme(),
	toggleShoppingList: () =>
		set(state => ({ isShoppingListOpen: !state.isShoppingListOpen })),
	setTheme: theme => set({ theme }),
}));

export default useUIStore;
