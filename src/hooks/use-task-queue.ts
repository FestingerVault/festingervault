import { useCallback, useRef } from '@wordpress/element';
import PQueue from 'p-queue';

export default function useTaskQueue(concurrency: number = 2) {
	const queue = useRef(new PQueue({ concurrency }));

	const addTask = useCallback(
		(task: () => Promise<unknown>) => {
			queue.current.add(task);
		},
		[queue]
	);

	return { addTask };
}
