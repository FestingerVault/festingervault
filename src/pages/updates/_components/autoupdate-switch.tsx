import { Switch } from '@/components/ui/switch';
import useActivation from '@/hooks/use-activation';
import useAutoUpdate from '@/hooks/use-auto-update';
import { TThemePluginItem } from '@/types/item';

type Props = {
	item: TThemePluginItem;
};

export default function AutoUpdateSwitcher({ item }: Props) {
	const { setting, changeStatus, isLoading } = useAutoUpdate();
	const { activated, active, can_autoupdate } = useActivation();

	return (
		<Switch
			checked={
				activated &&
				active &&
				can_autoupdate &&
				setting &&
				setting[item.type] &&
				setting[item.type]?.includes(item.slug)
			}
			onCheckedChange={(checked) => changeStatus(item, checked)}
			disabled={isLoading || !activated || !active || !can_autoupdate}
		/>
	);
}
