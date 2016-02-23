#!/usr/bin/env node

var ntc = require('./src/ntc');
var program = require('commander');

program
  .arguments('<color>')
  .action(function(color) {
    if (color.substr(0) == '#') {
      color = color.substr(1, color.length);
    }

    // match = [ matchedhex, name, matchedshaderhex, shadername, exactmatch ]
    var match = ntc.name(color);
    var name = match[1];
    var shaderName = match[3].toLowerCase();
    var isExact = match[4];
    var resp = color + ' is ' + shaderName;

    if (name.indexOf('Invalid Color') !== -1) {
      console.log('Invalid color');
      return;
    }

    if (isExact)
      resp += ' with the exact color name: ';
    else 
      resp += ' with the closest color name: ';

    resp += name;

    console.log(resp);
  })
  .parse(process.argv);