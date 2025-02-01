import { Button, ButtonProps } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '@/components/ui/drawer';
import useActivation from '@/hooks/use-activation';
import useApiMutation from '@/hooks/use-api-mutation';
import { PluginInstallResponse } from '@/hooks/use-install';
import useInstalled from '@/hooks/use-is-installed';
import { __ } from '@/lib/i18n';
import { useNavigate } from '@/router';
import { TDemoContent, TPostItem } from '@/types/item';
import { decodeEntities } from '@wordpress/html-entities';
import { sprintf } from '@wordpress/i18n';
import { CloudDownload, Download, Loader } from 'lucide-react';
import { toast } from 'sonner';
type AdditionalContentDownloadSchema = {
	item_id: number | string;
	media_id?: number;
};
type Props = {
	item: TPostItem;
	media: TDemoContent;
} & ButtonProps;

export default function AdditionalDownloadButton({
	item,
	media,
	size,
	variant
}: Props) {
	const navigate = useNavigate();
	const { data: activation, active, activated } = useActivation();
	const { isPending: isInstallPending, mutateAsync: downloadAdditional } =
		useApiMutation<PluginInstallResponse, AdditionalContentDownloadSchema>(
			'item/download-additional'
		);

	const { clearCache } = useInstalled();
	function download() {
		if (typeof activation?.plan_type == 'undefined') {
			toast.error(__('License not activated'));
			navigate('/activation');
			return;
		}
		toast.promise(
			downloadAdditional({
				item_id: item.id,
				media_id: media.id
			}),
			{
				description: decodeEntities(media.title),
				loading: __('Downloading'),
				success(data) {
					if (data.link) {
						window.open(data.link, '_blank');
					}
					return __('Successful');
				},
				error(err) {
					return err.message;
				},
				finally() {
					clearCache();
				}
			}
		);
	}
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button
					variant={variant}
					size={size}
					className="flex items-center gap-2"
					disabled={isInstallPending || !activated || !active}
				>
					{isInstallPending ? (
						<Loader className="h-4 w-4 animate-spin" />
					) : (
						<CloudDownload width={16} />
					)}
					{size != 'icon' && <span>{__('Download')}</span>}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader className="text-center">
						<DrawerTitle className="text-center leading-normal">
							{decodeEntities(media.title)}
						</DrawerTitle>
						<DrawerDescription
							className="flex flex-col gap-2 text-center"
							asChild
						>
							<div>
								<div>
									{sprintf(
										__('Download demo content %s of %s'),
										decodeEntities(media.title),
										decodeEntities(item.title)
									)}
								</div>
								<div>
									{sprintf(
										__(
											'%d download credit would be consumed from your account.'
										),
										1
									)}
								</div>
								<div className="flex flex-row justify-center divide-x">
									<div className="px-4">
										{sprintf(
											__('Daily Limit: %s'),
											activation?.today_limit?.toLocaleString()
										)}
									</div>
									<div className="px-4">
										{sprintf(
											__('Used Limit: %s'),
											activation?.today_limit_used?.toLocaleString()
										)}
									</div>
									{activation?.plan_title === 'recurring' && (
										<div className="p-4">
											{sprintf(
												__('Total Limit: %s'),
												activation?.total_limit?.toLocaleString()
											)}
										</div>
									)}
								</div>
							</div>
						</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<DrawerClose asChild>
								<Button
									onClick={() => download()}
									className="gap-2"
								>
									<Download size={16} />
									<span>{__('Download')}</span>
								</Button>
							</DrawerClose>

							<DrawerClose asChild>
								<Button variant="outline">
									{__('Cancel')}
								</Button>
							</DrawerClose>
						</div>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
