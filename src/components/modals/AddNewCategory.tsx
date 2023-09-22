'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
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

export const AddNewCategory = ({
	isOpen,
	onChange,
	onClose,
}: UseDisclosureProps) => {
	const [newCategory, setNewCategory] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const { user } = useAuthStore();
	const router = useRouter();
	const supabase = createClientComponentClient();

	useEffect(() => {
		if (!isOpen) {
			setNewCategory('');
			setErrorMessage('');
		}
	}, [isOpen]);

	const onSaveCategory = async () => {
		setIsFormSubmitted(true);
		if (newCategory.trim() === '') {
			setErrorMessage('Field cannot be empty');
			return;
		}

		if (newCategory.trim().length < 3) {
			setErrorMessage('Must be at least 3 characters');
			return;
		}
		const { error } = await supabase.from('categories').insert({
			name: newCategory,
			user_id: user?.id,
		});

		if (error) {
			toast.error(error.message);
			return;
		}

		toast.success('Category added successfully');
		setNewCategory('');
		onClose!();
		router.refresh();
	};

	const onChangeInput = (event: any) => {
		const newValue = event.target.value;
		setNewCategory(newValue);
		if (newValue.trim().length < 3) {
			setErrorMessage('Must be at least 3 characters');
			return;
		}
		setErrorMessage('');
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onChange}>
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Add new category
						</ModalHeader>
						<form>
							<ModalBody>
								<Input
									autoFocus
									type='text'
									label='Name'
									placeholder='Enter a category'
									value={newCategory}
									onChange={onChangeInput}
									color={isFormSubmitted && errorMessage ? 'danger' : undefined}
									errorMessage={isFormSubmitted && errorMessage}
									classNames={{
										inputWrapper:
											'group-data-[focus-visible=true]:ring-primary',
									}}
								/>
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='light' onPress={onClose}>
									Cancel
								</Button>
								<Button color='primary' onPress={onSaveCategory}>
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
