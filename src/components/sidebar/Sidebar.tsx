import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { siteConfig } from '@/config/site';
import useTheme from '@/hooks/use-theme';
import { Link } from 'react-router-dom';
import { SidebarNav } from './SidebarNav';
type Props = {
	showLogo?: boolean;
};

export function Sidebar({ showLogo = true }: Props) {
	const { effectiveTheme } = useTheme();
	return (
		<aside className="flex h-full w-full flex-col">
			{showLogo && (
				<div className="items-center justify-between py-4">
					<Link
						to="/"
						className="z-10"
					>
						<img
							src={siteConfig.logo[effectiveTheme]}
							className="w-auto"
						/>
					</Link>
				</div>
			)}

			<ScrollArea className="flex-1">
				<div className="h-full w-full py-2">
					<SidebarNav />
					<ScrollBar orientation="vertical" />
				</div>
			</ScrollArea>
		</aside>
	);
}
