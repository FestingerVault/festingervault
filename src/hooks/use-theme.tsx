import {
	createContext,
	useContext,
	useEffect,
	useState
} from '@wordpress/element';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	effectiveTheme: Theme; // Add effectiveTheme to the context
};

const initialState: ThemeProviderState = {
	theme: 'system',
	setTheme: () => null,
	effectiveTheme: 'light' // Default to light
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = 'color-scheme',
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme
	);

	const [effectiveTheme, setEffectiveTheme] = useState<Theme>(() => {
		return theme;
	});

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove('light', 'dark');
		if (theme === 'system') {
			const systemTheme = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches
				? 'dark'
				: 'light';
			root.classList.add(systemTheme);
			setEffectiveTheme(systemTheme);
		} else {
			root.classList.add(theme);
			setEffectiveTheme(theme);
		}
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
		effectiveTheme // Provide effectiveTheme
	};

	return (
		<ThemeProviderContext.Provider
			{...props}
			value={value}
		>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export default function useTheme() {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error('useTheme must be used within a ThemeProvider');

	return context;
}
