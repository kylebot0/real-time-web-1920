# Spotify Listening Party

This project uses the Spotify API to retrieve songs and user data, to which the user can join rooms that play random music, so you can explore new artists / songs. 

![Project Image](https://github.com/kylebot0/real-time-web-1920/blob/master/gh-images/screen.png)
> Overview page

## Table of Contents 🗃

 - [Spotify Listening Party](#spotify-listening-party)
  * [Table of Contents 🗃](#table-of-contents---)
  * [Live demo](#live-demo)
  * [To Do and features 📌](#to-do-and-features---)
  * [Description 📝](#description---)
  * [Socket events](#socket-events)
    + [Server](#server)
    + [Client](#client)
  * [Packages and Technologies](#packages-and-technologies)
    + [Browser support](#browser-support)
  * [Data lifecycle Diagram (WIP)](#data-lifecycle-diagram--wip-)
    + [Data](#data)
    + [Custom API](#custom-api)
  * [API 🐒](#api---)
  * [Installing 🔍](#installing---)
  * [Keep up to date](#keep-up-to-date)
  * [Contributing](#contributing)
  * [Sources 📚](#sources---)
    + [Credits](#credits)
  * [Licence 🔓](#licence---)

## Live demo
[Direct link](https://rtw-1920.herokuapp.com/)
```
https://rtw-1920.herokuapp.com/

```

## To Do and features 📌
Things to do in this project:

- [ ] Add rooms
- [ ] Add a voting system
- [ ] connect a Database

Done:

- [x] Add custom API to retrieve random songs
- [x] Add SDK
- [x] Add Socket.io
- [x] Add working chat
- [x] Add connected users tab
- [x] Play music through the SDK
- [x] Make oAuth working
- [x] Sync playing music
- [x] Adds random songs to the queue




## Description 📝
This project uses the Spotify API to retrieve songs and user data, to which the user can join rooms that play random music, so you can explore new artists / songs. Besides that, you can also vote on what songs you like and at the end of the session you'll be able to see the most liked songs, so you can add them to your playlists.

![Detail page](https://github.com/kylebot0/real-time-web-1920/blob/master/gh-images/profile.png)
> Detail page

## Socket events
### Server
| Event             | When                                   | What does it do?                                                     |
|-------------------|----------------------------------------|----------------------------------------------------------------------|
| server message    | on someone joining the room            | Messages the client that something happened                          |
| disconnect        | if someone disconnects from the server | Disconnects user from the server, pauses music that could be playing |
| user list         | when an user joins or disconnects      | Shows a list of the current users in a room                          |
| currently playing | polls every 5 seconds                  | updates the song, if its different from the one currently playing    |
| getSongs          | when the first user connects           | Fills the room with possible songs                                   |
| getPosition       | when an user connects                  | Stores the position of a song thats currently playing                |
| SetSong           | when an user first connects            | Sets a song to play, and adds all possible songs to the queue        |
| pause             | if a user decides to pause the music   | Pauses any song thats playing on all clients                         |
| resume            | if a user decides to resume the music  | Resumes any song thats currently pauses on clients                   |
| chat message      | if a user sends a chat message         | Emits a chat message                                                 |

### Client





## Packages and Technologies
This project makes use of the following packages and technologies:

  * Webpack
  * Express
  * Socket.io
  * Spotify SDK
  * chalk
  * compression
  * cookie-parser
  * dotenv
  * ejs
  * express
  * node-fetch
  * query-strings
  * spotify-web-api-node
  * axios

### Browser support
  * Chrome
  * Firefox
  * Safari

## Data lifecycle Diagram (WIP)
![Detail page](https://github.com/kylebot0/real-time-web-1920/blob/master/gh-images/dld.png)
> Lifecycle

### Data 
The data that's being saved on the server has to be the data that's the single source of truth. This way the client can't manipulate the data. The server also determines what's being added to the queue, and keeps the connection between Spotify and the client. 

### Custom API
To get the random songs, i have setup a custom api to retrieve them. It returns a json object with 20 objects. The user must be authenticated in order to use it. 

## API 🐒
The data used throughout the application is from the Spotify API ```https://api.spotify.com/v1```.
It is a API that uses oAuth to connect the user. After you've succesfully connected you can search for basically everything within Spotify. 

To connect with oAuth, you first need to register your app at developer.spotify.com. After you've succesfully registered you should get a client code and a client secret. You should keep those safe in a .env file.

To make oAuth work you need to redirect to the spotify oAuth panel, where the user can login. After the user has logged in, you get a code in the parameters of the url. That code can be used to get your token which connects you to the spotify API. 
```javascript
 return await axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: process.env.SPOTIFY_clientId,
        password: process.env.SPOTIFY_clientSecret
      }
    })
      .then(res => {
        this.token = res.data
        return
      })
      .catch(error => console.error(error))
```

To call your own profile, you need to call this `https://api.spotify.com/v1/me` API link.
```javascript
  fetch(
          `https://api.spotify.com/v1/me//`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(async (res) => {
          return res
        })
```



## Installing 🔍
To install this application and enter the repo write the following into your terminal:
```
git clone https://github.com/kylebot0/real-time-web-1920.git && cd real-time-web-1920
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
