export function onEmojiEvents(socket) {
  socket.on('emoji_happy', (msg, username) => {
      const chat = document.getElementById('container-chat');
      if (chat) {
          const happy = document.createElement('h1');
          happy.id = 'btn-end';
          happy.textContent = `${username}: ${msg}`;
          chat.appendChild(happy);
      }
      console.log('final');
  });
  socket.on('emoji_angry', (msg, username) => {
      console.log(`${username}: ${msg}`);
  });
  socket.on('emoji_sad', (msg, username) => {
      console.log(`${username}: ${msg}`);
  });
  socket.on('emoji_thinking', (msg, username) => {
      console.log(`${username}: ${msg}`);
  });
}

export function emitEmojiEvents(socket, condition, roomId) {
    socket.emit(`click_${condition}`, roomId);
    console.log('emit emoji');
}