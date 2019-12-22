const { getFirebaseAppSecrets } = require('@feuertiger/tools');

module.exports = {
    webpack: config => ({
        // Fixes npm packages that depend on `fs` module
        // eslint-disable-next-line no-param-reassign
        node: {
            fs: 'empty'
        },
        ...config
    }),
    publicRuntimeConfig: {
        tokens: getFirebaseAppSecrets()
    },
    distDir: './dist'
};
