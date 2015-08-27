# cordova-build-increment

## Install
Install the following package below inside of your apps root folder.
```
npm install cordova-build-increment
```
A scripts/ folder will be created with the 'incrementBuildNum.js' file in it

Then add the following to your app's config.xml file:
```
<hook src="scripts/incrementBuildNum.js" type="after_build"/>
```