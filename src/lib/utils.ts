import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isLinkActive(pathname: string, href: string | null) {
	return pathname === href || (href != '/' && pathname.startsWith(href));
}

export function removeEmptyParams(params: Record<string, string | string[]>) {
	return Object.entries(params).reduce(function (acc, [key, val]) {
		if (val.length > 0) {
			acc[key] = val;
		}
		return acc;
	}, {});
}
