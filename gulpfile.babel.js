import series from 'gulp'
import PluginError from 'plugin-error'

import eslint from './gulp/eslint'
import test from './gulp/test'

const options = {
    src: 'src',
    dist: 'lib',
    test: 'test',
    errorHandler: (title) => {
        return (err) => {
            PluginError(`[${title}]`, err ? err.toString() : err)
        }
    }
}

eslint(options)
test(options)

function build() {
    
}

gulp.task('default', ['clean'], () => {
    gulp.start('build')
})

exports.default = series();