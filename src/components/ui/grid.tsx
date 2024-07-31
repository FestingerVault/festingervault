import { useId } from "react";

export const Grid = ({
	pattern,
	size,
  }: {
	pattern?: number[][];
	size?: number;
  }) => {
	const p = pattern ?? [
	  [Math.floor(Math.random() * 4) + 2, Math.floor(Math.random() * 6) + 1],
	  [Math.floor(Math.random() * 4) + 2, Math.floor(Math.random() * 6) + 1],
	  [Math.floor(Math.random() * 4) + 2, Math.floor(Math.random() * 6) + 1],
	];
	return (
	  <div className="pointer-events-none absolute top-0 left-0 h-full w-full [mask-image:linear-gradient(white,transparent)]">
		<div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
		  <GridPattern
			width={size ?? 20}
			height={size ?? 20}
			x="0"
			y="0"
			squares={p}
			className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
		  />
		</div>
	  </div>
	);
  };

  export function GridPattern({ width, height, x, y, squares, ...props }: any) {
	const patternId = useId();

	return (
	  <svg aria-hidden="true" {...props}>
		<defs>
		  <pattern
			id={patternId}
			width={width}
			height={height}
			patternUnits="userSpaceOnUse"
			x={x}
			y={y}
		  >
			<path d={`M.5 ${height}V.5H${width}`} fill="none" />
		  </pattern>
		</defs>
		<rect
		  width="100%"
		  height="100%"
		  strokeWidth={0}
		  fill={`url(#${patternId})`}
		/>
		{squares && (
		  <svg x={x} y={y} className="overflow-visible">
			{squares.map(([x, y]: any,index:number) => (
			  <rect
				strokeWidth="0"
				key={index}
				width={width + 1}
				height={height + 1}
				x={x * width}
				y={y * height}
			  />
			))}
		  </svg>
		)}
	  </svg>
	);
  }