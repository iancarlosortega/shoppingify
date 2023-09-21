import { toast } from 'sonner';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	UseDisclosureProps,
} from '@nextui-org/react';
import useProductStore from '@/store/productStore';
import useAuthStore from '@/store/authStore';
import { Database } from '@/types/database';

export const ConfirmCancelList = ({
	isOpen,
	onChange,
	onClose,
}: UseDisclosureProps) => {
	const { shoppingCart, cleanShoppingCart } = useProductStore();
	const { user } = useAuthStore();
	const supabase = createClientComponentClient<Database>();

	const handleCancelList = async () => {
		const { error } = await supabase.from('shopping_lists').insert({
			name: shoppingCart.name,
			state: false,
			items: shoppingCart.items,
			user_id: user!.id,
		});

		if (error) {
			console.log(error);
			toast.error(error.message);
			return;
		}

		toast.error('Shopping List Cancelled');
		onClose!();
		cleanShoppingCart();
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onChange}>
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Cancel List
						</ModalHeader>
						<form>
							<ModalBody>
								<p className='text-sm text-neutral-500'>
									Are you sure that you want to cancel this list?
								</p>
							</ModalBody>
							<ModalFooter>
								<Button color='default' variant='light' onPress={onClose}>
									Cancel
								</Button>
								<Button color='danger' onPress={handleCancelList}>
									Yes
								</Button>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
