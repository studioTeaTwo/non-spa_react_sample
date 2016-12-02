# non-spa_react_sample

## feature

- react & ES6 & sass & bootstrap
- js app per html(not SinglePageApplication)
- build by pure node.js(not task runner) using babel, browserify and node-sass

## build

### manual

```bash
$ git pull <repo>
$ npm update
$ npm run build
```

output
- `public/js/bundle_[appName].js`
- `public/js/bundle_[appName].min.js`
- `public/css/style_[appName].css`

### watch

```bash
$ npm run watch
```

output
- `public/js/build.js`
- `public/css/style.css`