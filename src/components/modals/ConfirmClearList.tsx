import { toast } from 'sonner';
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

export const ConfirmClearList = ({
	isOpen,
	onChange,
	onClose,
}: UseDisclosureProps) => {
	const { cleanShoppingCart } = useProductStore();

	const handleClearList = async () => {
		cleanShoppingCart();
		toast.success('Shopping List Cleared');
		onClose!();
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
									Are you sure that you want to clear this list?
								</p>
							</ModalBody>
							<ModalFooter>
								<Button color='default' variant='light' onPress={onClose}>
									No
								</Button>
								<Button color='danger' onPress={handleClearList}>
									Yes!
								</Button>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
