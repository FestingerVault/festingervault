import { alertVariants } from '@/components/ui/alert';
import {
	createContext,
	useCallback,
	useContext,
	useState
} from '@wordpress/element';
import { VariantProps } from 'class-variance-authority';

type IconProps = React.HTMLAttributes<SVGElement>;

type TNotice = {
	id: string;
	title: string | React.ReactNode | React.ReactElement;
	message: string | React.ReactNode | React.ReactElement;
	icon?: React.ComponentType<IconProps>;
	type?: VariantProps<typeof alertVariants>['variant'];
};
type NoticeProviderProps = {
	children: React.ReactNode;
};

type NoticeProviderState = {
	notice: Array<TNotice>;
	addNotice: (notice: TNotice) => void;
	removeNotice: (id: string) => void;
	flushNotice: () => void;
};

const initialState: NoticeProviderState = {
	notice: [],
	addNotice: () => null,
	removeNotice: () => null,
	flushNotice: () => null
};

const NoticeProviderContext = createContext<NoticeProviderState>(initialState);

export function NoticeProvider({ children, ...props }: NoticeProviderProps) {
	const [notices, setNotice] = useState<Array<TNotice>>([]);

	const addNotice = useCallback(
		(notice: TNotice) => {
			if (!notices.find((n) => n.id === notice.id)) {
				setNotice((prev) => [
					...prev.filter((n) => n.id != notice.id),
					notice
				]);
			}
		},
		[setNotice, notices]
	);
	const removeNotice = useCallback(
		(id: string) => {
			if (notices.find((notice) => notice.id === id)) {
				setNotice((prev) => prev.filter((notice) => notice.id === id));
			}
		},
		[notices]
	);
	const flushNotice = useCallback(() => {
		if (notices.length > 0) {
			setNotice(() => []);
		}
	}, [notices]);

	const value = useCallback(
		() => ({
			notice: notices,
			addNotice,
			removeNotice,
			flushNotice
		}),
		[addNotice, flushNotice, notices, removeNotice]
	);

	return (
		<NoticeProviderContext.Provider
			{...props}
			value={value()}
		>
			{children}
		</NoticeProviderContext.Provider>
	);
}

export default function useNotice() {
	const context = useContext(NoticeProviderContext);

	if (context === undefined)
		throw new Error(
			'useNotice must be used within a NoticeProviderContext'
		);

	return context;
}
