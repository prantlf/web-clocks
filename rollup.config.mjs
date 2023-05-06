import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import { minify } from 'rollup-plugin-swc-minify'
import livereload from 'rollup-plugin-livereload'
import pkg from './package.json' assert { type: 'json' }

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
    minify()
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
    input: 'src/ana-clock.svelte',
    output: { file: 'dist/ana-clock.mjs', sourcemap: true },
    plugins, watch
  },
  {
    input: 'src/digi-clock.svelte',
    output: { file: 'dist/digi-clock.mjs', sourcemap: true },
    plugins, watch
  },
  {
    input: 'src/index.js',
    output: [
      { file: pkg.module, sourcemap: true },
      { file: pkg.main, 'format': 'umd', name, sourcemap: true }
    ],
    plugins, watch
  }
]
