import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ActivationStatusToString } from '@/config/activation-status';
import useActivation from '@/hooks/use-activation';
import { __ } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { decodeEntities } from '@wordpress/html-entities';
import { sprintf } from '@wordpress/i18n';
import moment from 'moment';
import { ClassNameValue } from 'tailwind-merge';

type Props = {
	className?: ClassNameValue;
};
export default function LicenseStatus({ className }: Props) {
	const { data } = useActivation();
	return (
		data &&
		data.status != 'not-activated' && (
			<Card
				className={cn(
					'flex flex-col justify-between gap-6 p-8',
					className
				)}
			>
				<div>
					<h2 className="flex items-center gap-2 text-3xl font-semibold">
						{data?.plan_title}
						<Badge
							variant="outline"
							className="border-green-600 bg-green-600/10 text-green-600"
						>
							{data?.expires > 0
								? data?.plan_type === 'recurring'
									? __('Monthly Plan')
									: __('One-Time Plan')
								: __('Lifetime Plan')}
						</Badge>
					</h2>
					<div className="text-muted-foreground">
						{data && decodeEntities(data?.plan_detail)}
					</div>
				</div>
				<div className="flex flex-col gap-4 lg:flex-row">
					<div className="rounded-sm border border-dashed border-muted-foreground p-4">
						<div className="text-lg capitalize">
							<span>
								{ActivationStatusToString[data?.status]}
							</span>
						</div>
						<div className="text-sm text-muted-foreground">
							{__('Status')}
						</div>
					</div>
					<div className="rounded-sm border border-dashed border-muted-foreground p-4">
						<div className="text-lg">
							{data?.today_limit?.toLocaleString()}
						</div>
						<div className="text-sm text-muted-foreground">
							{__('Daily Today')}
						</div>
					</div>
					{data?.plan_type === 'onetime' && (
						<div className="rounded-sm border border-dashed border-muted-foreground p-4">
							<div className="text-lg">
								{data?.total_limit?.toLocaleString()}
							</div>
							<div className="text-sm text-muted-foreground">
								{__('All-Time Limit')}
							</div>
						</div>
					)}
					<div className="rounded-sm border border-dashed border-muted-foreground p-4">
						<div className="text-lg">{__('Lifetime')}</div>
						<div className="text-sm text-muted-foreground">
							{__('Updates')}
						</div>
					</div>

					<div className="rounded-sm border border-dashed border-muted-foreground p-4">
						<div className="text-lg">
							{data?.expires > 0
								? moment
										.unix(data?.expires)
										.format('D MMM, YYYY')
								: __('Never')}
						</div>
						<div className="text-sm text-muted-foreground">
							{__('Expires')}
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center gap-12 lg:flex-row">
					<div className="flex flex-1 flex-col gap-2">
						<div className="space-x-1">
							<span className="text-muted-foreground">
								{__('Credits used:')}
							</span>
							<span>
								{sprintf(
									__('%s of %s'),
									data?.today_limit_used?.toLocaleString() ??
										0,
									data?.today_limit?.toLocaleString() ?? 0
								)}
							</span>
						</div>
						{data && (
							<Progress
								value={
									100 *
									(data.today_limit_used / data.today_limit)
								}
							/>
						)}
					</div>
				</div>
				<div className="text-muted-foreground">
					{sprintf(__('Install ID: %s'), data.activation_key)}
				</div>
			</Card>
		)
	);
}
