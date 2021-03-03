#!/usr/bin/env node

const run = require('contributors-gen');
const meow = require('meow');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

const cli = meow(
  `
Usage
  $ contributors-gen -[wfbcs] <comments>

Options
  --write, -w            Write the output to the file        (default: false)
  --file, -f <filename>  The filename to write the output to (default: CONTRIBUTORS)
  --bots, -b             Whether to include bots or not      (default: false)

Examples
  $ contributors-gen -w
  $ contributors-gen -f AUTHORS -w "first line" "second line"
  $ contributors-gen -b
    person <person@gmail.com>
    ESLint Jenkins <eslint[bot]@users.noreply.github.com>
    ...
  $ contributors-gen
    person <person@gmail.com>
    ...
  $ contributors-gen "first comment"
    # first comment
    person <person@gmail.com>
    ...
  $ contributors-gen "first comment" "second comment"
    # first comment
    # second comment

    person <person@gmail.com>
    ...
`,
  {
    flags: {
      write: {
        type: 'boolean',
        alias: 'w',
        default: false
      },
      file: {
        type: 'string',
        alias: 'f',
        default: 'CONTRIBUTORS'
      },
      bots: {
        type: 'boolean',
        alias: 'b',
        default: false
      }
    }
  }
);

const results = run({
  write: cli.flags.write,
  file: cli.flags.file,
  bots: cli.flags.bots,
  comments: cli.input
});

results.then((value) => {
  if (!cli.flags.write) {
    console.log(value);
  }
});
