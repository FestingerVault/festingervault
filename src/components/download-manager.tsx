import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover';
import useDownload from '@/hooks/use-download';
import { __ } from '@/lib/i18n';
import { sprintf } from '@wordpress/i18n';
import { DownloadCloud } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

const StatusText = {
	completed: __('Completed'),
	downloading: __('Downloading'),
	pending: __('Queued')
};
export default function DownloadManager() {
	const { downloads, clearCompleted } = useDownload();
	const downloading = downloads.find(
		(download) => download.status === 'downloading'
	);
	return downloads.length > 0 ? (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={downloading ? 'secondary' : 'outline'}
					size="icon"
				>
					<DownloadCloud
						size={16}
						className={downloading && 'animate-bounce'}
					/>
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<ScrollArea className="h-96 max-h-96">
					<div className="flex flex-col divide-y">
						<Button
							variant="outline"
							size="sm"
							onClick={clearCompleted}
						>
							{__('Clear Completed')}
						</Button>
						{downloads.map((download) => (
							<div
								className="flex flex-col gap-0.5 p-2 text-sm"
								key={download.uid}
							>
								<div>{download.filename}</div>
								<div className="text-muted-foreground">
									{download.status === 'downloading'
										? sprintf(
												__('Progress: %s%%'),
												download.percentage
											)
										: StatusText[download.status]}
								</div>
							</div>
						))}
					</div>
				</ScrollArea>
			</PopoverContent>
		</Popover>
	) : null;
}
