import isBrowser from './is-browser';

export default function isSmallScreen(): boolean {
	return isBrowser() && window.innerWidth < 768;
}
