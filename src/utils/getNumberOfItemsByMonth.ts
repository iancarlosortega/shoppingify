import { groupDataByDate } from './groupDataByDate';

interface ChartStatistics {
	month: string;
	year: string;
	numberOfItems: number;
}

export const getNumberOfItemsByMonth = (data: any[]) => {
	let chartStatistics: ChartStatistics[] = [];
	const groupedResults = groupDataByDate(data);

	groupedResults.forEach(([key, value], index) => {
		const date = key.split(' ');
		chartStatistics.push({
			month: date[0],
			year: date[1],
			numberOfItems: 0,
		});
		value.forEach(list => {
			list.items.forEach(category => {
				category.products?.forEach(product => {
					chartStatistics[index].numberOfItems += product.quantity || 1;
				});
			});
		});
	});

	return chartStatistics;
};
