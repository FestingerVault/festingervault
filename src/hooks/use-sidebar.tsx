import { Badge } from '@/components/ui/badge';
import useInstalled from '@/hooks/use-is-installed';
import { __ } from '@/lib/i18n';
import {
	ArrowLeft,
	Drum,
	Heart,
	HomeIcon,
	Library,
	LifeBuoy,
	List,
	Palette,
	Repeat,
	Settings,
	ShieldCheck,
	ToyBrick
} from 'lucide-react';
import React from 'react';
import useActivation from './use-activation';

type IconProps = React.HTMLAttributes<SVGElement>;

type NavItemBase = {
	label: string;
	icon: React.ComponentType<IconProps>;
	disabled?: boolean;
	useNotice?: React.ComponentType | (() => React.ReactNode);
	as?: 'link' | 'a';
	external?: boolean;
};

type NavItemWithHref = NavItemBase & {
	href: string;
	subMenu?: never;
};

type NavItemWithSubMenu = NavItemBase & {
	href?: never;
	subMenu: {
		label: string;
		href: string;
		icon: React.ComponentType<IconProps>;
		external?: boolean;
		disabled?: boolean;
	}[];
};

export type NavItem = NavItemWithHref | NavItemWithSubMenu;

export type SidebarNavItems = {
	id: string;
	label: string;
	showLabel?: boolean;
	items: NavItem[];
};

const navIds = {
	discover: 'discover',
	library: 'library',
	settings: 'settings'
};
export default function useSidebar() {
	const { updateable } = useInstalled();
	const { activated } = useActivation();
	const items: SidebarNavItems[] = [
		{
			id: 'back-dashboard',
			label: __('WP Dashboard'),
			showLabel: false,
			items: [
				{
					label: __('WP Dashboard'),
					icon: ArrowLeft,
					href: 'index.php',
					as: 'a'
				}
			]
		},
		{
			id: navIds.discover,
			label: __('Discover'),
			showLabel: true,
			items: [
				{
					label: __('Home'),
					icon: HomeIcon,
					href: '/'
				},
				{
					label: __('Popular Themes'),
					icon: Palette,
					href: '/popular/themes'
				},
				{
					label: __('Popular Plugins'),
					icon: ToyBrick,
					href: '/popular/plugins'
				}
			]
		},
		{
			id: navIds.library,
			label: __('Library'),
			showLabel: true,
			items: [
				{
					label: __('Themes'),
					icon: Palette,
					href: '/item/themes'
				},
				{
					label: __('Plugins'),
					icon: ToyBrick,
					href: '/item/plugins'
				},
				{
					label: __('Elementor Kits'),
					icon: Drum,
					href: '/item/template-kits'
				},
				{
					label: __('Requests'),
					icon: Library,
					disabled: activated === false,
					href: '/requests'
				},
				{
					label: __('Collections'),
					icon: Heart,
					href: '/collection',
					disabled: activated === false
				},
				{
					label: __('Updates'),
					icon: Repeat,
					href: '/updates',
					disabled: activated === false,
					useNotice: () => {
						if (updateable && updateable.length > 0) {
							return (
								<Badge
									variant="success"
									size="sm"
								>
									{updateable.length}
								</Badge>
							);
						}
					}
				},
				{
					label: __('History'),
					icon: List,
					href: '/history',
					disabled: activated === false
				}
			]
		},
		{
			id: navIds.settings,
			label: __('Settings'),
			showLabel: true,
			items: [
				{
					label: __('License Activation'),
					icon: ShieldCheck,
					href: '/activation'
				},
				{
					label: __('Settings'),
					icon: Settings,
					disabled: activated === false,
					href: '/settings'
				},
				{
					label: __('Need Help?'),
					icon: LifeBuoy,
					href: 'https://meta.festingervault.com/',
					as: 'a'
				}
			]
		}
	];
	return { items };
}
