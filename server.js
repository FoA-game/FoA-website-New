const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');

const chatHandler = require('./api/chat');

const PORT = Number(process.env.PORT || 8080);
const ROOT_DIR = __dirname;
const DEFAULT_FILES = new Set(['index.html', 'mindex.html']);
const MIME_TYPES = {
	html: 'text/html; charset=utf-8',
	css: 'text/css; charset=utf-8',
	js: 'application/javascript; charset=utf-8',
	json: 'application/json; charset=utf-8',
	txt: 'text/plain; charset=utf-8',
	svg: 'image/svg+xml',
	png: 'image/png',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	webp: 'image/webp',
	gif: 'image/gif',
	otf: 'font/otf',
	ttf: 'font/ttf',
	woff: 'font/woff',
	woff2: 'font/woff2'
};

function sendJson(res, statusCode, payload) {
	res.writeHead(statusCode, {
		'Content-Type': 'application/json; charset=utf-8',
		'Cache-Control': 'no-store'
	});
	res.end(JSON.stringify(payload));
}

function getContentType(filePath) {
	const extension = path.extname(filePath).slice(1).toLowerCase();
	return MIME_TYPES[extension] || 'application/octet-stream';
}

function safeResolve(requestPath) {
	const decodedPath = decodeURIComponent(requestPath);
	const relativePath = decodedPath.replace(/^\/+/, '');
	const resolvedPath = path.normalize(path.join(ROOT_DIR, relativePath));

	if (!resolvedPath.startsWith(ROOT_DIR)) {
		return null;
	}

	return resolvedPath;
}

function serveFile(res, filePath) {
	fs.readFile(filePath, (error, data) => {
		if (error) {
			sendJson(res, 404, { error: 'Not found' });
			return;
		}

		res.writeHead(200, {
			'Content-Type': getContentType(filePath),
			'Cache-Control': path.extname(filePath) === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
		});
		res.end(data);
	});
}

function serveStatic(req, res) {
	const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
	const pathname = requestUrl.pathname;

	if (pathname === '/' || pathname === '') {
		serveFile(res, path.join(ROOT_DIR, 'index.html'));
		return;
	}

	const resolvedPath = safeResolve(pathname);
	if (!resolvedPath) {
		sendJson(res, 400, { error: 'Invalid path' });
		return;
	}

	fs.stat(resolvedPath, (error, stats) => {
		if (!error && stats.isFile()) {
			serveFile(res, resolvedPath);
			return;
		}

		if (!path.extname(resolvedPath)) {
			for (const defaultFile of DEFAULT_FILES) {
				const candidate = path.join(resolvedPath, defaultFile);
				if (fs.existsSync(candidate)) {
					serveFile(res, candidate);
					return;
				}
			}
		}

		sendJson(res, 404, { error: 'Not found' });
	});
}

async function parseRequestBody(req) {
	const chunks = [];

	for await (const chunk of req) {
		chunks.push(chunk);
	}

	if (chunks.length === 0) {
		return {};
	}

	const rawBody = Buffer.concat(chunks).toString('utf8');
	if (!rawBody.trim()) {
		return {};
	}

	return JSON.parse(rawBody);
}

const server = http.createServer(async (req, res) => {
	res.setHeader('X-Content-Type-Options', 'nosniff');
	res.setHeader('Referrer-Policy', 'no-referrer');
	res.setHeader('X-Frame-Options', 'DENY');

	if (!req.url) {
		sendJson(res, 400, { error: 'Invalid request' });
		return;
	}

	if (req.url.startsWith('/api/chat')) {
		if (req.method !== 'POST') {
			res.setHeader('Allow', 'POST');
			sendJson(res, 405, { error: 'Method not allowed' });
			return;
		}

		try {
			req.body = await parseRequestBody(req);
		} catch (error) {
			sendJson(res, 400, { error: 'Invalid JSON body' });
			return;
		}

		return chatHandler(req, {
			status(statusCode) {
				this.statusCode = statusCode;
				return this;
			},
			setHeader(name, value) {
				res.setHeader(name, value);
			},
			json(payload) {
				sendJson(res, this.statusCode || 200, payload);
				return this;
			}
		});
	}

	return serveStatic(req, res);
});

server.listen(PORT, () => {
	console.log(`FoA website listening on port ${PORT}`);
});
