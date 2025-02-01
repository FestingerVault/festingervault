type StackedBarChartProps = {
	data: StackedBarChartDataType[];
};
export type StackedBarChartDataType = {
	name: string;
	label: string;
	value: number;
	color: string;
};

export function StackedBarChart({ data }: StackedBarChartProps) {
	const total = data.reduce((sum, item) => sum + item.value, 0);
	const width = 300;
	const height = 10;
	const padding = 5;
	if (total === 0) {
		return null;
	}
	return (
		<div className="flex flex-col gap-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox={`0 0 ${width} ${height}`}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				fill="none"
			>
				{data.map((item, index) => {
					const barWidth = (item.value / total) * width - padding;
					const x = data
						.slice(0, index)
						.reduce(
							(sum, item) =>
								sum +
								((item.value / total) * width - padding / 2) +
								padding,
							0
						);

					return (
						<rect
							key={item.name}
							x={x}
							y={0}
							rx={4}
							width={barWidth}
							height={height}
							fill={item.color}
							className="dura transition-all"
							tabIndex={-1}
						/>
					);
				})}
			</svg>
			<div className="flex flex-row gap-4">
				{data.map((item) => (
					<div
						key={item.name}
						className="flex items-center gap-2"
					>
						<span
							className={`bg-chart block h-4 w-4 rounded-full`}
							style={{
								background: item.color
							}}
						></span>
						<div className="space-x-1 text-sm">
							<span>{item.value}</span>
							<span className="text-muted-foreground">
								{item.label}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
