import { Switch } from '@/components/ui/switch';
import useAutoUpdate from '@/hooks/use-auto-update';
import { TThemePluginItem } from '@/types/item';
import { Row } from '@tanstack/react-table';

type Props = {
	row: Row<TThemePluginItem>;
};

export default function AutoUpdateSwitcher({ row }: Props) {
	const { setting, changeStatus, isLoading } = useAutoUpdate();
	return (
		<Switch
			checked={
				setting &&
				setting[row.original.type] &&
				setting[row.original.type]?.includes(row.original.slug)
			}
			onCheckedChange={(checked) => changeStatus(row.original, checked)}
			disabled={isLoading}
		/>
	);
}
