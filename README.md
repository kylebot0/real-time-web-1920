# Spotify Listening Party

This project uses the Spotify API to retrieve songs and user data, to which the user can join rooms that play random music, so you can explore new artists / songs. 

![Project Image](https://github.com/kylebot0/web-app-from-scratch-1920/blob/master/gh-images/hoofdpagina.png)
> Overview page

## Table of Contents 🗃

  - [Installing 🔍](#installing-%f0%9f%94%8d)
  - [Keep up to date](#keep-up-to-date)
  - [Contributing](#contributing)
  - [Sources 📚](#sources-%f0%9f%93%9a)
    - [Credits](#credits)
  - [Licence 🔓](#licence-%f0%9f%94%93)

## Live demo
[Direct link](https://rtw-1920.herokuapp.com/)
```
https://rtw-1920.herokuapp.com/
(Doesn't work yet
```

## To Do and features 📌
Things to do in this project:

- [ ] Add rooms
- [ ] Connect Spotify SDK to socket.io

Done:

- [x] Add SDK
- [x] Add Socket.io
- [x] Add working chat
- [x] Add connected users tab
- [x] Play music through the SDK
- [x] Make oAuth working


## Description 📝
This project uses the Spotify API to retrieve songs and user data, to which the user can join rooms that play random music, so you can explore new artists / songs. Besides that, you can also vote on what songs you like and at the end of the session you'll be able to see the most liked songs, so you can add them to your playlists.

![Detail page](https://github.com/kylebot0/web-app-from-scratch-1920/blob/master/gh-images/detailpagina.png)
> Detail page


### Packages and Technologies
This project makes use of the following packages and technologies:

  * Webpack
  * Express
* Socket.io
* Spotify SDK
## Data lifecycle Diagram (WIP)
![Detail page](https://github.com/kylebot0/real-time-web-1920/blob/master/gh-images/lifecycle.png)
> Lifecycle
## API 🐒
The data used throughout the application is from the Spotify API ```https://api.spotify.com/v1```.
It is a API that uses oAuth to connect the user. After you've succesfully connected you can search for basically everything within Spotify. 

To connect with oAuth, you first need to register your app at developer.spotify.com. After you've succesfully registered you should get a client code and a client secret. You should keep those safe in a .env file.

To make oAuth work you need to redirect to the spotify oAuth panel, where the user can login. After the user has logged in, you get a code in the parameters of the url. That code can be used to get your token which connects you to the spotify API. 
```javascript
TO DO
```

To call your own profile, you need to call this `https://api.spotify.com/v1/me` API link.
```javascript
TO DO
```



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
