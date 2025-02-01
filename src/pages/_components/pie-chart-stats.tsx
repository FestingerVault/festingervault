import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { useMemo } from '@wordpress/element';
import { Label, Pie, PieChart } from 'recharts';
import { ClassNameValue } from 'tailwind-merge';

export type ChartDataType = {
	name: string;
	value: number;
	fill?: string;
};

type Props = {
	className?: ClassNameValue;
	chartConfig: ChartConfig;
	chartData: ChartDataType[];
	title?: string;
};
export default function PieChartStats({
	chartConfig,
	chartData,
	className,
	title = 'Total'
}: Props) {
	const total = useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.value, 0);
	}, [chartData]);
	return (
		<ChartContainer
			config={chartConfig}
			className={cn('', className)}
		>
			<PieChart>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Pie
					data={chartData}
					dataKey="value"
					nameKey="name"
					innerRadius={60}
					strokeWidth={5}
				>
					<Label
						content={({ viewBox }) => {
							if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor="middle"
										dominantBaseline="middle"
									>
										<tspan
											x={viewBox.cx}
											y={viewBox.cy}
											className="fill-foreground text-3xl font-bold"
										>
											{total.toLocaleString()}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 24}
											className="fill-muted-foreground"
										>
											{title}
										</tspan>
									</text>
								);
							}
						}}
					/>
				</Pie>
				<ChartLegend
					content={<ChartLegendContent nameKey="name" />}
					className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
				/>
			</PieChart>
		</ChartContainer>
	);
}
