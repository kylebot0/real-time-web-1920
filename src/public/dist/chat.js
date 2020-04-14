const socket = io()
const form = document.querySelector('form')
const messageContainer = document.querySelector('#messages')



window.onSpotifyWebPlaybackSDKReady = () => {
  const accessToken = (document.getElementById('accessToken').getAttribute('value'));
  const token = `${accessToken}`
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

 // =============================================================
  // =================States======================================
  // =============================================================
  player.addListener('player_state_changed', state => {
    console.log(state);
    const musicPlayer = document.querySelector('.music-player-container')
    let container = document.querySelector('.music-player-container .album')
    let container2 = document.querySelector('.artist-container')
    if (container) {
      container.remove()
      container2.remove()
    }
    let img = state.track_window.current_track.album.images[0].url
    let trackName = state.track_window.current_track.name
    let artist = state.track_window.current_track.artists[0].name

    let markup = `
  <img class="album" src="${img}"><div class="artist-container"><h2>${trackName}</h2><p>${artist}</p></div>
  

  `
    musicPlayer.insertAdjacentHTML('afterbegin', markup)

    let play = document.querySelector('#play')
  play.addEventListener('click', pause)
  });


  // =============================================================
  // =================Custom Playbacks============================
  // =============================================================
  function pause() {
    let play = document.querySelector('#play')
    if(play.classList.contains('paused')){
      play.classList.remove('paused')
    } else {
      play.classList.add('paused')
    }

  player.togglePlay().then(() => {
    console.log('Paused!');
  });
  }



  // =============================================================
  // =================Ready============================
  // =============================================================
  player.addListener('ready', ({
    device_id
  }) => {
    player.setVolume(0.1).then(() => {
      console.log('Volume updated!');
    });
    
 
    let uri = "spotify:track:18czZN7uruOjftj71Kt8oj"
    play(device_id, token, uri);
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

function play(device_id, token, uri) {
  $.ajax({
    url: "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
    type: "PUT",
    data: `{"uris": ["${uri}"]}`,
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    },
    success: function (data) {
      console.log(data)
    }
  });
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
    let markup = `<li><img class="profile-msg-img" src="${data.images[0].url}"><p>${data.display_name}:</p><p>${msg}</p></li>`
    messageContainer.insertAdjacentHTML('beforeend', markup)
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
      let markup = `<li><img class="profile-msg-img" src="${item.images[0].url}"><p>${item.display_name}</p></li>`
      headerUl.insertAdjacentHTML('beforeend', markup)
    })

  });
}