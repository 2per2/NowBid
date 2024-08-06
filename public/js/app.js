const socket = io();


/* Html elements event handlers */



/* Socket event handlers */
socket.on('connect', () => {
    console.log('connected to server');
});
socket.on('welcome', () => {
    console.log('someone connected to room');
});
socket.on('chat', (now)=>{console.log(now)});