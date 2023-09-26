import { Category } from '@/types/categories';
import { Product } from '@/types/products';

interface TopStatistics {
	topCategories: Record<string, number>;
	topProducts: Record<string, number>;
}

export const getTopStatistics = (data: any[], limit = 3) => {
	let topStatistics: TopStatistics = {
		topCategories: {},
		topProducts: {},
	};

	let totalCategories = 0;
	let totalProducts = 0;

	data.forEach(list => {
		list.items.forEach((category: Category) => {
			if (!topStatistics.topCategories[category.name]) {
				topStatistics.topCategories[category.name] = 0;
			}
			topStatistics.topCategories[category.name] += 1;
			totalCategories += 1;
			category.products?.forEach((product: Product) => {
				if (!topStatistics.topProducts[product.name]) {
					topStatistics.topProducts[product.name] = 0;
				}
				topStatistics.topProducts[product.name] += product.quantity || 1;
				totalProducts += product.quantity || 1;
			});
		});
	});

	topStatistics.topCategories = Object.entries(topStatistics.topCategories)
		.sort((a: any, b: any) => b[1] - a[1])
		.slice(0, limit)
		.reduce((obj: any, [key, value]) => {
			obj[key] = getPercentage(value, totalCategories);
			return obj;
		}, {});

	topStatistics.topProducts = Object.entries(topStatistics.topProducts)
		.sort((a: any, b: any) => b[1] - a[1])
		.slice(0, limit)
		.reduce((obj: any, [key, value]) => {
			obj[key] = getPercentage(value, totalProducts);
			return obj;
		}, {});

	return topStatistics;
};

const getPercentage = (value: number, total: number) => {
	return Math.round((value / total) * 100);
};
