import { Label } from '@/components/ui/label';
import {
	Children,
	cloneElement,
	isValidElement,
	useId
} from '@wordpress/element';

export default function SettingControl({
	label,
	description,
	children
}: {
	label: string;
	description: React.ReactNode;
	children: React.ReactElement & { props: { id?: string } };
}) {
	const fallbackId = useId();
	// Extract the ID from the child, if available
	const childId = Children.toArray(children)
		.filter((child): child is React.ReactElement => isValidElement(child))
		.find((child) => 'id' in child.props)?.props.id;

	// Use either the provided ID or fallback to the generated ID
	const id = childId || fallbackId;
	return (
		<div className="grid gap-4 sm:grid-cols-4">
			<Label
				className="cursor-pointer"
				htmlFor={id}
			>
				{label}
			</Label>
			<div className="col-span-3 flex flex-col gap-2">
				{Children.map(children, (child) =>
					isValidElement(child)
						? cloneElement(child, {
								id: child.props.id || id
							})
						: child
				)}
				<div className="text-sm text-muted-foreground">
					{description}
				</div>
			</div>
		</div>
	);
}
