# SpaceX Display ⚙️

This project uses the SpaceX API to display their rockets, missions, launches, capsules and ships. It has certain overview pages and detailpages. The detailpages feature all the extra content 

![Project Image](https://github.com/kylebot0/web-app-from-scratch-1920/blob/master/gh-images/hoofdpagina.png)
> Overview page

## Table of Contents 🗃
- [SpaceX Display ⚙️](#spacex-display-%e2%9a%99%ef%b8%8f)
  - [Table of Contents 🗃](#table-of-contents-%f0%9f%97%83)
  - [Live demo](#live-demo)
  - [To Do and features 📌](#to-do-and-features-%f0%9f%93%8c)
  - [Description 📝](#description-%f0%9f%93%9d)
    - [Packages and Technologies](#packages-and-technologies)
  - [API 🐒](#api-%f0%9f%90%92)
  - [Performance](#performance)
    - [Service worker](#service-worker)
    - [Server side rendering](#server-side-rendering)
    - [Compression](#compression)
  - [Image reflow](#image-reflow)
  - [Lazy loading](#lazy-loading)
  - [Browser caching](#browser-caching)
  - [Minifying](#minifying)
  - [Conclusion](#conclusion)
        - [Je snapt het verschil tussen client side en server side renderen en kan server side rendering toepassen voor het tonen van data uit een API](#je-snapt-het-verschil-tussen-client-side-en-server-side-renderen-en-kan-server-side-rendering-toepassen-voor-het-tonen-van-data-uit-een-api)
        - [Je begrijpt hoe een Service Worker werkt en kan deze in jouw applicatie op een nuttige wijze implementeren.](#je-begrijpt-hoe-een-service-worker-werkt-en-kan-deze-in-jouw-applicatie-op-een-nuttige-wijze-implementeren)
        - [Je begrijpt hoe de critical rendering path werkt, en hoe je deze kan optimaliseren](#je-begrijpt-hoe-de-critical-rendering-path-werkt-en-hoe-je-deze-kan-optimaliseren)
  - [Installing 🔍](#installing-%f0%9f%94%8d)
  - [Keep up to date](#keep-up-to-date)
  - [Contributing](#contributing)
  - [Sources 📚](#sources-%f0%9f%93%9a)
    - [Credits](#credits)
  - [Licence 🔓](#licence-%f0%9f%94%93)

## Live demo
[Direct link](https://pwa-1920-kyle-bot.herokuapp.com/)
```
https://pwa-1920-kyle-bot.herokuapp.com/
```

## To Do and features 📌
Things to do in this project:

- [ ] Add HTTPS/2 support
- [ ] Add all the detail pages

Features:

- [x] Add service worker
- [x] Add offline mode
- [x] Server side rendering with EJS
- [x] Add critical rendering path
- [x] Use gzip compression
- [x] Image reflow and lazy loading of images for slow networks
- [x] Browser caching
- [x] Cache caching
- [x] Add minifying with webpack

## Description 📝
This project uses the SpaceX API to display their rockets, missions, launches, capsules and ships. It has certain overview pages and detailpages. The detailpages feature all the extra content when you search for it. To get the different kind of overview pages, the app calls to a different api to get the data. It renders the pages using EJS on the server. Next to that the pages are fully optimized for performance and gets a 100 score in audits.

![Detail page](https://github.com/kylebot0/web-app-from-scratch-1920/blob/master/gh-images/detailpagina.png)
> Detail page




### Packages and Technologies
This project makes use of the following packages and technologies:

  * Webpack

## API 🐒
The data used throughout the application is from the SpaceX API ```https://api.spacexdata.com/v3```.
It is a free public api with no rate limit, and can be called as many times as you want.

Because i call the API, from different links the data can vary.
The data has i.e. the following structure:
```javascript
{
    "mission_name": "Iridium NEXT",
    "mission_id": "F3364BF",
    "manufacturers": [
      "Orbital ATK"
    ],
    "payload_ids": [
      "Iridium NEXT 1",
      "Iridium NEXT 2",
      "Iridium NEXT 3",
      "Iridium NEXT 4",
      "Iridium NEXT 5",
      "Iridium NEXT 6",
      "Iridium NEXT 7"
    ],
  },
```

If you want to look at the docs from the API, and or are interested in easily seeing how it works. 
SpaceX uses postman for that.
```
https://docs.spacexdata.com/?version=latest
```

## Performance 
> These are some of the things that i did to increase the performance of the website, all the images are before the enchancement pictures
### Service worker
The service worker adds the possibility to cache all the pages, stylesheets and js files. Besides that it can also render offline pages you've cached. When there is a page that isn't cached the service worker decides it should show the offline page. This greatly increases the speed the pictures and pages load in.
![](https://github.com/kylebot0/progressive-web-apps-1920/blob/master/gh-images/without_sw.png)

### Server side rendering 
Because the pages are being rendered on the server, the fetches that are thrown are much faster and vastly increase the building of the DOM. 

### Compression
Using a simple package i can compress all the files with GZIP, this saves a lot of file size and also increases the performance of the server. 
```js
app.set('view engine', 'ejs')
    .set('views', 'src/views')
    .use(compression())
```
## Image reflow 
This does not increase the performance of the site, however it does improve the user experience. This way the content doesn't just jump around. You can achieve this by selecting the parent container and putting a padding-bottom of 50 - 60% on it (depends on the ratio of the image). 

<details>
<summary>Code details</summary>

```css
article>div {
    display: flex;
    position: relative;
    padding-bottom: calc(100%/(300/150));
    height: 100%;
    width: 50%;
}
article img {
    position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

</details>

## Lazy loading
If you lazy load images, the requests will happen at the same time, instead of loading images after a image is done. Besides that, users that have slow internet connections will still be able to see the first content of the site. Many browsers understand the loading attribute nowadays.
```html
<img loading="lazy" src=<%- data.links.mission_patch_small %> alt="img">
```
![](https://github.com/kylebot0/progressive-web-apps-1920/blob/master/gh-images/slow_internet.png)
## Browser caching
Browser caching is doing almost the same work as the service worker, it caches certain requests and serves them the next time you visit. This also increases the performance of the website.

```js
app.use((req, res, next) => {
        res.header('Cache-Control', 'max-age=2592000000');
        next();
    })
```
![](https://github.com/kylebot0/progressive-web-apps-1920/blob/master/gh-images/disable_cache.png)

## Minifying 
My build process includes minifying the css and the javascript files. This way it decreases the size of files by removing all of the unnecessary characters and throwing everything on one line. I use webpack for this, and you can build the files by just running `npm run build`

<details>
<summary>Code details</summary>

```js
const path = require("path");

const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        main: "./src/public/js/script.js",
        styles: "./src/public/css/style.css",
    },
    output: {
        path: path.resolve(__dirname, "src/public/dist"),
        filename: "[name].bundle.js",
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new FixStyleOnlyEntriesPlugin(),
        new OptimizeCSSAssetsPlugin({})
    ]
}
```

</details>

## Conclusion
##### Je snapt het verschil tussen client side en server side renderen en kan server side rendering toepassen voor het tonen van data uit een API
  * The advantages of using server side rendering is that it's much faster than using client side rendering to throw for example fetches and using that to build the dom around it. Server side already has the dom ready and can just serve it to the client.
##### Je begrijpt hoe een Service Worker werkt en kan deze in jouw applicatie op een nuttige wijze implementeren.
  * A service worker is used to create an offline experience for the user. This way if the user doesn't have internet access they can still acces page. Besides building a service worker for offline experience, it is also used to increase the performance of the site by caching everything for the next visit.
##### Je begrijpt hoe de critical rendering path werkt, en hoe je deze kan optimaliseren
* The critical rendering path is used to increase the performance of certain requests, or parsing scripts. I increased the path by using compression over the requests, minifying it and by lazy loading images. There are more ways to increase the performance of the critical rendering path, but for now this is what i did.

<img width="800" src="https://github.com/kylebot0/progressive-web-apps-1920/blob/master/gh-images/6b78bb51e57ec3ba45ed2418e5f748fe.png">

> The result of google chrome lighthouse


<img width="800" src="https://github.com/kylebot0/progressive-web-apps-1920/blob/master/gh-images/46ad8a31c8d14648fbf0c08858162b37.png">

>  The result of webpagetest.com



## Installing 🔍
To install this application and enter the repo write the following into your terminal:
```
git clone https://github.com/kylebot0/progressive-web-apps-1920.git && cd progressive-web-apps-1920
```

Because this project uses different modules, you'll have to npm install to get the different dependecies
```
npm install
```
To build all the modules, run
```
npm run watch
```
## Keep up to date
Make sure you pull the repository once in a while since we are still working on this project, you can do this by using ```git pull```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Sources 📚
Sources i used throughout the project.


### Credits

  * None

## Licence 🔓
MIT © [Kyle Bot](https://github.com/kylebot0)
