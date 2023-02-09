module.exports = {
  images: {
    domains: ['storage.googleapis.com']
  },
  swcMinify: true,
  version: 2,
  builds: [{ src: 'package.json', use: '@vercel/next' }]
}
