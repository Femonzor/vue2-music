module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  devServer: {
    proxy: {
      '/api': {
        headers: {
          referer: 'https://y.qq.com/portal/playlist.html',
        },
        target: 'https://c.y.qq.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
