import { AppPageShell } from '@/components/body/page-shell';
import useActivation from '@/hooks/use-activation';
import { SettingProvider } from '@/hooks/use-setting';
import { __ } from '@/lib/i18n';
import SettingsForm from './_components/Settings';
import RolesAccessForm from './_components/roles-editor';

export default function Component() {
	const { data } = useActivation();
	return (
		<AppPageShell
			title={__('Settings')}
			breadcrump={[{ label: __('Settings') }]}
		>
			<SettingProvider>
				<SettingsForm />
				{data && data.roles && <RolesAccessForm />}
			</SettingProvider>
		</AppPageShell>
	);
}
