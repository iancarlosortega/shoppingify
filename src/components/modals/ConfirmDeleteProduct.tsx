import { toast } from 'sonner';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
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
import useUIStore from '@/store/uiStore';
import { Database } from '@/types/database';

export const ConfirmDeleteProduct = ({
	isOpen,
	onChange,
	onClose,
}: UseDisclosureProps) => {
	const { productSelected: product, updateProductSelected } = useProductStore();
	const { toggleProductInformation } = useUIStore();
	const router = useRouter();
	const supabase = createClientComponentClient<Database>();

	const handleDeleteProduct = async () => {
		const { error } = await supabase
			.from('products')
			.delete()
			.eq('id', product?.id!);

		if (error) {
			toast.error(error.message);
		} else {
			toast.success(`Product ${product?.name} deleted successfully`);
			onClose!();
			updateProductSelected(null);
			toggleProductInformation(false);
			router.refresh();
		}
	};

	return (
		<Modal isOpen={isOpen} onOpenChange={onChange}>
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Delete Product
						</ModalHeader>
						<form>
							<ModalBody>
								<p className='text-sm text-neutral-500'>
									Are you sure you want to delete this product?
								</p>
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='light' onPress={onClose}>
									Cancel
								</Button>
								<Button color='primary' onPress={handleDeleteProduct}>
									Confirm
								</Button>
							</ModalFooter>
						</form>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
