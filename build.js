const browserify = require('browserify'),
      babelify   = require('babelify'),
      compressor = require('node-minify'),
      sass = require('node-sass'),
      fs = require('fs');

process.env.NODE_ENV = 'production';

// for development enviroment
// "watch": "watchify -t babelify ./app/javascripts/components/message/app.js -o ./public/js/build.js -d",
// "build-css": "node-sass --include-path scss ./app/stylesheets/components/message/main.scss ./public/css/style.css",

function compileJs() {
  const srcPath = './app/javascripts/components/',
        srcFile = 'app.js',
        dstPath = './public/js/';
  const list = fs.readdirSync(srcPath);
  list.forEach((folder) => {
    if (folder.indexOf('.') !== 0) {

      let appName = folder;
      let genFile = 'bundle_' + appName + '.js',
          minFile = 'bundle_' + appName + '.min.js';

      Promise.resolve()
      .then(() => {
        return new Promise((resolve, reject) => {

          console.log('start to transpile -> ' + appName);

          browserify()
          .add(srcPath + folder + '/' + srcFile)
          .transform(babelify)
          .bundle((err, buf) => {
            if(err) {
              reject(err);
            } else {
              console.log('transpile done! -> ' + appName);
              resolve(buf);
            }
          });
        });
      })
      .then((buf) => {
        return new Promise((resolve, reject) => {

          console.log('start to write -> ' + genFile);

          let ws = fs.createWriteStream(dstPath + genFile);
          ws.write(buf, () => {
            console.log('write done! -> ' + genFile);
            resolve();
          });
        });
      })
      .then(() => {
        return new Promise((resolve, reject) => {

          console.log('start to compress -> ' + minFile);

          compressor.minify({
            compressor: 'uglifyjs',
            input: dstPath + genFile,
            output: dstPath + minFile,
            options: {
              warnings: false
            },
            callback: (err, min) => {
              if(err) {
                reject(err);
              } else {
                console.log('compress done! -> ' + minFile);
                resolve();
              }
            }
          });
        });
      })
      .then(() => {
        console.log('end js ' + appName);
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
    }
  });
}

function compileCss() {
  const srcPath = './app/stylesheets/components/',
        srcFile = 'main.scss',
        dstPath = './public/css/';
  const list = fs.readdirSync(srcPath);
  list.forEach((folder) => {
    if (folder.indexOf('.') !== 0) {

      let appName = folder;
      let genFile = 'style_' + appName + '.css';

      Promise.resolve()
      .then(() => {
        return new Promise((resolve, reject) => {

          console.log('start to sass -> ' + appName);

          sass.render({
            file: srcPath + folder + '/' + srcFile,
            outFile: dstPath
          }, (error, result) => { // node-style callback from v3.0.0 onwards
            if (error) {
              reject(error);
            } else {
              resolve(result.css);
            }
          });
        });
      })
      .then((buf) => {
        return new Promise((resolve, reject) => {

          console.log('start to write -> ' + genFile);

          // No errors during the compilation, write this result on the disk
          fs.writeFile(dstPath + genFile, buf, (err) => {
            if (err) {
              //file written on disk
              reject(err);
            } else {
              resolve();
            }
          });
        });
      })
      .then(() => {
        console.log('end sass ' + appName);
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
    }
  });
}

compileJs();
compileCss();
