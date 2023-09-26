'use client';

import { getChartData } from '@/utils';
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

interface Props {
	data: any;
}

export const Chart: React.FC<Props> = ({ data }) => {
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
				<Tooltip />
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
