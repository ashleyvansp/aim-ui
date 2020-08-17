AIM CSS/UI Components for [Vue.js](https://vuejs.org/) to be used in AIM Lab's AIMViewer slide annotator.

## Quick start

To use this library in a project in a project,
install it via NPM by doing `npm install npm-ui` in your terminal,
then add the following to your Vue application entry point:

```static
// src/index.js
import Vue from 'vue';
import AimUI from 'aim-ui';
import 'aim-ui/dist/aim-ui.css';
// Suggested font and icons.
import './assets/lato/latofonts.css';
import './assets/fontawesome-free-5.13.1-web/css/all.min.css';
// ...import other necessary modules

Vue.use(AimUI);

// ...rest of Vue app initialization
```

As in the above, please use [Font Awesome](https://fontawesome.com/) (5.x).
It's a good idea to use [Lato fonts](https://www.latofonts.com/) for your application.

## How to Use

The easiest way to view it in action is to launch the Aim UI style guide by doing `npm run styleguide`. Then go to `localhost:6060` on your browser to view it. This gives a comprehensive guide demonstrating the UI components themselves and the UI code.

To run an example page built using Aim UI, do `npm run serve`. Then go to `localhost:8080` on your browser to view it.

## Development

Every time you make changes to Aim UI and you want it to take effect on your applications you have to build, publish Aim UI. After that you want to upgrade the `aim-ui` NPM package to the newest version.

This library needs Vue CLI to build.
Please install Vue CLI via `npm install --global @vue/cli` to get access to it.

Doing `npm run build` calls `vue-cli-service build --target lib ./src/index.js` to build the changes in the `dist` directory.

## Color scheme

The color scheme used for Aim UI is inspired by Material Design's [dark scheme](https://material.io/design/color/dark-theme.html#top-and-bottom-app-bars).

## Bugs

Vue provide / inject, along other APIs fail when this library is imported as local modules (i.e. imported using `npm link` or `npm import /path/to/library`).
A workaround is to import this library from the NPM repository. In addition, changes to this library should be published to NPM and reinstalled to the projects where you are using AimUI.
