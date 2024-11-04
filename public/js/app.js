import { setupEmojiHandlers } from './emojiHandlers.js';
//import { setupRoomHandlers } from './room.js';
const socket = io('http://localhost:3000', {
    withCredentials: true, // 쿠키를 포함하여 요청을 보냄
    extraHeaders: {
      "my-custom-header": "abcd" // 필요에 따라 추가 헤더를 설정할 수 있음
    }
  });

/* Html elements event handlers */
console.log(socket);

/* Socket event handlers */
socket.on('connect', () => {
    console.log('connected to server');
});
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
socket.on('chat', (now)=>{console.log(now)});
socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
});

/** Emoji handlers */
//setupRoomHandlers(socket);
setupEmojiHandlers(socket);

/* End auction */
socket.on('auction_end', () => {
  console.log(`This auction was finished.`);
});

export { socket };