export function onWelcome(socket) {
    socket.on('welcome', (username, currentBid) => {
        console.log(`${username} connected to room, ${currentBid}`);
    });
    socket.on('attention', (msg, updatedBid) => { 
      console.log(msg);
      const price = document.getElementById('price');
      if (price) {
        price.innerText = updatedBid;
      }
    });
}

export function emitEnterRoom(socket, roomId, price) {
    socket.emit('enter_room', roomId, (idcheck, bid) => { 
        console.log(`You just joined ${idcheck} room, ${bid}`);
        price.innerText = bid;
    });
}