import * as esbuild from 'esbuild'
import { builtinModules } from 'node:module'

const prod = Deno.args[0] === 'prod'

const context = await esbuild.context({
  banner: {
    js: `/**
 * THIS IS A GENERATED/BUNDLED FILE BY ESBUILD: https://github.com/evanw/esbuild
 * BUNDLED AT: ${new Date().toISOString()}
 */`,
  },
  entryPoints: ['./src/main.ts'],
  bundle: true,
  external: [
    'obsidian',
    'electron',
    '@codemirror/autocomplete',
    '@codemirror/collab',
    '@codemirror/commands',
    '@codemirror/language',
    '@codemirror/lint',
    '@codemirror/search',
    '@codemirror/state',
    '@codemirror/view',
    '@lezer/common',
    '@lezer/highlight',
    '@lezer/lr',
    ...builtinModules,
  ],
  format: 'cjs',
  target: 'esnext',
  logLevel: 'info',
  sourcemap: prod ? false : 'inline',
  treeShaking: true,
  outfile: './dist/main.js',
  minify: prod,
})

if (prod) {
  await context.rebuild()
  Deno.exit(0)
} else {
  await context.watch()
}
