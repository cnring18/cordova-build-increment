# cordova-build-increment


### Release Notes

v0.0.5 now supports versioning for Windows with 'windows-packageVersion' in config.xml


## Install
Install the following package below inside of your apps root folder.
```bash
$ npm install cordova-build-increment
```
A scripts/ folder will be created with the 'incrementBuildNum.js' file in it

Then add the following to your app's config.xml file:
```html
<hook src="scripts/incrementBuildNum.js" type="after_build"/>
```

Script is designed to increment the 'android-versionCode', 'ios-CFBundleVersion' and 'windows-packageVersion' fields for additional versioning in the config.xml file.

## Usage

By default this hook is enabled for all builds

For only incrementing release build numbers, comment out line 17 in scripts/incrementBuildNum.js and uncomment line 18

### Version Format


##### Android:

'X'

 - Cordova will throw an error if 'android-versionCode' is not an integer value


##### iOS:

'X' 

'X.X' 

'X.X.X'


##### Windows:

'X.X.X.X'


** Leading zeros no longer removed

** The hook will not currently increment any build versions without the formats above 

