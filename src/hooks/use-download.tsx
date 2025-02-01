import { __ } from '@/lib/i18n';
import uuid from '@/lib/uuid';
import {
	createContext,
	useContext,
	useEffect,
	useState
} from '@wordpress/element';
import useDownloader from 'react-use-downloader';
import { toast } from 'sonner';
import useActivation from './use-activation';
interface DownloadItem {
	uid: string;
	title?: string;
	image?: string;
	url: string;
	filename: string;
	percentage: number;
	status: 'pending' | 'queued' | 'downloading' | 'completed' | 'error';
}
interface DownloadContextType {
	downloads: DownloadItem[];
	addDownloadTask: (url: string, filename: string) => void;
	clearCompleted: () => void;
}
const DownloadContext = createContext<DownloadContextType | undefined>(
	undefined
);

type DownloadProviderProps = {
	children: React.ReactNode;
};
export function DownloadProvider({ children }: DownloadProviderProps) {
	const [downloads, setDownloads] = useState<DownloadItem[]>([]);
	const { download, percentage, isInProgress } = useDownloader();
	const { active, activated } = useActivation();
	const addDownloadTask = (url: string, filename: string) => {
		if (!activated) {
			toast.error(__('License not activated'));
			return;
		}
		if (!active) {
			toast.error(__('License suspended'));
			return;
		}
		setDownloads((prev) => [
			...prev,
			{
				uid: uuid(),
				url,
				filename,
				status: 'pending',
				percentage: 0
			}
		]);
	};
	const clearCompleted = () => {
		setDownloads((prev) =>
			prev.filter((pre) => pre.status !== 'completed')
		);
	};
	const downloading =
		downloads.filter((d) => d.status === 'downloading').length > 0;
	const pending = downloads.find((d) => d.status === 'pending');
	useEffect(() => {
		if (!downloading && pending) {
			setDownloads((prev) =>
				prev.map((d) =>
					d.uid === pending.uid ? { ...d, status: 'downloading' } : d
				)
			);
			download(pending.url, pending.filename);
		}
	}, [downloading, pending, setDownloads, download]);

	useEffect(() => {
		setDownloads((prev) =>
			prev.map((d) =>
				d.status === 'downloading'
					? {
							...d,
							status: isInProgress ? 'downloading' : 'completed',
							percentage
						}
					: d
			)
		);
	}, [isInProgress, percentage, setDownloads]);

	return (
		<DownloadContext.Provider
			value={{ addDownloadTask, downloads, clearCompleted }}
		>
			{children}
		</DownloadContext.Provider>
	);
}

export default function useDownload() {
	const context = useContext(DownloadContext);
	if (!context) {
		throw new Error('useDownloader must be used within a DownloadProvider');
	}
	return context;
}
