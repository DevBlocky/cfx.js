# CFX.JS

A simple NodeJS wrapper for the [cfx.re](https://github.com/citizenfx/fivem) project.

## What does this do?

Currently this just supports `GET` requesting URLs on the FiveM server. But this also comes with nice type definitions for some files (`/info.json`, `/dynamic.json`) with the ability to support more.

## How to use it?

The API is made to be used simply. Here is a basic example:

```js
// use `.default` for type definitions
const cfx = require('@blocky/cfx.js').default;

(async () => {
    let server = cfx('http://localhost:3000');
    let serverInfo = await server.getInfo();

    console.log(serverInfo.artifactVersion);
})();
```

You can also use it to get custom endpoints set by resources:

```js
// use `.default` for type definitions
const cfx = require('@blocky/cfx.js').default;

(async () => {
    let server = cfx('http://localhost:3000');
    let resData = await server.getPath('/my_resource');

    let { myData } = resData;
})();
```

## Contributors

-   [blockba5her](https://github.com/blockba5her)

## License

This project is maintained under the MIT license. More info can be viewed under `LICENSE`
