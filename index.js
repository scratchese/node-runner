#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const cwd = process.cwd()
const target = process.argv[2] || require(path.resolve(cwd, 'package.json')).main
const file = path.resolve(cwd, target)

let session = launch()

function launch () {
  console.log(`\x1b[32m[node-run] node ${target}`, '\x1b[0m')
  const session = spawn('node', [file])
  session.stdout.pipe(process.stdout)
  session.stderr.pipe(process.stderr)
  return session
}

process.on('SIGINT', () => {
  console.log('\n[node-run] exits')
  process.exit()
})

fs.watch(cwd, (curr, filename) => {
  if (filename.indexOf('node_module') < 0) {
    session.kill('SIGINT')
    session = launch()
  }
})
