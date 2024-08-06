const roomId = 'test'
window.addEventListener('load', (event) => {
    socket.emit('enter_room', roomId);
});

document.addEventListener('DOMContentLoaded', (event) => {
    const chatBtn = document.getElementById('btn-chat');
    if (chatBtn) { 
        chatBtn.addEventListener('click', (event) => {
        const now = new Date();
        socket.emit('click_chat', roomId, now);
    }) }
});