import { History } from '@/types/history';

export const groupDataByDate = (data: any[]): [string, History[]][] => {
	return Object.entries(
		data.reduce((acc, curr) => {
			const date = new Date(curr.created_at);
			const month = date.toLocaleString('en-us', { month: 'long' });
			const year = date.getFullYear();

			const key = `${month} ${year}`;

			if (!acc[key]) {
				acc[key] = [];
			}

			const { user_id, ...rest } = curr;

			acc[key].push(rest);

			return acc;
		}, {} as Record<string, History[]>)
	);
};
