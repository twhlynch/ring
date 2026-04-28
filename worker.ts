import HTML from './index.html';
import RING_RAW from './ring.txt';

const RING = RING_RAW.split('\n')
	.map((s) => s.trim())
	.filter(Boolean);

function hostname(req: Request) {
	const origin = req.headers.get('origin');
	const referer = req.headers.get('referer');

	try {
		if (origin) return new URL(origin).hostname.toLowerCase();
		if (referer) return new URL(referer).hostname.toLowerCase();
	} catch {}

	return null;
}

function handle(req: Request) {
	const origin = hostname(req);
	const direction = new URL(req.url).pathname;

	if (!origin || !['/left', '/right'].includes(direction)) return;

	const i = RING.indexOf(origin);
	if (i === -1) return;

	const dir = direction === '/left' ? -1 : 1;
	const destination = RING[(i + dir + RING.length) % RING.length];

	return Response.redirect(`https://${destination}`, 302);
}

function index() {
	return new Response(HTML, {
		headers: { 'content-type': 'text/html' },
	});
}

export default {
	async fetch(req: Request, _env: Env): Promise<Response> {
		try {
			return handle(req) ?? index();
		} catch {
			return index();
		}
	},
};
