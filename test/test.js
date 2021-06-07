const assert = require('assert');
const requireInject = require('require-inject');

function injectCLI(injection, interpretationExpected) {
  if (!injection.flags) {
    injection.flags = {};
  }
  requireInject('../cli.js', {
    'contributors-gen': (options) => {
      assert.strictEqual(
        JSON.stringify(options),
        JSON.stringify(interpretationExpected)
      );
      return new Promise((resolve) => {
        resolve('');
      });
    },
    meow: () => {
      return injection;
    }
  });
}

describe('includeBots', function () {
  it('should pass the flag when includeBots flag is provided', function () {
    injectCLI(
      {
        flags: {
          includeBots: true
        }
      },
      {
        includeBots: true
      }
    );
  });
});

describe('write', function () {
  it('should pass the flag when includeBots flag is provided', function () {
    injectCLI(
      {
        flags: {
          write: true
        }
      },
      {
        write: true
      }
    );
  });
});

describe('comments', function () {
  it('should pass the input when comments as a string is provided', function () {
    injectCLI(
      {
        input: ['hello']
      },
      {
        comments: ['hello']
      }
    );
  });

  it('should pass the input when comments as an array is provided', function () {
    injectCLI(
      {
        input: ['hello', 'hello2']
      },
      {
        comments: ['hello', 'hello2']
      }
    );
  });
});

describe('fileName', function () {
  it('should pass the flag when fileName as a string is provided', function () {
    injectCLI(
      {
        flags: {
          fileName: 'CONTRIBUTORS2'
        }
      },
      {
        fileName: 'CONTRIBUTORS2'
      }
    );
  });
});

describe('sort', function () {
  it('should pass the flag when sort as a string is provided', function () {
    injectCLI(
      {
        flags: {
          sort: 'cba'
        }
      },
      {
        sort: 'cba'
      }
    );
  });
});
