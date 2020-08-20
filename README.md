AIM CSS/UI Components for [Vue.js](https://vuejs.org/) to be used in AIM Lab's AIMViewer slide annotator.

## Quick start

To use this library in a project please do the following:

1) Make sure `aim-ui` is in the NPM registry. I'm hosting mine at <https://www.npmjs.com/package/aim-ui>
2) `cd` into your project and install it via NPM by doing `npm install aim-ui` in your terminal
3) add the following to your Vue application entry point:

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

4) Install dependencies:

- As in the above, please download use [Font Awesome](https://fontawesome.com/) (5.x).
- It's a good idea to download and use [Lato fonts](https://www.latofonts.com/) for your application.

## Documentation

The easiest way to view it in action is to launch the Aim UI style guide by doing `npm install; npm run serve:styleguide`. Then go to `localhost:6060` on your browser to view it. This gives a comprehensive guide demonstrating the UI components themselves and the UI code.

## Example

To run an example page built using Aim UI, do `npm run serve`. Then go to `localhost:8080` on your browser to view it.

## Development

Every time you make changes to Aim UI and you want it to take effect on your applications you have to build, publish Aim UI. To do this:

1) Check that you have Vue CLI to build. If not then install Vue CLI via `npm install --global @vue/cli`.

2) Install libraries by doing `npm install`.

3) Do `npm run build`. This calls `vue-cli-service build --target lib ./src/index.js` to build the changes in the `dist` directory.

4) Set the `aim-ui` NPM package to the newer version by editing the line `"version": "x.y.z",` in `package.json`.
Increment 'z' for bug fixes, 'y' for backward compatible changes, and 'x' for major backward incompatible changes.

5) Do `npm publish` to publish it to the NPM registry. [Guide](https://docs.npmjs.com/misc/developers).

6) In the projects where you are using `aim-ui` you want to modify the version in that project's `package.json` and then do `npm update aim-ui`. [Guide](https://docs.npmjs.com/cli/update).

## Color scheme

The color scheme used for Aim UI is inspired by Material Design's [dark scheme](https://material.io/design/color/dark-theme.html#top-and-bottom-app-bars).

## Bugs

Vue provide / inject, along other APIs fail when this library is imported as local modules (i.e. imported using `npm link` or `npm import /path/to/library`).

A workaround is to import this library from the NPM repository. In addition, changes to this library should be published to NPM and reinstalled to the projects where you are using AimUI.
