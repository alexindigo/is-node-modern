var test           = require('tape')
  , executioner    = require('executioner')
  , isModern       = require('./')
  , currentVersion = parseInt(process.versions.node, 10)
    // somewhat hacky way to have different cli scripts
    // for regular testing and for istanbul coverage
    // but without extra condition, since coverage won't be
    // triggered on `else` and always under-reporting
    // expected values:
    // `npm run cover` -> `istanbul cover --include-pid --print summary test.js` -> `'istanbul cover --include-pid --print summary '` as prefix
    // `npm run test`  -> `node test.js` -> `'node '` as prefix
  , cliPrefix      = process.env['npm_lifecycle_script'].split('test.js')[0]
  , cli            = {
    'is-node-modern'    : cliPrefix + 'is-node-modern.js',
    'is-node-not-modern': cliPrefix + 'is-node-not-modern.js'
  }
  , expectedMatrix = {
    0: {
      0: false, // `0` is falsy, so default value of the current LTS will be used
      3: false,
      4: false,
      5: false,
      6: false
    },

    3: {
      0: false, // `0` is falsy, so default value of the current LTS will be used
      3: true,
      4: false,
      5: false,
      6: false
    },

    4: {
      0: true, // `0` is falsy, so default value of the current LTS will be used
      3: true,
      4: true,
      5: false,
      6: false
    },

    5: {
      0: true, // `0` is falsy, so default value of the current LTS will be used
      3: true,
      4: true,
      5: true,
      6: false
    },

    6: {
      0: true, // `0` is falsy, so default value of the current LTS will be used
      3: true,
      4: true,
      5: true,
      6: true
    }
  }
  ;

test('Returns proper result on different thresholds for node@' + currentVersion, function(t)
{
  var currentSet     = expectedMatrix[currentVersion]
    , testedVersions = Object.keys(currentSet)
    ;

  t.plan(testedVersions.length);

  testedVersions.forEach(function(threshold)
  {
    t.equal(isModern(threshold), currentSet[threshold], 'should return ' + JSON.stringify(currentSet[threshold]) + ' with threshold ' + threshold);
  });
});

test('is-node-modern returns proper result for node@' + currentVersion, function(t)
{
  var expected = expectedMatrix[currentVersion][0]; // since `0` is falsy, it will produce default threshold

  t.plan(1);

  executioner(cli['is-node-modern'], {}, function(err)
  {
    t.equal(!err, expected, 'expect `err` to be falsy for positive results and vice versa');
  });
});

test('is-node-not-modern returns proper result for node@' + currentVersion, function(t)
{
  var expected = expectedMatrix[currentVersion][0]; // since `0` is falsy, it will produce default threshold

  t.plan(1);

  executioner(cli['is-node-not-modern'], {}, function(err)
  {
    t.equal(!err, !expected, 'expect `err` to be falsy for positive results and vice versa, and positive results should opposite of the expected value');
  });
});

test('is-node-modern returns proper result for node@' + currentVersion + ' with custom threshold', function(t)
{
  var currentSet     = expectedMatrix[currentVersion]
    , testedVersions = Object.keys(currentSet)
    ;

  t.plan(testedVersions.length);

  testedVersions.forEach(function(threshold)
  {
    executioner(cli['is-node-modern'] + ' ' + threshold, {}, function(err)
    {
      t.equal(!err, currentSet[threshold], 'expect `err` to be ' + (!currentSet[threshold] ? 'truthy' : 'falsy') + ' with threshold: ' + threshold);
    });
  });
});

test('is-node-not-modern returns proper result for node@' + currentVersion + ' with custom threshold', function(t)
{
  var currentSet     = expectedMatrix[currentVersion]
    , testedVersions = Object.keys(currentSet)
    ;

  t.plan(testedVersions.length);

  testedVersions.forEach(function(threshold)
  {
    executioner(cli['is-node-not-modern'] + ' ' + threshold, {}, function(err)
    {
      t.equal(!err, !currentSet[threshold], 'expect `err` to be ' + (!!currentSet[threshold] ? 'truthy' : 'falsy') + ' with threshold: ' + threshold);
    });
  });
});
