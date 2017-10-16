
var path = require('path')
console.log('reading config...')
module.exports = {
  getSourceExts() {
    return [
      'js',
      'ts',
      'tsx'
    ]
  },
  getProjectRoots() {
    return [__dirname]
  },
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer')
  },
}
