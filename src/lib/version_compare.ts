export default function version_compare(
	v1: string,
	v2: string,
	operator?: string
) {
	try {
		let compare = 0;

		const vm: { [key: string]: number } = {
			dev: -6,
			alpha: -5,
			a: -5,
			beta: -4,
			b: -4,
			RC: -3,
			rc: -3,
			'#': -2,
			p: 1,
			pl: 1
		};

		const _prepVersion = (v: string): (number | string)[] => {
			v = v.replace(/[_\-+]/g, '.');
			v = v.replace(/([^.\d]+)/g, '.$1.').replace(/\.{2,}/g, '.');
			return v.length === 0 ? [-8] : v.split('.');
		};

		const _numVersion = (v: string | number): number => {
			if (typeof v === 'number') return v;
			if (!v) return 0;
			return isNaN(parseInt(v, 10)) ? vm[v] || -7 : parseInt(v, 10);
		};

		const v1Parts = _prepVersion(v1);
		const v2Parts = _prepVersion(v2);
		const maxLength = Math.max(v1Parts.length, v2Parts.length);

		for (let i = 0; i < maxLength; i++) {
			const part1 = _numVersion(v1Parts[i]);
			const part2 = _numVersion(v2Parts[i]);

			if (part1 === part2) continue;

			if (part1 < part2) {
				compare = -1;
				break;
			} else if (part1 > part2) {
				compare = 1;
				break;
			}
		}

		if (!operator) {
			return compare;
		}

		switch (operator) {
			case '>':
			case 'gt':
				return compare > 0;
			case '>=':
			case 'ge':
				return compare >= 0;
			case '<=':
			case 'le':
				return compare <= 0;
			case '===':
			case '=':
			case 'eq':
				return compare === 0;
			case '<>':
			case '!==':
			case 'ne':
				return compare !== 0;
			case '':
			case '<':
			case 'lt':
				return compare < 0;
			default:
				return null;
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (err) {
		return null;
	}
}
