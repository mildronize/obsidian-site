
// https://github.com/vercel/next.js/blob/canary/examples/custom-server-express
// Use in Dev only, production use next export
const siteMetadata = require('../data/siteMetadata');
const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // Serve assets relative with posts 
  server.use(express.static(siteMetadata.posts.contentDirectory))

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})