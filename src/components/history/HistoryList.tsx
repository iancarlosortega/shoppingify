import { classNames, formatDate } from '@/utils';
import { BsCalendarWeek } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import { History } from '@/types/history';

interface Props {
	shoppingList: History[];
}

export const HistoryList: React.FC<Props> = ({ shoppingList }) => {
	return (
		<ul>
			{shoppingList.map((item: any) => (
				<li
					key={item.id}
					className={classNames(
						'bg-white mt-6 font-bold flex flex-col md:flex-row md:items-center justify-between gap-2',
						'shadow-light rounded-lg cursor-pointer px-6 py-4',
						'dark:bg-neutral-700 dark:text-white'
					)}>
					<div className='flex justify-between items-center'>
						<p className='text-lg'>{item.name}</p>
						<button className='md:hidden'>
							<IoIosArrowForward className='h-6 w-6 text-primary' />
						</button>
					</div>
					<div className='flex flex-col md:flex-row gap-4 md:gap-8 md:items-center'>
						<div className='flex gap-2 items-center'>
							<BsCalendarWeek className='text-gray-500' />
							<p className='text-gray-500 font-medium'>
								{formatDate(new Date(item.created_at))}
							</p>
						</div>
						<div
							className={`md:w-[100px] rounded-lg flex justify-center p-1 border ${
								item.state === 'completed'
									? 'border-secondary'
									: 'border-tertiary'
							}`}>
							<p
								className={`font-medium ${
									item.state === 'completed'
										? 'text-secondary'
										: 'text-tertiary'
								}`}>
								{item.state === 'completed' ? 'completed' : 'cancelled'}
							</p>
						</div>
						<button className='hidden md:block'>
							<IoIosArrowForward className='h-6 w-6 text-primary' />
						</button>
					</div>
				</li>
			))}
		</ul>
	);
};
