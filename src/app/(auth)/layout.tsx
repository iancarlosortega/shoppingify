import Image from 'next/image';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className='grid lg:grid-cols-[60%_40%] min-h-screen h-full'>
			<section className='relative hidden lg:block'>
				<Image
					className='object-cover w-full h-full'
					src='/images/login-bg.jpg'
					alt='Examble of products in a shopping list'
					width={1000}
					height={1000}
				/>
				{/* Overlay */}
				<div className='absolute inset-0 bg-black bg-opacity-50'>
					<div className='absolute inset-0 flex flex-col justify-center items-center'>
						<h1 className='text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
							Shoppingify
						</h1>
						<p className='text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-center'>
							Create your shopping list with ease and style.
						</p>
					</div>
				</div>
			</section>
			<section className='flex justify-center items-center bg-background'>
				{children}
			</section>
		</main>
	);
}
