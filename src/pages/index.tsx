import { AppPageShell } from '@/components/body/page-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { __, _x } from '@/lib/i18n';
import { ShieldAlert } from 'lucide-react';
import Announcements from './_components/announcements';
import AvailableUpdates from './_components/available-updates';
import DashboardWelcome from './_components/dashboard-welcome';
import InstallStats from './_components/install-stats';
import ItemStats from './_components/item-stats';
import LicenseStatus from './_components/license-status';

export default function Component() {
	return (
		<AppPageShell
			title={__('Dashboard')}
			description="Festingervault Dashboard"
			breadcrump={[
				{
					label: __('Dashboard')
				}
			]}
		>
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-7">
				<div className="sm:col-span-3">
					<Card className="border border-dashed border-primary-foreground bg-red-900 p-4 text-white">
						<CardContent className="flex flex-col items-center gap-5 sm:flex-row">
							<ShieldAlert size={42} />
							<div className="flex-1">
								<h2 className="text-lg">
									{_x(
										'Welcome to the new Festinger Vault plugin!',
										'Dashboard welcome title'
									)}
								</h2>
								<div className="text-sm">
									<p>
										{_x(
											'The long-awaited, eagerly anticipated, and much-discussed Festinger Vault plugin is FINALLY ready for download! 🥳',
											'Dashboard welcome paragraph 1'
										)}
									</p>
									<p>
										{_x(
											'Do you have any feedback? Please let us know by clicking the report feedback button! Thanks!',
											'Dashboard welcome paragraph 2'
										)}
									</p>
								</div>
							</div>
							<Button asChild>
								<a
									href="https://festingervault.com/beta-feedback"
									target="_blank"
									rel="noreferrer"
								>
									{_x(
										'Report Feedback',
										'Dashboard report feedback button'
									)}
								</a>
							</Button>
						</CardContent>
					</Card>
				</div>
				<div className="col-span-1 flex flex-col gap-5 lg:gap-7">
					<ItemStats />
					<InstallStats />
					<AvailableUpdates />
				</div>{' '}
				<div className="flex  flex-col gap-5 sm:col-span-2 lg:gap-7">
					<DashboardWelcome />
					<LicenseStatus />
					<Announcements />
				</div>
			</div>
		</AppPageShell>
	);
}
