import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import livereload from 'rollup-plugin-livereload'
import pkg from './package.json'

function debug() {
  return [
    svelte({ compilerOptions: { customElement: true, dev: true } }),
    resolve({ browser: true, dedupe: ['svelte'] }), serve(), livereload('.')
  ]

  function serve() {
    let started
    return {
      writeBundle() {
        if (!started) {
          started = true
          require('child_process').spawn('npm', ['run', 'start', '--', '--dev'],
            { stdio: ['ignore', 'inherit', 'inherit'], shell: true })
        }
      }
    }
  }
}

function release() {
  return[
    svelte({ compilerOptions: { customElement: true } }),
    resolve({ browser: true, dedupe: ['svelte'] }),
    esbuild({ minify: true, sourceMap: true })
  ]
}

const name = pkg.name
  .replace(/^(?:@\S+\/)?(\S+)/, '$1')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase())
const plugins = process.env.ROLLUP_WATCH ? debug() : release() 
const watch = { clearScreen: false }

export default [
  {
    input: 'src/ana-clock.js',
    output: { file: 'dist/ana-clock.mjs', 'format': 'es', sourcemap: true },
    plugins, watch
  },
  {
    input: 'src/digi-clock.js',
    output: { file: 'dist/digi-clock.mjs', 'format': 'es', sourcemap: true },
    plugins, watch
  },
  {
    input: 'src/index.js',
    output: [
      { file: pkg.module, 'format': 'es', sourcemap: true },
      { file: pkg.main, 'format': 'umd', name, sourcemap: true }
    ],
    plugins, watch
  }
]
