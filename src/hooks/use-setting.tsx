import { __ } from '@/lib/i18n';
import { useQueryClient } from '@tanstack/react-query';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState
} from '@wordpress/element';
import { toast } from 'sonner';
import { z } from 'zod';
import useApiFetch from './use-api-fetch';
import useApiMutation from './use-api-mutation';
export const settingSchema = z.object({
	autoactivate: z.boolean().default(false),
	clean_on_uninstall: z.boolean().default(false),
	autoupdate_day_of_week: z
		.array(z.number().min(0).max(6))
		.min(0)
		.max(7)
		.refine((array) => new Set(array).size === array.length, {
			message: 'Days cannot repeat'
		})
		.optional(),
	autoupdate_hour: z.coerce.number().min(0).max(23).default(0),
	autoupdate_minute: z.coerce.number().min(0).max(59).default(0),
	roles: z.array(z.string()).default([])
});
type SettingProviderProps = {
	children: React.ReactNode;
};
type TSetting = z.infer<typeof settingSchema>;
type SettingState = {
	settings: TSetting;
	setSetting: (key: string, value: unknown) => void;
	updateSettings: () => void;
	isFetched: boolean;
	isLoading: boolean;
	isFetching: boolean;
	clearCache: () => void;
};

const SettingProviderContext = createContext<SettingState>(null);

export function SettingProvider({ children, ...props }: SettingProviderProps) {
	const queryClient = useQueryClient();
	const [settings, setSettings] = useState<TSetting>(null);
	const {
		data: setting,
		isFetched,
		isLoading,
		isFetching
	} = useApiFetch<TSetting>(`setting/get`, {});
	const { mutateAsync: updateSettingAsync } =
		useApiMutation<z.infer<typeof settingSchema>>('setting/update');
	const clearCache = useCallback(() => {
		queryClient.invalidateQueries({
			queryKey: ['setting/get']
		});
	}, [queryClient]);
	const setSetting = useCallback(
		(key: string, value: unknown) => {
			setSettings((prev) => ({ ...prev, [key]: value }));
		},
		[setSettings]
	);
	const updateSettings = useCallback(() => {
		toast.promise(
			() =>
				new Promise((resolve, reject) => {
					const parsed = settingSchema.safeParse(settings);
					if (parsed.success) {
						updateSettingAsync(parsed.data)
							.then((data) => resolve(data))
							.catch((err) => reject(err));
					} else {
						reject(parsed.error.issues);
					}
				}),
			{
				description: __('Updating Settings'),
				error: (err) => err.message ?? __('Error saving settings'),
				success: __('Settings Saved'),
				finally: () => {
					clearCache();
				}
			}
		);
	}, [settings, updateSettingAsync, clearCache]);

	useEffect(() => {
		const zParsed = settingSchema.safeParse(setting);
		if (zParsed.success) {
			setSettings(zParsed.data);
		}
	}, [setSetting, setting]);
	const value = useCallback(
		() => ({
			settings,
			setSetting,
			updateSettings,
			isFetched,
			isLoading,
			isFetching,
			clearCache
		}),
		[
			clearCache,
			isFetched,
			isFetching,
			isLoading,
			setSetting,
			settings,
			updateSettings
		]
	);
	return (
		<SettingProviderContext.Provider
			{...props}
			value={value()}
		>
			{children}
		</SettingProviderContext.Provider>
	);
}
export default function useSetting() {
	const context = useContext(SettingProviderContext);

	if (context === undefined) {
		throw new Error('useSetting must be used within a SettingProvider');
	}

	return context;
}
