// Generate this type of date format: Monday 28.01.2021
export const formatDate = (date: Date): string => {
	const weekDay = date.toLocaleString('en-US', { weekday: 'short' });
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return `${weekDay} ${day < 10 ? `0${day}` : day}.${
		month < 10 ? `0${month}` : month
	}.${year}`;
};
