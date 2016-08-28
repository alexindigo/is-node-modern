#!/usr/bin/env node

var isModern  = require('./')
  , threshold = process.argv[2]
  ;

process.exit(isModern(threshold) ? 1 : 0);
