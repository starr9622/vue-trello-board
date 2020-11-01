module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/vue-trello-board/" : "/",
  devServer: {
    host: "localhost",
  },
  configureWebpack: {
    devtool: "source-map",
  },
};
