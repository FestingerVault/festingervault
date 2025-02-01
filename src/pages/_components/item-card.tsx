import { Card, CardContent } from '@/components/ui/card';
import { Grid } from '@/components/ui/grid';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import millify from 'millify';
import CountUp from 'react-countup';
import { ClassNameValue } from 'tailwind-merge';
type IconProps = React.HTMLAttributes<SVGElement>;

type Props = {
	className?: ClassNameValue;
	icon: React.ComponentType<IconProps> & LucideIcon;
	title: string;
	count: number;
};
export default function ItemCard({
	className,
	icon: Icon,
	title,
	count
}: Props) {
	return (
		<Card className={cn(className)}>
			<CardContent className="relative">
				<Grid size={25} />
				<div
					className={cn(
						'flex aspect-square flex-col justify-between',
						className
					)}
				>
					<Icon size="36" />
					<div className="space-y-1">
						<div className="text-2xl">
							<CountUp
								start={0}
								end={count}
								duration={2.75}
								formattingFn={(num) => millify(num)}
							/>
						</div>
						<div className="text-sm text-muted-foreground">
							{title}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
