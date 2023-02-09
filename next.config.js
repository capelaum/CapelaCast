module.exports = {
  images: {
    domains: ['storage.googleapis.com']
  },
  swcMinify: true,
  target: 'serverless',
  version: 2,
  builds: [{ src: 'package.json', use: '@vercel/next' }]
}
