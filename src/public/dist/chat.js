const socket = io()
const form = document.querySelector('form')
const messageContainer = document.querySelector('#messages')


if(form){
    console.log(form)
    form.addEventListener('submit', function(e) {
        console.log(e)
          e.preventDefault();
        socket.emit('chat message', document.getElementById('m').value)
        document.getElementById('m').value = ''
        return false;
      });
      socket.on('chat message', function(data, msg){
          let markup = `<li><img class="profile-msg-img" src="${data.images[0].url}"><p>${data.display_name}:</p><p>${msg}</p></li>`
        messageContainer.insertAdjacentHTML('beforeend', markup)
      });
      socket.on('server message', function(msg){
        let markup = `<li><p class="server-msg">${msg}</p></li>`
        messageContainer.insertAdjacentHTML('beforeend', markup)
      });
      socket.on('user list', function(data){
        console.log(data)
        let li = document.querySelectorAll('header ul li')
        li.forEach(item => item.remove())
        data.forEach(function(item) {
          let headerUl = document.querySelector('header ul')
          let markup =  `<li><img class="profile-msg-img" src="${item.images[0].url}"><p>${item.display_name}</p></li>`
          headerUl.insertAdjacentHTML('beforeend', markup)
        })
       
      });
}
