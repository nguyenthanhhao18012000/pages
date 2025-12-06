const mix = require("laravel-mix");

// ======================================
// CONFIG SCSS ENTRY POINTS
// ======================================
let styles = {
  app: {
    input: "assets/src/scss/app.scss",
    dest: "css/",
  },
  // shopStyle: { input: "assets/src/scss/shop.scss", dest: "css/" }
};

// ======================================
// CONFIG JS ENTRY POINTS
// ======================================
let scripts = {
  app: {
    input: "assets/src/scripts/app.js",
    dest: "js/",
  },
  shop: {
    input: "assets/src/scripts/shop.js",
    dest: "js/",
  },
  // single: { input: "assets/src/scripts/single.js", dest: "js/" }
};

// ======================================
// BUILD STYLES
// ======================================
Object.keys(styles).forEach(function (key) {
  mix
    .setPublicPath("assets/dist")
    .options({ processCssUrls: false })
    .sass(styles[key].input, styles[key].dest + key + ".css");

  if (!mix.inProduction()) {
    mix.sourceMaps();
  }
});

// ======================================
// BUILD JAVASCRIPT
// ======================================
Object.keys(scripts).forEach(function (key) {
  mix
    .setPublicPath("assets/dist")
    .js(scripts[key].input, scripts[key].dest + key + ".js");

  if (!mix.inProduction()) {
    mix.sourceMaps();
  }
});

// ======================================
// VERSIONING WHEN PRODUCTION
// ======================================
if (mix.inProduction()) {
  mix.version();
}

// ======================================
// DISABLE SASS WARNINGS
// ======================================
mix.webpackConfig({
  module: {
    rules: [
      {
        test: /\.scss$/,
        enforce: "pre",
        loader: "sass-loader",
        options: {
          sassOptions: {
            quietDeps: true,
            silenceDeprecations: ["import"],
          },
        },
      },
    ],
  },
});
