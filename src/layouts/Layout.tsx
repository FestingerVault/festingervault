import { AppHeader } from '@/components/header/app-header';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
	return (
		<div className="container flex items-start gap-8">
			<div className="sticky left-0 top-0 hidden h-screen w-52 flex-shrink-0 lg:block xl:w-60 ">
				<Sidebar />
			</div>
			<section className="min-h-screen w-full flex-grow">
				<div className="sticky left-0 right-0 top-0 z-50 block border-b border-border bg-background lg:hidden">
					<AppHeader />
				</div>
				<Outlet />
			</section>
		</div>
	);
}
