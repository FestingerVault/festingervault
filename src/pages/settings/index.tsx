import { AppPageShell } from '@/components/body/page-shell';
import useSetting from '@/hooks/use-setting';
import { __ } from '@/lib/i18n';
import SettingsForm from './_components/Settings';

export default function Component() {
	const { setting, isLoading, isFetching } = useSetting();
	return (
		<AppPageShell
			title={__('Settings')}
			isLoading={isLoading}
			isFetching={isFetching}
			breadcrump={[{ label: __('Settings') }]}
		>
			<SettingsForm setting={setting} />
		</AppPageShell>
	);
}
