export default function Errors(props: { errors?: string[] }) {
	if (!props.errors?.length) return null;
	return (
		<div className="text-xs text-destructive">
			{props.errors.map((err, index) => (
				<p key={index}>{err}</p>
			))}
		</div>
	);
}
