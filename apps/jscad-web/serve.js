import http from 'http'
import fs from 'fs/promises'
import path from 'path'
import url from 'url'
import zlib from 'zlib'

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.map': 'application/json',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.ttf': 'font/ttf',
  '.woff2': 'font/woff2',
  '.wasm': 'application/wasm',
}

/**
 * Route an http request
 */
const handleRequest = (req) => {
  const parsedUrl = url.parse(req.url, true)
  let pathname = parsedUrl.pathname

  if (pathname === '/docs') {
    // docs redirect
    return { status: 301, content: '/docs/' }
  } else if (pathname.endsWith('/index.html')) {
    // redirect index.html to /
    return { status: 301, content: pathname.slice(0, -10) }
  } else if (pathname.endsWith('/')) {
    // serve index.html
    return handleStatic(`${pathname}index.html`)
  } else if (pathname === '/remote') {
    // fetch remote script
    return handleRemote(parsedUrl)
  } else {
    // serve static files
    return handleStatic(pathname)
  }
}

/**
 * Serve static file from the build directory
 */
const handleStatic = async (pathname) => {
  let filePath = path.join(process.cwd(), 'build', pathname)

  const stats = await fs.stat(filePath).catch(() => undefined)
  if (!stats || !stats.isFile()) {
    return { status: 404, content: 'not found' }
  }

  // detect content type
  const extname = path.extname(filePath)
  if (!mimeTypes[extname]) {
    console.error(`serving unknown mimetype ${extname}`)
  }
  const contentType = mimeTypes[extname] || 'application/octet-stream'

  const content = await fs.readFile(filePath)
  return { status: 200, content, contentType }
}

/**
 * Serve a remote script at a url
 */
const handleRemote = async (parsedUrl) => {
  // parse url from query parameters
  const scriptUrl = decodeURIComponent(parsedUrl.query.url)
  if (scriptUrl) {
    console.log(`fetching remote url ${scriptUrl}`)
    const res = await fetch(scriptUrl)
    if (res.ok) {
      const content = await res.text()
      return { status: 200, content, contentType: 'text/plain' }
    } else {
      console.warn(`failed to fetch remote url ${scriptUrl}`)
      return { status: 404, content: 'not found' }
    }
  } else {
    return { status: 400, content: 'missing url parameter' }
  }
}

/* create http server */
const server = http.createServer(async (req, res) => {
  const startTime = new Date()

  // handle request
  let result = { status: 500, content: 'internal server error' }
  try {
    result = await handleRequest(req)
  } catch (err) {
    console.error('error handling request', err)
  }
  let { status, content, contentType } = result

  // write http header
  const headers = { 'Connection': 'keep-alive' }
  if (contentType) headers['Content-Type'] = contentType
  if (status === 301) {
    // handle redirect
    headers['Location'] = content
    content = ''
  }
  // compress content
  const gzipped = gzip(req, content)
  if (gzipped) {
    headers['Content-Encoding'] = 'gzip'
    content = gzipped
  }
  res.writeHead(status, headers)
  // write http response
  res.end(content)

  // log request
  const endTime = new Date()
  const ms = endTime - startTime
  const line = `${endTime.toISOString()} ${status} ${req.method} ${req.url} ${content.length} ${ms}ms`
  if (status < 400) {
    console.log(line)
  } else {
    // highlight errors red
    console.log(`\x1b[31m${line}\x1b[0m`)
  }
})

/**
 * Start http server on given port
 */
export const serve = (port) => {
  server.listen(port, () => {
    console.log(`JSCADUI running on http://localhost:${port}`)
  })
}

/**
 * If the request accepts gzip, compress the content, else undefined
 */
const gzip = (req, content) => {
  if (!content) return undefined
  const acceptEncoding = req.headers['accept-encoding']
  if (acceptEncoding?.includes('gzip')) {
    return zlib.gzipSync(content)
  }
}
