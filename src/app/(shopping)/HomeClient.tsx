'use client';

import { Input } from '@nextui-org/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { CategoriesList } from '@/components/products/CategoriesList';
import { NoItems } from '@/components/products/NoItems';
import { Category } from '@/types/categories';
import { useState } from 'react';

interface Props {
	categories: Category[];
}

export const HomeClient: React.FC<Props> = ({ categories }) => {
	const [filteredCategories, setFilteredCategories] = useState(categories);

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setFilteredCategories(
			categories
				.map(category => {
					const products = category.products?.filter(product =>
						product.name.toLowerCase().includes(value.toLowerCase())
					);
					return { ...category, products };
				})
				.filter(
					category =>
						category.products?.length !== undefined &&
						category.products.length > 0
				)
		);
	};

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
					onChange={onInputChange}
					startContent={<AiOutlineSearch />}
				/>
			</header>

			{filteredCategories.length === 0 ? (
				<NoItems />
			) : (
				<section>
					<CategoriesList categories={filteredCategories} />
				</section>
			)}
		</>
	);
};
