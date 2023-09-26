import { MONTHS } from '@/constants';

export const getChartData = (data: any) => {
	let result = [];
	const monthsData = data.map((item: any) => item.month);
	const monthsBetween = getFirstAndLastMonth(monthsData);

	for (let i = monthsBetween.firstMonth; i <= monthsBetween.lastMonth; i++) {
		const month = MONTHS[i];
		const monthData = data.find((item: any) => item.month === month);
		result.push({
			items: monthData?.numberOfItems || 0,
			year: 2023,
			...monthData,
			month,
		});
	}

	return result;
};

const getFirstAndLastMonth = (data: string[]) => {
	let result: any = data.reduce(
		(acc, cur) => {
			const value = MONTHS.indexOf(cur);
			if (value === -1) return acc;
			if (acc.firstMonth === 0) acc.firstMonth = value;
			if (acc.lastMonth === 0) acc.lastMonth = value;
			if (value < acc.firstMonth) {
				acc.firstMonth = value;
			} else if (value > acc.lastMonth) {
				acc.lastMonth = value;
			}
			return acc;
		},
		{
			firstMonth: 0,
			lastMonth: 0,
		}
	);

	return result;
};
