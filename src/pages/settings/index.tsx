import { AppPageShell } from '@/components/body/page-shell';
import useActivation from '@/hooks/use-activation';
import { SettingProvider } from '@/hooks/use-setting';
import { __ } from '@/lib/i18n';
import AutoupdateSetting from './_components/autoupdate-setting';
import SettingsForm from './_components/general-settting';
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
				<AutoupdateSetting />
				{data && data.roles && <RolesAccessForm />}
			</SettingProvider>
		</AppPageShell>
	);
}
