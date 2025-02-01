import { siteConfig } from '@/config/site';
import useTheme from '@/hooks/use-theme';
import { Link } from 'react-router-dom';
import { MobileSidenav } from './mobile-sidenav';

export function AppHeader() {
	const { effectiveTheme } = useTheme();
	return (
		<header className="flex h-14 items-center gap-4">
			<MobileSidenav />
			<Link
				to="/"
				className="z-10"
			>
				<img
					src={siteConfig.logo[effectiveTheme]}
					className="h-12"
				/>
			</Link>
		</header>
	);
}
