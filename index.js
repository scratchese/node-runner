#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

const cwd = process.cwd();
const fileToRead = process.argv[2] || require(path.resolve(cwd, 'package.json')).main;

const run = () => {
  console.log(`\x1b[32m[node-run] node ${fileToRead}`, '\x1b[0m')
  exec(`node ${fileToRead}`, {
    cwd
  },(error, stdout, stderr)=>{
    stdout && process.stdout.write(stdout)
    stderr && process.stderr.write(stderr)
  });
}

run();
fs.watch(cwd, (curr, filename) => {
  const timestamp = Date.now();
  run();
});
