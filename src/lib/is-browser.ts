export default function isBrowser(): boolean {
	return typeof window !== 'undefined';
}
