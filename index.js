// import bodyScrollLock from 'script-loader!./src/js/vendor/bodyScrollLock';
// import $ from 'script-loader!./src/js/vendor/jquery-3.3.1.slim';
// import lity from 'script-loader!./src/js/vendor/lity';

import bodyScrollLock from 'body-scroll-lock';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import './src/js/bundle/app.js';
import './src/sass/styles.scss';

// const svgModules = require.context('./src/icons/partners/', true, /\.svg$/);
// svgModules.keys().forEach(svgModules);

if (module.hot) { module.hot.accept(); }