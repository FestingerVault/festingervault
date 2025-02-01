import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import useApiFetch from '@/hooks/use-api-fetch';
import useSetting from '@/hooks/use-setting';
import { __ } from '@/lib/i18n';
import SettingControl from './settings-control';
export default function RolesAccessForm() {
	const { setSetting, settings, updateSettings } = useSetting();
	const { data: roles } = useApiFetch<Record<string, string>>(
		'setting/roles',
		{},
		!!settings
	);

	return (
		!!settings && (
			<Card>
				<CardHeader>
					<CardTitle>Edit Role Access</CardTitle>
				</CardHeader>
				<CardContent>
					{roles && (
						<SettingControl
							label={__('Access Enabled')}
							description={__(
								'Enable access to other user groups other than site administrator.'
							)}
						>
							<div className="flex flex-col gap-2">
								{Object.entries(roles).map(([role, label]) => (
									<div
										className="flex flex-row gap-2"
										key={role}
									>
										<Switch
											checked={settings.roles?.includes(
												role
											)}
											onCheckedChange={(checked) => {
												const _roles = new Set(
													settings.roles
												);
												if (checked) {
													_roles.add(role);
												} else {
													_roles.delete(role);
												}
												setSetting(
													'roles',
													Array.from(_roles)
												);
											}}
										/>
										{label}
									</div>
								))}
							</div>
						</SettingControl>
					)}
				</CardContent>
				<CardFooter>
					<Button onClick={updateSettings}>
						{__('Save Settings')}
					</Button>
				</CardFooter>
			</Card>
		)
	);
}
