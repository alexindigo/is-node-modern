# is-node-modern [![NPM Module](https://img.shields.io/npm/v/is-node-modern.svg?style=flat)](https://www.npmjs.com/package/is-node-modern)

Detects if node is modern, with helpful command line tools

[![Linux Build](https://img.shields.io/travis/alexindigo/is-node-modern/master.svg?label=linux:0.10-6.x&style=flat)](https://travis-ci.org/alexindigo/is-node-modern)
[![MacOS Build](https://img.shields.io/travis/alexindigo/is-node-modern/master.svg?label=macos:0.10-6.x&style=flat)](https://travis-ci.org/alexindigo/is-node-modern)
[![Windows Build](https://img.shields.io/appveyor/ci/alexindigo/is-node-modern/master.svg?label=windows:0.10-6.x&style=flat)](https://ci.appveyor.com/project/alexindigo/is-node-modern)

[![Coverage Status](https://img.shields.io/coveralls/alexindigo/is-node-modern/master.svg?label=code+coverage&style=flat)](https://coveralls.io/github/alexindigo/is-node-modern?branch=master)
[![Dependency Status](https://img.shields.io/david/alexindigo/is-node-modern/master.svg?style=flat)](https://david-dm.org/alexindigo/is-node-modern)
[![bitHound Overall Score](https://www.bithound.io/github/alexindigo/is-node-modern/badges/score.svg)](https://www.bithound.io/github/alexindigo/is-node-modern)

<!-- [![Readme](https://img.shields.io/badge/readme-tested-brightgreen.svg?style=flat)](https://www.npmjs.com/package/reamde) -->

## Install

```
npm install --save-dev is-node-modern
```

then add to your `package.json` following script:

```json
  "scripts": {
    "my-action": "is-node-modern && thing-I-want-to-do-in-modern-node-versions || is-node-not-modern"
  }
```

By default it will consider modern node versions that equal or above LTS version.

Also you can specify custom threshold, like:

```json
  "scripts": {
    "my-action": "is-node-modern 6 && thing-I-want-to-do-in-node-v6-or-above || is-node-not-modern 6"
  }
```

to execute provided commands within custom threshold.

## Example

### CLI

Running `eslint` in node version equal or above 4 (current LTS version):

```json
  "scripts": {
    "lint": "eslint *.js",
    "ci-lint": "is-node-modern && npm run lint || is-node-not-modern"
  }
```

Now you can have CI for node versions below `4`, while running latest eslint only within `node@4+`.

### Node

Also, it could be used as regular node module:

```javascript
var isNodeModern = require('is-node-modern');

if (isNodeModern())
{
  // only run in node@4+
}

if (isNodeModern(6))
{
  // only run in node@6+
}
```

## License

Is-Node-Modern is released under the [MIT](LICENSE) license.
