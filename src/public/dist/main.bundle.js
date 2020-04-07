const socket = io()
const form = document.querySelector('form')
const messageContainer = document.querySelector('#messages')


if(form){
    console.log(form)
    $('form').submit(function(e){
        console.log(e)
        e.preventDefault();
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
      });
      socket.on('chat message', function(data, msg){
          let markup = `<li><img class="profile-msg-img" src="${data.images[0].url}"><p>${data.display_name}:</p><p>${msg}</p></li>`
        messageContainer.insertAdjacentHTML('beforeend', markup)
      });
}
