export default function capitalizeHyphenatedWords(inputString: string): string {
	return inputString
		?.replace(/(?:^|-)([a-z])/g, function (match, p1) {
			return ` ${p1.toUpperCase()}`;
		})
		?.trim();
}
