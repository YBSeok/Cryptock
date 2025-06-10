module.exports = {
  '[project]/frontend/postcss.config.mjs/transform.ts { CONFIG => "[project]/frontend/postcss.config.mjs [postcss] (ecmascript)" } [postcss] (ecmascript, async loader)':
    (__turbopack_context__) => {
      var { g: global, __dirname } = __turbopack_context__;
      {
        __turbopack_context__.v((parentImport) => {
          return Promise.all(
            [
              'build/chunks/node_modules_b5d1def4._.js',
              'build/chunks/[root-of-the-server]__06c503d8._.js',
            ].map((chunk) => __turbopack_context__.l(chunk)),
          ).then(() => {
            return parentImport(
              '[project]/frontend/postcss.config.mjs/transform.ts { CONFIG => "[project]/frontend/postcss.config.mjs [postcss] (ecmascript)" } [postcss] (ecmascript)',
            );
          });
        });
      }
    },
};
