import HTMLReactParser from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';

export default function renderHtml(
	html: string
): ReturnType<typeof HTMLReactParser> {
	return HTMLReactParser(sanitizeHtml(html), {
		trim: true
	});
}
