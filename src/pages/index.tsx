import { AppPageShell } from '@/components/body/page-shell';
import { siteConfig } from '@/config/site';
import { __ } from '@/lib/i18n';
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
			breadcrump={[
				{
					label: __('Dashboard')
				}
			]}
		>
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-7">
				<div className="col-span-1 flex flex-col gap-5 lg:gap-7">
					<ItemStats />
					<InstallStats />
					<AvailableUpdates />
				</div>
				<div className="flex  flex-col gap-5 sm:col-span-2 lg:gap-7">
					{!siteConfig.whitelabel && <DashboardWelcome />}
					<LicenseStatus />
					{!siteConfig.whitelabel && <Announcements />}
				</div>
			</div>
		</AppPageShell>
	);
}
