import { BulkProvider } from '@/hooks/use-bulk';
import { DownloadProvider } from '@/hooks/use-download';
import { NoticeProvider } from '@/hooks/use-notice';
import { ThemeProvider } from '@/hooks/use-theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { Toaster } from './ui/sonner';

type ProvidersProps = {
	children: React.ReactNode;
};
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 5 * 60 * 1000 // 5 minutes
		}
	}
});
export function Providers({ children }: ProvidersProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<NoticeProvider>
				<DownloadProvider>
					<BulkProvider>
						<ThemeProvider
							defaultTheme="system"
							storageKey="vault-theme"
						>
							{children}
							<Toaster
								richColors
								position="bottom-left"
								expand
								pauseWhenPageIsHidden={true}
							/>
							<ReactQueryDevtools initialIsOpen={false} />
						</ThemeProvider>
					</BulkProvider>
				</DownloadProvider>
			</NoticeProvider>
		</QueryClientProvider>
	);
}
