import { User } from '@/interfaces/user';
import { create } from 'zustand';

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
