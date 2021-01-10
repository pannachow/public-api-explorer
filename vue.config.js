const urlPrefix = `/${process.env.npm_package_name}`;
const urls = [
  {
    loc: `${urlPrefix}/`,
    lastmod: "2021-01-10",
    priority: 1.0
  },
  {
    loc: `${urlPrefix}/random`,
    lastmod: "2021-01-10",
    priority: 0.5
  }
];

module.exports = {
  // https://cli.vuejs.org/guide/deployment.html#github-pages
  publicPath:
    process.env.NODE_ENV === "production" ? `${urlPrefix}/` : "/",
  pluginOptions: {
    // https://github.com/cheap-glitch/vue-cli-plugin-sitemap
    sitemap: {
      baseURL: "https://pannachow.io",
      urls,
      outputDir: "public",
      pretty: true,
      defaults: {
        lastmod: "2021-01-10"
      }
    }
  }
};
