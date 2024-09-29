import useNotice from '@/hooks/use-notice';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function Notices() {
	const { notice } = useNotice();
	return (
		notice.length > 0 && (
			<div>
				{notice.map((item) => (
					<Alert
						key={item.id}
						variant={item.type}
					>
						{item.icon && <item.icon />}
						<AlertTitle>{item.title}</AlertTitle>
						<AlertDescription>
							<p>{item.message}</p>
						</AlertDescription>
					</Alert>
				))}
			</div>
		)
	);
}
