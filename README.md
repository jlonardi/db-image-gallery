# Drobox image gallery

Dropbox image gallery is an application that displays the image contet of the Dropbox Camera Uploads folder. The application is ment to be a self education technology test and playgroid. The test subject is how the Dropbox API can be used and what it's limitations are when it is used as an image API.

The running version of the application can be found here https://db-gallery-demo.herokuapp.com.

### Version
0.0.1

### Tech

The app uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [npm] - npm is the package manager for installing all the dependencies needed
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Redux] - Redux is a predictable state container for JavaScript apps
* [React] - A JavaScript library for building user interfaces
* [Webpack] - A bundler for javascript and friends. Packs many modules into a few
bundled assets.
* [Babel] - Babel is a JavaScript compiler.
* [Material UI] - A Set of React Components that Implement Google's Material Design

## Development

The app uses Webpack and Webpack Dev Server for fast developing.

### Setup

You need [Node.js] installed on your machine:

```sh
$ git clone git@github.com:jlonardi/db-image-gallery.git
$ cd db-image-gallery
$ npm install
```

### Development

To build and start the application in dev mode:
```sh
$ npm run dev
```

### Build

To build the application for production:
```sh
$ npm run build
```

### Host

Hosting the application:
```sh
$ npm start
```

### Todos

 - Write tests (!!!)
 - Take less or sass in use for styling and restructure the style files

### Acknowledged issues
 - Dropbox API supports thumbnails only for files that are under 20MB. The photos taken  for example with a 4K resolution camera are so large that their thumbs can't be reitreived.
 - Dropbox API supports (judging by their documentation) loading thumbs 20 pcs chunks. This would fasten up alot the loading of thumbnails but so far the service throws an error when using the API.
 - Dropbox is tediously slow especially when downloading thumbnails. This is most likely due the fact that Dropbox does not store thumbs and instead creates them when requested.


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does it's job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [@thomasfuchs]: <http://twitter.com/thomasfuchs>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [marked]: <https://github.com/chjj/marked>
   [npm]: <https://www.npmjs.com/>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [keymaster.js]: <https://github.com/madrobby/keymaster>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [React]: <http://facebook.github.io/react/>
   [Material UI]: <http://material-ui.com/>
   [Webpack]: <https://webpack.github.io/>
   [Gulp]: <http://gulpjs.com>
   [Node.js]: <http://nodejs.org/en/>
   [Redux]: <https://redux.js.org/>
   [Babel]: <https://redux.js.org/>
