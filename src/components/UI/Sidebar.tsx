'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
	Badge,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Tooltip,
} from '@nextui-org/react';
import { AiOutlineShoppingCart, AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdOutlineLogout, MdReplay } from 'react-icons/md';
import { BiBarChartSquare } from 'react-icons/bi';
import useAuthStore from '@/store/authStore';
import useUIStore from '@/store/uiStore';
import { Logo } from '@/components/icons';
import { classNames } from '@/utils';
import { ThemeToggle } from './ThemeToggle';

interface ActiveBorder {
	height?: number;
	top?: number;
}

export const Sidebar = () => {
	const [size, setSize] = useState([0, 0]);
	const [activeBorder, setActiveBorder] = useState<ActiveBorder>({});
	const [defaultBorder, setDefaultBorder] = useState<ActiveBorder>({});
	const navElement = useRef<HTMLUListElement>(null);

	const pathname = usePathname();
	const router = useRouter();
	const supabase = createClientComponentClient();

	const { toggleShoppingList } = useUIStore();
	const { user } = useAuthStore();

	const handleMouseEnter = (e: any) => {
		const { height, top } = e.target.getBoundingClientRect()!;
		setActiveBorder({
			...activeBorder,
			height,
			top,
		});
	};

	const handleMouseLeave = () => {
		setActiveBorder({
			...activeBorder,
			height: defaultBorder.height,
			top: defaultBorder.top,
		});
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.refresh();
	};

	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	useEffect(() => {
		let currentNode = navElement.current?.children[0];

		if (pathname == '/') {
			currentNode = navElement.current?.children[0];
		} else if (pathname == '/history') {
			currentNode = navElement.current?.children[1];
		} else if (pathname == '/statistics') {
			currentNode = navElement.current?.children[2];
		}

		const { height, top } = currentNode!.getBoundingClientRect()!;
		setActiveBorder({
			height,
			top,
		});
		setDefaultBorder({
			height,
			top,
		});
	}, [pathname, size]);

	return (
		<aside className='w-[80px] min-h-screen flex flex-col justify-between fixed dark:bg-neutral-900'>
			<Link href='/' className='p-4'>
				<Logo />
			</Link>

			<nav>
				<ul
					ref={navElement}
					className={classNames(
						'flex flex-col gap-12 items-center',
						'[&>li>a]:py-4 [&>li]:w-full [&>li>a]:w-full [&>li>a:hover]:bg-gray-100',
						'[&>li>a]:flex [&>li>a]:justify-center [&>li>a]:items-center',
						'dark:[&>li>a:hover]:bg-neutral-950'
					)}>
					<Tooltip
						showArrow
						content='items'
						placement='right'
						closeDelay={300}
						classNames={{
							base: 'shadow-xl text-white bg-dark',
							arrow: 'bg-dark',
						}}>
						<li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
							<Link href='/' className='outline-none'>
								<AiOutlineUnorderedList className='w-6 h-6 text-dark dark:text-light-gray' />
							</Link>
						</li>
					</Tooltip>

					<Tooltip
						showArrow
						content='history'
						placement='right'
						closeDelay={300}
						classNames={{
							base: 'shadow-xl text-white bg-dark',
							arrow: 'bg-dark',
						}}>
						<li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
							<Link href='/history' className='outline-none'>
								<MdReplay className='w-6 h-6 text-dark dark:text-light-gray' />
							</Link>
						</li>
					</Tooltip>

					<Tooltip
						showArrow
						content='statistics'
						placement='right'
						closeDelay={300}
						classNames={{
							base: 'shadow-xl text-white bg-dark',
							arrow: 'bg-dark',
						}}>
						<li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
							<Link href='/statistics' className='outline-none'>
								<BiBarChartSquare className='w-6 h-6 text-dark dark:text-light-gray' />
							</Link>
						</li>
					</Tooltip>

					{/* Active Border */}
					<div
						style={{
							height: activeBorder.height,
							top: activeBorder.top,
						}}
						className='w-1 absolute bg-yellow-500 rounded-r-lg left-0 transition-all duration-500 ease-[cubic-bezier(0.600,-0.280,0.735,0.045)]'></div>
				</ul>
			</nav>

			<footer className='flex flex-col items-center gap-2'>
				<Badge content='9+' disableOutline color='danger'>
					<Button
						onClick={toggleShoppingList}
						isIconOnly
						radius='full'
						size='lg'
						className='bg-primary'
						aria-label='Toggle shopping list'>
						<AiOutlineShoppingCart className='text-white h-6 w-6' />
					</Button>
				</Badge>

				<Dropdown
					placement='right-end'
					backdrop={size[0] > 992 ? 'blur' : undefined}
					showArrow
					classNames={{
						base: 'py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black',
						arrow: 'bg-default-200',
					}}>
					<DropdownTrigger>
						<Button
							isIconOnly
							variant='shadow'
							radius='full'
							size='lg'
							className='bg-tertiary mx-4 my-2 shadow-lg'
							aria-label='Toggle shopping list'>
							<BsFillPersonFill className='text-white h-6 w-6' />
						</Button>
					</DropdownTrigger>
					<DropdownMenu aria-label='Profile Actions' variant='flat'>
						<DropdownItem key='profile' className='h-14 gap-2'>
							<p className='font-semibold'>Signed in as</p>
							<p className='font-semibold'>{user?.email}</p>
						</DropdownItem>
						<DropdownItem isReadOnly key='toggle-theme'>
							<ThemeToggle />
						</DropdownItem>
						<DropdownItem
							onClick={handleSignOut}
							key='logout'
							color='danger'
							startContent={<MdOutlineLogout />}>
							Log Out
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</footer>
		</aside>
	);
};
