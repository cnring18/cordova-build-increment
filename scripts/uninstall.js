#!/usr/bin/env node

//After uninstall script to remove the uglify.js script from the users hooks/after_prepare directory

var fs = require('fs'),
	path = require('path'),
	cwd = process.cwd();

var buildIncrementPath = path.join(cwd, '../../scripts', 'incrementBuildNum.js');

fs.unlink(buildIncrementPath);
console.log('Removed: ', buildIncrementPath);