This repository contains a skeleton of a cordova application using the aurelia framework.
You need to have installed jspm, nodejs, npm, cordova and gulp.

The main application source is inside the folder src.
With the gulp build task we copy the source and it's dependencies to the www folder. 
These step also transpiles the ECMAScript 6 code to ECMAScript 5.
The gulp task bundle will use the aurelia bundler to combine all javascripts and templates to two files. 
Inside the aurelia.js file will be the aurelia framework with all dependencies. 
Our source folder src/js will be combined to app-build.js.
The system.js file of jspm will read the config.js and knows which files to use after bundling.


## Usage

Install all dependencies with node and javascript package managers

```
npm install && jspm install -y
```

Build the application for development

```
gulp build
```

Build the application for production

```
gulp bundle
```

Add a platform of your choice to cordova

```
cordova platform add android
```

Run the app on an android emulator or connected device

```
cordova run android
```