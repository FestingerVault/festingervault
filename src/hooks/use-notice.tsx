import { alertVariants } from '@/components/ui/alert';
import { VariantProps } from 'class-variance-authority';
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState
} from 'react';

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

	const addNotice = useCallback((notice: TNotice) => {
		setNotice((prev) => [...prev.filter((n) => n.id != notice.id), notice]);
	}, []);
	const removeNotice = useCallback((id: string) => {
		setNotice((prev) => prev.filter((notice) => notice.id === id));
	}, []);
	const flushNotice = useCallback(() => {
		setNotice(() => []);
	}, []);

	const value = useMemo(
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
			value={value}
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
