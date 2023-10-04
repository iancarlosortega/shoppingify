import { MdRemoveShoppingCart } from 'react-icons/md';

export const NoItems = () => {
	return (
		<section className='flex flex-col justify-center items-center h-[70vh]'>
			<MdRemoveShoppingCart className='h-24 w-24 text-gray-400 mb-4' />
			<h2 className='text-xl text-gray-600 font-bold'>No items found</h2>
			<p className='text-sm text-gray-500'>
				First add your categories and products!
			</p>
		</section>
	);
};
