import babel from 'rollup-plugin-babel'

const isRelease = process.env[ 'BUILD_MODE' ] === 'release'
const plugins = [ babel() ]

export default {
  entry: 'lib/index.js',
  dest: 'dist/index.js',
  plugins: plugins,
  sourceMap: !isRelease,
  format: 'iife'
}
