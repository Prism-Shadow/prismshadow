// GitHub Pages emulator for signing off routing on a built site (no dependencies).
// usage: node .agents/skills/prismshadow-dev/scripts/pages-server.mjs dist 4173
//   /x  -> x.html      /x/ -> x/index.html      folder without slash -> 301
//   anything else -> 404.html with status 404 (what GitHub Pages does).
// Unlike `vite preview`, it does NOT rewrite unknown paths to index.html, so a
// route missing from allRoutes() in src/prerender.tsx shows up as a 404 here.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
const [dir = "dist", port = "4173"] = process.argv.slice(2)
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain' }
const isFile = async (p) => (await stat(p).catch(() => null))?.isFile()
const isDir = async (p) => (await stat(p).catch(() => null))?.isDirectory()
createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x')
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '')
  const base = join(dir, rel)
  let file = null
  if (rel.endsWith('/')) file = (await isFile(join(base, 'index.html'))) ? join(base, 'index.html') : null
  else if (await isFile(base)) file = base
  else if (await isFile(base + '.html')) file = base + '.html'
  else if (await isDir(base)) { res.writeHead(301, { Location: url.pathname + '/' }); return res.end() }
  if (!file) { res.writeHead(404, { 'Content-Type': types['.html'] }); return res.end(await readFile(join(dir, '404.html'))) }
  res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' })
  res.end(await readFile(file))
}).listen(Number(port), () => console.log(`GitHub Pages emulator: http://localhost:${port} (serving ${dir})`))
