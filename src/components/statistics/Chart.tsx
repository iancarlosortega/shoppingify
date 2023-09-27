'use client';

import {
	ResponsiveContainer,
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Line,
} from 'recharts';
import { getChartData } from '@/utils';
import { ChartStatistics } from '@/utils/getNumberOfItemsByMonth';
import useUIStore from '@/store/uiStore';

interface Props {
	data: ChartStatistics[];
}

export const Chart: React.FC<Props> = ({ data }) => {
	const { theme } = useUIStore();
	const chartData = getChartData(
		data.filter(
			(item: any) => item.year === new Date().getFullYear().toString()
		)
	);

	return (
		<ResponsiveContainer width='100%' height='100%'>
			<LineChart width={500} height={300} data={chartData}>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='month' />
				<YAxis />
				<Tooltip
					contentStyle={{
						backgroundColor: theme === 'light' ? '#FAFAFE' : '#1A1A1A',
						borderRadius: '10px',
						color: theme === 'light' ? '#000' : '#fff',
					}}
				/>
				<Legend />
				<Line
					type='monotone'
					dataKey='items'
					stroke='#F9A109'
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};
