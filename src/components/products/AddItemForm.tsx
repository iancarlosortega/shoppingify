'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
	Button,
	Input,
	Select,
	SelectItem,
	Textarea,
	useDisclosure,
} from '@nextui-org/react';
import { AiOutlinePlus } from 'react-icons/ai';
import useUIStore from '@/store/uiStore';
import useAuthStore from '@/store/authStore';
import { AddNewCategory } from '@/components/modals/AddNewCategory';
import { classNames } from '@/utils';
import { Category } from '@/types/categories';
import { Database } from '@/types/database';

interface IFormValues {
	name: string;
	note: string;
	image: string;
	category: string;
}

interface Props {
	categories: Category[];
}

export const AddItemForm: React.FC<Props> = ({ categories }) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const { isAddItemFormOpen, toggleAddItemForm } = useUIStore();
	const { user } = useAuthStore();
	const router = useRouter();
	const supabase = createClientComponentClient<Database>();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<IFormValues>();

	const onSubmit = async (formValues: IFormValues) => {
		const { error } = await supabase.from('products').insert({
			name: formValues.name,
			note: formValues.note,
			image: formValues.image,
			category_id: formValues.category,
			user_id: user!.id,
		});

		if (error) {
			toast.error(error.message);
			return;
		}

		toast.success('Item added successfully');
		reset();
		router.refresh();
	};

	return (
		<aside
			className={classNames(
				`
      ${isAddItemFormOpen ? 'translate-x-0' : 'translate-x-[400px]'}`,
				'w-[400px] max-w-[80%] flex flex-col fixed top-0 right-0 h-full',
				'transition-transform duration-300 ease-in',
				'bg-white px-8 py-4 dark:bg-neutral-900'
			)}>
			<h3 className='font-bold text-2xl my-4'>Add new item</h3>
			<form
				autoComplete='off'
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-4'>
				<Input
					type='text'
					label='Name'
					placeholder='Enter a name'
					color={errors.name ? 'danger' : undefined}
					errorMessage={errors.name?.message}
					{...register('name', {
						required: 'This field is required',
					})}
				/>

				<Textarea
					type='text'
					label='Note (optional)'
					placeholder='Enter a note'
					{...register('note')}
				/>

				<Input
					type='text'
					label='Image (optional)'
					placeholder='Enter a url'
					{...register('image')}
				/>

				<div className='flex gap-2 items-center'>
					<Select
						label='Category'
						placeholder='Enter a category'
						className='mt-2'
						color={errors.category ? 'danger' : undefined}
						errorMessage={errors.category?.message}
						{...register('category', {
							required: 'This field is required',
						})}>
						{categories.map((category: any) => (
							<SelectItem value={category.id} key={category.id}>
								{category.name}
							</SelectItem>
						))}
					</Select>

					<Button
						size='lg'
						radius='full'
						isIconOnly
						onPress={onOpen}
						className='bg-primary text-white font-bold translate-y-1'>
						<AiOutlinePlus />
					</Button>
				</div>

				<footer className='flex justify-center gap-4 mt-8 mb-4'>
					<Button
						size='lg'
						className='bg-transparent dark:text-gray-500 font-bold hover:bg-sky-200'
						onPress={toggleAddItemForm}>
						Cancel
					</Button>

					<Button
						isDisabled={isSubmitting}
						size='lg'
						className='bg-primary text-white font-bold'
						type='submit'>
						Save
					</Button>
				</footer>
			</form>

			<AddNewCategory
				isOpen={isOpen}
				onChange={onOpenChange}
				onClose={onClose}
			/>
		</aside>
	);
};
