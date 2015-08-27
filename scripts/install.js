#!/usr/bin/env node

//After install script - installs the cordova hook into scripts/ directory

//We assume after post install, this script is run from its root directory

//Before
// ./proj
//		/node_modules
//			/cordova-build-increment
//				incrementBuildNum.js
//				/scripts
//					install.js

//After
// ./proj
//		/scripts
//			incrementBuildNum.js
//		/node_modules
//			/cordova-build-increment
//				incrementBuildNum.js

var fs = require('fs'),
	path = require('path'),
	cwd = process.cwd(), //proj directory
	scriptPath = __dirname, //node_modules/cordova-build-increment/scripts
	writePath = path.join(cwd, '../../scripts');

console.log(cwd, scriptPath, writePath);

if(!fs.existsSync(writePath) {
	console.log('Creating directory: ', writePath);
	fs.mkdirSync(writePath);
}	


var buildIncrementPath = path.join(cwd, 'incrementBuildNum.js');

var incrementFile = fs.readFileSync(buildIncrementPath);
console.log('incrementFile: ', incrementFile)
var incrementFilePath = path.join(writePath, 'incrementBuildNum.js')

console.log('Creating increment hook: ', incrementFilePath)
fs.writeFileSync(incrementFilePath, incrementFile); 