'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '..';
import { AiOutlineShoppingCart, AiOutlineUnorderedList } from 'react-icons/ai';
import { MdReplay } from 'react-icons/md';
import { BiBarChartSquare } from 'react-icons/bi';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import { classNames } from '@/utils';

interface ActiveBorder {
	height?: number;
	top?: number;
}

export const Sidebar = () => {
	const [activeBorder, setActiveBorder] = useState<ActiveBorder>({});
	const [defaultBorder, setDefaultBorder] = useState<ActiveBorder>({});
	const navElement = useRef<HTMLUListElement>(null);
	const pathname = usePathname();

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
	}, [pathname]);

	return (
		<aside className='h-full flex flex-col justify-between'>
			<Link href='/' className='p-4'>
				<Logo />
			</Link>

			<nav>
				<ul
					ref={navElement}
					className={classNames(
						'flex flex-col gap-12 items-center',
						'[&>li>a]:py-4 [&>li]:w-full [&>li>a]:w-full [&>li>a:hover]:bg-gray-100',
						'[&>li>a]:flex [&>li>a]:justify-center [&>li>a]:items-center'
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
								<AiOutlineUnorderedList className='w-6 h-6 text-dark' />
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
								<MdReplay className='w-6 h-6 text-dark' />
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
								<BiBarChartSquare className='w-6 h-6 text-dark' />
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

			<Button
				isIconOnly
				radius='full'
				size='lg'
				className='bg-primary m-4'
				aria-label='Toggle shopping list'>
				<AiOutlineShoppingCart className='text-white h-6 w-6' />
			</Button>
		</aside>
	);
};
