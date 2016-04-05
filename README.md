# cordova-build-increment


### Release Notes

v0.1.0 Added support for OS X with `osx-CFBundleVersion` tag. Added `version` tag increment. Added command line option flags

Tested up to cordova@6.1.1

See Usage section below for options flag info


## Install
Install the following package below inside of your app's root folder.
```bash
$ npm install cordova-build-increment
```
A scripts/ folder will be created with the 'incrementBuildNum.js' file in it

Then add the following to your app's config.xml file:
```html
<hook src="scripts/incrementBuildNum.js" type="after_build"/>
```

Script is designed to increment the `android-versionCode`, `ios-CFBundleVersion`, `osx-CFBundleVersion` and `windows-packageVersion` fields for additional versioning or simply the version tag in the config.xml file.

## Usage

By default this hook is enabled for all builds and will increment platform specific version numbers.

With v0.1.0 the hook now supports option flags so that the script itself does not need to be edited before use. It also allows for direct incrementing of the `version` tag.

Use the following option flags when executing `cordova build`:

`--no-inc` - no increments processed for this build (overrides other option flags)

`--inc-version` - the version tag will be incremented for this build

`--no-platform-inc` - platform specific version tags will not be incremented for this build


### Version Format


##### Android:

`X`

 - Cordova will throw an error if `android-versionCode` is not an integer value


##### iOS and OS X:

`X` 

`X.X`

`X.X.X`


##### Windows:

`X.X.X.X`


** Leading zeros not removed

** The hook will not currently increment any build versions without the formats above (i.e., non numeric version tags)


### Release History

v0.0.6 Minor error handling changes. Tested up to cordova 6.0.0

v0.0.5 Supports versioning for Windows with 'windows-packageVersion' in config.xml

