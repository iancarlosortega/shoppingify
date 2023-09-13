import { Category } from '@/interfaces/category';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';

const ITEMS_MOCKUP: Category[] = [
	{
		id: '1',
		name: 'Fruits and Vegetables',
		items: [
			{
				id: '1',
				name: 'Banana',
			},
			{
				id: '2',
				name: 'Manzano',
			},
			{
				id: '3',
				name: 'Pineapple',
			},
			{
				id: '4',
				name: 'Watermelon',
			},
			{
				id: '5',
				name: 'Pre-cooked corn 450g',
			},
			{
				id: '6',
				name: 'Avocado',
			},
		],
	},
	{
		id: '2',
		name: 'Meat and Fish',
		items: [
			{
				id: '1',
				name: 'Chicken Leg Box',
			},
			{
				id: '2',
				name: 'Chicken 1kg',
			},
			{
				id: '3',
				name: 'Pork fillets 450g',
			},
			{
				id: '4',
				name: 'Salmon 1kg',
			},
		],
	},
	{
		id: '3',
		name: 'Fruits and Vegetables',
		items: [
			{
				id: '1',
				name: 'Banana',
			},
			{
				id: '2',
				name: 'Manzano',
			},
			{
				id: '3',
				name: 'Pineapple',
			},
			{
				id: '4',
				name: 'Watermelon',
			},
			{
				id: '5',
				name: 'Pre-cooked corn 450g',
			},
			{
				id: '6',
				name: 'Avocado',
			},
		],
	},
	{
		id: '4',
		name: 'Fruits and Vegetables',
		items: [
			{
				id: '1',
				name: 'Banana',
			},
			{
				id: '2',
				name: 'Manzano',
			},
			{
				id: '3',
				name: 'Pineapple',
			},
		],
	},
];

export default function Home() {
	return (
		<>
			<header className='flex justify-between gap-12'>
				<h2 className='text-primary text-2xl font-bold'>
					Shoppingify{' '}
					<span className='text-black font-medium'>
						allows you to take your shopping list wherever you go
					</span>
				</h2>

				<Input
					className='max-w-[400px]'
					type='text'
					placeholder='search item'
					startContent={<AiOutlineSearch />}
				/>
			</header>

			<section>
				{ITEMS_MOCKUP.map(category => (
					<div key={category.id} className='my-8'>
						<h3 className='text-xl font-semibold'>{category.name}</h3>

						<ul className='flex flex-wrap gap-4'>
							{category.items.map(item => (
								<li
									key={item.id}
									className='bg-white font-bold flex items-center justify-between gap-2 py-2 pl-4 pr-2 mt-6 shadow-light rounded-lg'>
									<p>{item.name}</p>
									<Button isIconOnly className='bg-transparent'>
										<AiOutlinePlus className='text-gray-400' />
									</Button>
								</li>
							))}
						</ul>
					</div>
				))}
			</section>
		</>
	);
}
