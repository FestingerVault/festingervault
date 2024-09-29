import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import useApiFetch from '@/hooks/use-api-fetch';
import useApiMutation from '@/hooks/use-api-mutation';
import useSetting from '@/hooks/use-setting';
import { __ } from '@/lib/i18n';
import { settingSchema } from '@/zod/setting';
import React, {
	ReactElement,
	ReactNode,
	useCallback,
	useId,
	useState
} from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

type Props = {
	setting: z.infer<typeof settingSchema>;
};

function SettingControl({
	label,
	description,
	children
}: {
	label: string;
	description: string | JSX.Element | ReactNode;
	children: ReactElement & { props: { id?: string } };
}) {
	const fallbackId = useId();
	// Extract the ID from the child, if available
	const childId = React.Children.toArray(children)
		.filter((child): child is ReactElement => React.isValidElement(child))
		.find((child) => 'id' in child.props)?.props.id;

	// Use either the provided ID or fallback to the generated ID
	const id = childId || fallbackId;
	return (
		<div className="grid gap-4 sm:grid-cols-4">
			<Label
				className="cursor-pointer"
				htmlFor={id}
			>
				{label}
			</Label>
			<div className="col-span-3 flex flex-col gap-2">
				{React.Children.map(children, (child) =>
					React.isValidElement(child)
						? React.cloneElement(child, {
								id: child.props.id || id
							})
						: child
				)}
				<div className="text-sm text-muted-foreground">
					{description}
				</div>
			</div>
		</div>
	);
}

export default function SettingsForm({ setting }: Props) {
	const { clearCache } = useSetting();
	const [settings, setSetting] = useState(setting);
	const { data: roles } =
		useApiFetch<Record<string, string>>('setting/roles');
	const { mutateAsync } =
		useApiMutation<z.infer<typeof settingSchema>>('setting/update');
	const updateSettings = useCallback(() => {
		toast.promise(
			() =>
				new Promise((resolve, reject) => {
					const parsed = settingSchema.safeParse(settings);
					if (parsed.success) {
						mutateAsync(parsed.data)
							.then((data) => resolve(data))
							.catch((err) => reject(err));
					} else {
						reject(parsed.error.issues);
					}
				}),
			{
				description: __('Updating Settings'),
				error: __('Error saving settings'),
				success: __('Settings Saved'),
				finally: () => {
					clearCache();
				}
			}
		);
	}, [settings, mutateAsync, clearCache]);
	return (
		<>
			<Card>
				<CardHeader className="border-b">{__('General')}</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-7 sm:gap-2">
						<SettingControl
							label={__('Auto Activate')}
							description={__(
								'Automatically activate themes/plugin upon installation.'
							)}
						>
							<Switch
								checked={settings.autoactivate === true}
								onCheckedChange={(checked) =>
									setSetting((prev) => ({
										...prev,
										autoactivate: checked
									}))
								}
							/>
						</SettingControl>
						{roles && (
							<SettingControl
								label={__('Access Enabled')}
								description={__(
									'Enable access to other user groups other than site administrator.'
								)}
							>
								<div className="flex flex-col gap-2">
									{Object.entries(roles).map(
										([role, label]) => (
											<div
												className="flex flex-row gap-2"
												key={role}
											>
												<Switch
													checked={settings.roles?.includes(
														role
													)}
													onCheckedChange={(
														checked
													) =>
														setSetting((prev) => {
															const _roles =
																new Set(
																	prev.roles
																);
															if (checked) {
																_roles.add(
																	role
																);
															} else {
																_roles.delete(
																	role
																);
															}
															return {
																...prev,
																roles: Array.from(
																	_roles
																)
															};
														})
													}
												/>
												{label}
											</div>
										)
									)}
								</div>
							</SettingControl>
						)}
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={updateSettings}>
						{__('Save Settings')}
					</Button>
				</CardFooter>
			</Card>
			<Card>
				<CardHeader className="border-b">
					{__('Advanced Settings')}
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-2">
						<SettingControl
							label={__('Remove Data?')}
							description={__(
								'Remove plugin settings and activation data on uninstall'
							)}
						>
							<Switch
								checked={settings.clean_on_uninstall === true}
								onCheckedChange={(checked) =>
									setSetting((prev) => ({
										...prev,
										clean_on_uninstall: checked
									}))
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
	);
}
