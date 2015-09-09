module.exports = function(context) {
    var util = require('util'),
    	fs = require('fs'),
        path = require('path'),
        xml2js = require('xml2js');

    var platforms = context.opts.platforms,
        cliCommand = context.cmdLine,
        fileName = 'config.xml',
        filePath = path.normalize(path.join(context.opts.projectRoot, fileName)),
        parser = new xml2js.Parser(),
        changeVersion,
        platformName,
        needRewrite = false,
        finishMessage = [];
    // hook configuration
    var isRelease = true; // by default this hook is always enabled, see the line below on how to execute it only for release
    //var isRelease = (cliCommand.indexOf('--release') > -1);

    if (!isRelease) {
        console.log('Set to increment build number only for release');
        return;
    }

    fs.readFile(filePath, { encoding:'utf8' }, function(err, data) {
        parser.parseString(data, function (err, result) {
            if(err) throw err;

            platforms.forEach(function (platform) {
                if(setPlatformInfo(platform))
                    result = handleResult(result);
            });
            if(needRewrite) {
                rewriteConfig(result);
            } else {
                console.log(fileName + ' build numbers not changed');
            }
        });
    });

    function rewriteConfig(result) {
        fs.writeFile(filePath, buildXML(result), { encoding:'utf8' }, function(err) {
            if(err) throw err;
            finishMessage.push('Saved in ' + fileName);
            finishMessage.forEach( function(line) { console.log(line); } );
        });
    }

    function setPlatformInfo(platform) {
        switch (platform) {
            case 'android':
                changeVersion = 'android-versionCode';
                platformName = 'Android';
                break;
            case 'ios':
                changeVersion = 'ios-CFBundleVersion';
                platformName = 'iOS';
                break;
            case 'windows':
                changeVersion = 'windows-packageVersion';
                platformName = 'Windows';
            default:
                console.log('This hook only supports android, ios, and windows currently, ' + platform + ' not supported');
                return false;
        }
        return true;
    }

    function handleResult(result) {
        var newVersion =  null;
        if(result.widget.$[changeVersion]) { 
            newVersion = processVersionCode(result.widget.$[changeVersion]);
            result.widget.$[changeVersion] = newVersion;
        } else {
            finishMessage.push(platformName + ' version code not found');
        }
        if(newVersion) {
            needRewrite = true;
            finishMessage.push(platformName + ' build number incremented to ' + newVersion);
        }
        return result;
    }

    function buildXML(obj) {
        var builder = new xml2js.Builder();
        builder.options.renderOpts.indent = '\t';
        var x = builder.buildObject(obj);
        return x.toString();
    }

    function processVersionCode(code) {
        if (!code) return null;
        var codeNum = code.match(/\.?([0-9]+)$/);
        if (!codeNum || !codeNum[1]) return null;
        codeNum = parseInt(codeNum[1]) + 1;
        code = code.replace(/[0-9]+$/, codeNum + '');
        return code;
    }
}