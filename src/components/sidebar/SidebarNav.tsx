import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion';
import { type ButtonProps, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip';
import useSidebar, { NavItem } from '@/hooks/use-sidebar';
import { cn, isLinkActive } from '@/lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { ChevronDown, ExternalLinkIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type LinkStyleProps = {
	active?: boolean;
	disabled?: boolean;
	className?: string;
} & VariantProps<typeof buttonVariants>;

function linkStyle({ active, disabled, className, ...props }: LinkStyleProps) {
	return cn(
		buttonVariants({
			variant: active ? 'secondary' : 'ghost',
			size: props.size,
			...props
		}),
		'flex h-8 w-full items-center justify-start gap-3 px-3',
		disabled && 'pointer-events-none opacity-50',
		className
	);
}

import { useMemo } from 'react'; // Add this import at the top

export function SidebarNav() {
	const isCollapsed = false;

	const { pathname } = useLocation();
	const { items } = useSidebar();

	// Memoize the useNotice functions for each item to ensure stability
	const memoizedItems = useMemo(() => {
		return items.map((nav) => ({
			...nav,
			items: nav.items.map((item) => ({
				...item,
				useNotice: item.useNotice // Assuming useNotice is defined per item
			}))
		}));
	}, [items]);

	return (
		<TooltipProvider
			disableHoverableContent
			delayDuration={0}
		>
			<nav className="flex flex-col gap-4">
				<div className="flex flex-row gap-2 lg:hidden">
					<ModeToggle />
					<BulkAction />
					<DownloadManager />
					<LanguageSelector />
				</div>
				{memoizedItems.map((nav, index) => (
					<div key={nav.id}>
						{nav.showLabel && (
							<h3 className="mb-2 px-2 pt-3 text-xs font-semibold uppercase text-muted-foreground">
								{nav.label}
							</h3>
						)}
						<ul className="flex flex-col gap-1">
							{nav.items.map((item) => (
								<li key={item.label}>
									{/**
									 * if the item has a subMenu, we will render an accordion component to handle the subMenu
									 * otherwise, we will render a simple link
									 */}
									{item.subMenu ? (
										<Accordion
											type="single"
											collapsible
											defaultValue={
												item.subMenu.find((subItem) =>
													isLinkActive(
														pathname,
														subItem.href
													)
												)
													? item.label
													: undefined
											}
										>
											<AccordionItem value={item.label}>
												<Tooltip>
													<TooltipTrigger asChild>
														<AccordionTrigger
															className={linkStyle(
																{
																	className:
																		'justify-between'
																}
															)}
														>
															<div className="flex items-center justify-start gap-3 ">
																<item.icon
																	className={cn(
																		'flex-shrink-0',
																		isCollapsed
																			? 'h-5 w-5'
																			: 'h-4 w-4 '
																	)}
																/>
																{!isCollapsed && (
																	<span className="truncate">
																		{
																			item.label
																		}
																	</span>
																)}
															</div>
														</AccordionTrigger>
													</TooltipTrigger>
													{isCollapsed && (
														<TooltipContent
															side="right"
															className="flex items-center gap-2 font-medium "
														>
															<span>
																{item.label}
															</span>
															<ChevronDown className="h-4 w-4" />
														</TooltipContent>
													)}
												</Tooltip>
												<AccordionContent
													className={cn(
														' flex flex-col gap-1 pt-1',
														isCollapsed
															? ''
															: 'relative pl-7 pr-0'
													)}
												>
													{item.subMenu.map(
														(subItem) => (
															<Tooltip
																key={
																	subItem.label
																}
															>
																<TooltipTrigger className="h-full w-full">
																	<NavLink
																		{...subItem}
																		active={isLinkActive(
																			pathname,
																			subItem.href
																		)}
																		isCollapsed={
																			isCollapsed
																		}
																	/>
																</TooltipTrigger>
																{isCollapsed && (
																	<TooltipContent
																		side="right"
																		className="flex items-center gap-4 font-medium"
																	>
																		{
																			subItem.label
																		}
																	</TooltipContent>
																)}
															</Tooltip>
														)
													)}

													{!isCollapsed && (
														<Separator
															orientation="vertical"
															className="absolute bottom-2 left-5 right-auto"
														/>
													)}
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									) : (
										<Tooltip>
											<TooltipTrigger className="h-full w-full">
												<NavLink
													{...item}
													active={isLinkActive(
														pathname,
														item.href
													)}
													isCollapsed={isCollapsed}
													useNotice={item.useNotice} // Pass the memoized useNotice
												/>
											</TooltipTrigger>
											{isCollapsed && (
												<TooltipContent
													side="right"
													className="flex items-center gap-4 font-medium"
												>
													{item.label}
												</TooltipContent>
											)}
										</Tooltip>
									)}
								</li>
							))}
						</ul>

						{index !== memoizedItems.length - 1 && (
							<Separator className="my-2" />
						)}
					</div>
				))}
			</nav>
		</TooltipProvider>
	);
}

// Style the NavLink component to match the design system

type NavLinkProps = NavItem & {
	active?: boolean;
	isCollapsed?: boolean;
	size?: ButtonProps['size'];
};

import { memo } from 'react'; // Add this import at the top
import BulkAction from '../bulk-action';
import DownloadManager from '../download-manager';
import LanguageSelector from '../language-select';
import ModeToggle from '../mode-toggle';

function NavLink({
	href,
	as = 'link',
	label,
	icon: Icon,
	disabled,
	active,
	size = 'default',
	isCollapsed,
	external,
	useNotice: Notice
}: NavLinkProps) {
	const isExternal = href?.startsWith('http') ?? external;
	const linkTarget = isExternal ? '_blank' : '_self';
	const content = (
		<>
			<Icon
				className={cn(
					'flex-shrink-0',
					isCollapsed ? 'h-5 w-5' : 'h-4 w-4 '
				)}
			/>
			{!isCollapsed && (
				<span className="flex-grow truncate text-left">{label}</span>
			)}
			{isExternal && (
				<span className="text-muted-foreground">
					<ExternalLinkIcon className="ml-2 h-3 w-3" />
				</span>
			)}
			{Notice && <Notice />}
		</>
	);
	if (as === 'link') {
		return (
			<Link
				to={href ?? ''}
				className={linkStyle({ active, disabled, size })}
				target={linkTarget}
				rel="noreferrer"
			>
				{content}
			</Link>
		);
	}
	return (
		<a
			href={href}
			className={linkStyle({ active, disabled, size })}
			target={linkTarget}
			rel="noreferrer"
		>
			{content}
		</a>
	);
}

// Memoize NavLink to prevent unnecessary re-renders
export default memo(NavLink);
