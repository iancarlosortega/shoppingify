import { Progress } from '@nextui-org/progress';

interface Props {
	title: string;
	items: Record<string, number>;
	color?:
		| 'default'
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| undefined;
}

export const TopItems: React.FC<Props> = ({
	title,
	items,
	color = 'primary',
}) => {
	return (
		<div>
			<h3 className='text-2xl md:text-3xl font-semibold mb-6'>{title}</h3>
			<ul>
				{Object.entries(items ?? []).map(([name, value]) => (
					<li key={name} className='my-6'>
						<div className='flex items-center justify-between mb-2'>
							<p className='text-sm font-bold'>{name}</p>
							<p className='text-lg font-bold'>{value}%</p>
						</div>
						<Progress aria-label='Percentage' value={value} color={color} />
					</li>
				))}
			</ul>
		</div>
	);
};
