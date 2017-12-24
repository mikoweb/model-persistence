const Path = require('./path');
const rollup = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

/**
 * @param {string} inputPath
 * @param {string} distFileName
 * @param {string} name
 * @param {Object} [babelOptions]
 * @param {Object} [globalModules]
 * @param {Object} [commonjsOptions]
 *
 * @return {Promise}
 */
module.exports = (inputPath, distFileName, name, babelOptions = {}, globalModules = {}, commonjsOptions = {}) => {
    return new Promise((resolve, reject) => {
        rollup.rollup({
            input: inputPath,
            external: Object.keys(globalModules),
            plugins: [
                commonjs(Object.assign({}, commonjsOptions)),
                babel(Object.assign({}, babelOptions)),
            ],
        }).then((bundle) => {
            resolve(bundle.write({
                file: Path.bundle('/' + distFileName),
                format: 'umd',
                sourcemap: true,
                globals: globalModules,
                name,
            }));
        }).catch((e) => {
            reject(e);
        });
    });
};
