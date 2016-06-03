# Node.js source map support for SystemJS

Hooks into SystemJS to grab source maps as they are created so that they can be used by the source-map-support package.

Implementation is very crude and probably only works with babel.

Usage:

```js
require('source-map-support-systemjs/install');
```
