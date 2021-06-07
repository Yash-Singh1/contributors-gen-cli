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
  --sort, -s             The sorting style to be used        (default: abc)

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
      fileName: {
        type: 'string',
        alias: 'f',
        default: 'CONTRIBUTORS'
      },
      includeBots: {
        type: 'boolean',
        alias: 'b',
        default: false
      },
      sort: {
        type: 'string',
        alias: 's',
        default: 'abc'
      }
    }
  }
);

const results = run({
  write: cli.flags.write,
  fileName: cli.flags.fileName,
  includeBots: cli.flags.includeBots,
  sort: cli.flags.sort,
  comments: cli.input
});

results.then((value) => {
  if (!cli.flags.write) {
    console.log(value);
  }
});
