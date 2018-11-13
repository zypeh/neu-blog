/**
 * This file is not going through babel transformation.
 */
const debug = process.env.NODE_ENV !== 'production'
const withPreact = require('@zeit/next-preact')
const withMDX = require('@zeit/next-mdx')({
  options: {
    mdPlugins: [
      require('remark-images'),
      require('remark-emoji')
    ]
  }
})

module.exports = withPreact(withMDX({
  exportPathMap: function () {
    return {
      '/': { page: '/' },
    }
  },
  pageExtensions: ['js', 'jsx', 'mdx'],
  assetPrefix: !debug ? '/neu-blog' : '',
}))