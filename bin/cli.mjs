#!/usr/bin/env nodemjs
// -*- coding: utf-8, tab-width: 2 -*-

import fs from 'fs';

import translate from '../src/translate';

let inputFile = process.argv[2];
if (inputFile === '-') { inputFile = ''; }
if (!inputFile) { inputFile = process.stdin.fd; }

fs.readFile(inputFile, { encoding: 'UTF-8' }, function hasFile(err, data) {
  if (err) {
    console.error(err);
    process.exit(4);
  }
  process.stdout.write(translate(data).join('\n'));
});
