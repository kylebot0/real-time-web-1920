const socket = io()
const form = document.querySelector('form')
const messageContainer = document.querySelector('#messages')
const accessToken = (document.getElementById('accessToken').getAttribute('value'));
const token = `${accessToken}`
let play = document.querySelector('#play')
let next = document.querySelector('#next')
let previous = document.querySelector('#previous')
    
  play.addEventListener('click', pause)
  next.addEventListener('click', nextTrack)
  previous.addEventListener('click', previousTrack)

  socket.on('currently playing', function (data) {
    console.log(data)
      const musicPlayer = document.querySelector('.music-player-container')
      let container = document.querySelector('.music-player-container .album')
      let container2 = document.querySelector('.artist-container')
      if (container) {
        container.remove()
        container2.remove()
      }
      let img = data.item.album.images[0].url
      let trackName = data.item.name
      let artist = data.item.album.artists[0].name
  
      let markup = `
    <img class="album" src="${img}"><div class="artist-container"><h2>${trackName}</h2><p>${artist}</p></div>
    
  
    `
      musicPlayer.insertAdjacentHTML('afterbegin', markup)
    
  })

  function pause() {
    let play = document.querySelector('#play')
    if(play.classList.contains('paused')){
      play.classList.remove('paused')
    } else {
      play.classList.add('paused')
    }
  socket.emit('pause', token)
  }

  function nextTrack() {
  player.nextTrack().then(() => {
    console.log('Paused!');
  });
  }

  function previousTrack() {
  player.previousTrack().then(() => {
    console.log('Paused!');
  });
  }

window.onSpotifyWebPlaybackSDKReady = () => {
  const player = new Spotify.Player({
    name: 'Listening Party',
    getOAuthToken: cb => {
      cb(token);
    }
  });


  // =============================================================
  // =================AUTH Errors============================
  // =============================================================
  player.addListener('initialization_error', ({
    message
  }) => {
    console.error(message);
  });
  player.addListener('authentication_error', ({
    message
  }) => {
    console.error(message);
  });
  player.addListener('account_error', ({
    message
  }) => {
    console.error(message);
  });
  player.addListener('playback_error', ({
    message
  }) => {
    console.error(message);
  });

  player.addListener('player_state_changed', state => {
  });

  player.addListener('ready', async ({
    device_id
  }) => {
    player.setVolume(0.1).then(() => {
      console.log('Volume updated!');
    });
    let searchUrl = window.location.origin +'/searchApi'
    let que = await getUris(searchUrl)
    socket.emit('getSongs', {que: que, token: token})
    socket.emit('getPosition', {que: que, token: token})
    socket.emit('setSong',{token: token, device_id: device_id})
    
    // pause()
    
  });

  // Not Ready
  player.addListener('not_ready', ({
    device_id
  }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();

};

function getUris(url) {
  // let list = []
  return $.ajax({
    url: url,
    type: "GET",
    success: function (data) {
      return data
    }
  });
  // return list;
}

if (form) {
  form.addEventListener('submit', function (e) {
    console.log(e)
    e.preventDefault();
    socket.emit('chat message', document.getElementById('m').value)
    document.getElementById('m').value = ''
    return false;
  });
  socket.on('chat message', function (data, msg) {
    if(data.images.length == 0){
    let markup = `<li><img class="profile-msg-img" src="./img/profile.png"><p>${data.display_name}:</p><p>${msg}</p></li>`
    messageContainer.insertAdjacentHTML('beforeend', markup)
    } else {
      let markup = `<li><img class="profile-msg-img" src="${data.images[0].url}"><p>${data.display_name}:</p><p>${msg}</p></li>`
      messageContainer.insertAdjacentHTML('beforeend', markup)
    }
    
  });
  socket.on('server message', function (msg) {
    let markup = `<li><p class="server-msg">${msg}</p></li>`
    messageContainer.insertAdjacentHTML('beforeend', markup)
  });
  socket.on('user list', function (data) {
    console.log(data)
    let li = document.querySelectorAll('header ul li')
    li.forEach(item => item.remove())
    data.forEach(function (item) {
      let headerUl = document.querySelector('header ul')
      if(item.images.length == 0){
        let markup = `<li><img class="profile-msg-img" src="./img/profile.png"><p>${item.display_name}</p></li>`
        headerUl.insertAdjacentHTML('beforeend', markup)
      } else {
        let markup = `<li><img class="profile-msg-img" src="${item.images[0].url}"><p>${item.display_name}</p></li>`
        headerUl.insertAdjacentHTML('beforeend', markup)
      }
      
    })

  });
}