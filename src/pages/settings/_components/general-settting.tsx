import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import useSetting from '@/hooks/use-setting';
import { __ } from '@/lib/i18n';
import SettingControl from './settings-control';

export default function SettingsForm() {
	const { updateSettings, settings, setSetting } = useSetting();

	return (
		!!settings && (
			<>
				<Card>
					<CardHeader className="border-b">
						{__('General')}
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<div className="flex flex-col gap-7 sm:gap-2">
							<SettingControl
								label={__('Auto Activate')}
								description={__(
									'Automatically activate plugin upon installation.'
								)}
							>
								<Switch
									checked={settings.autoactivate === true}
									onCheckedChange={(checked) =>
										setSetting('autoactivate', checked)
									}
								/>
							</SettingControl>

							<SettingControl
								label={__('Remove Data?')}
								description={__(
									'Remove plugin settings and activation data on uninstall'
								)}
							>
								<Switch
									checked={
										settings.clean_on_uninstall === true
									}
									onCheckedChange={(checked) =>
										setSetting(
											'clean_on_uninstall',
											checked
										)
									}
								/>
							</SettingControl>
						</div>
					</CardContent>
					<CardFooter>
						<Button onClick={updateSettings}>
							{__('Save Settings')}
						</Button>
					</CardFooter>
				</Card>
			</>
		)
	);
}
