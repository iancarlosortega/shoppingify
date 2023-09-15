import { Category } from '@/interfaces/category';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';

const ITEMS_MOCKUP: Category[] = [];

export default function Home() {
	return (
		<>
			<header className='flex flex-col md:flex-row justify-between gap-6 md:gap-12'>
				<h2 className='text-primary text-2xl font-bold'>
					Shoppingify{' '}
					<span className='text-black dark:text-white font-medium'>
						allows you to take your shopping list wherever you go
					</span>
				</h2>

				<Input
					className='w-full lg:max-w-[400px]'
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
