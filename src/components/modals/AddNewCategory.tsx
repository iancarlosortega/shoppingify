'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	UseDisclosureProps,
} from '@nextui-org/react';
import useAuthStore from '@/store/authStore';

interface IFormValues {
	name: string;
}

export const AddNewCategory = ({
	isOpen,
	onChange,
	onClose,
}: UseDisclosureProps) => {
	const { user } = useAuthStore();
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<IFormValues>();
	const router = useRouter();
	const supabase = createClientComponentClient();

	useEffect(() => {
		if (!isOpen) {
			reset();
		}
	}, [isOpen, reset]);

	const onSubmit = async ({ name }: IFormValues) => {
		const { error } = await supabase.from('categories').insert({
			name,
			user_id: user?.id,
		});

		if (error) {
			toast.error(error.message);
			return;
		}

		toast.success('Category added successfully');
		reset();
		onClose!();
		router.refresh();
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onChange}>
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Add new category
						</ModalHeader>
						<form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
							<ModalBody>
								<Input
									autoFocus
									type='text'
									label='Name'
									placeholder='Enter a category'
									color={errors.name ? 'danger' : undefined}
									errorMessage={errors.name?.message}
									classNames={{
										inputWrapper:
											'group-data-[focus-visible=true]:ring-primary',
									}}
									{...register('name', {
										required: 'This field is required',
										minLength: {
											value: 3,
											message: 'Category must be at least 3 characters long',
										},
									})}
								/>
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='light' onPress={onClose}>
									Cancel
								</Button>
								<Button color='primary' type='submit' isDisabled={isSubmitting}>
									Save
								</Button>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
