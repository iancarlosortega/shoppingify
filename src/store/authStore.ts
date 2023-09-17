import { create } from 'zustand';

interface User {
	id: string;
	fullName: string;
	email: string;
}

type State = {
	user?: User;
};

type Actions = {
	updateLoginUser: (user: User) => void;
};

const useAuthStore = create<State & Actions>()(set => ({
	updateLoginUser: payload =>
		set({
			user: payload,
		}),
}));

export default useAuthStore;
