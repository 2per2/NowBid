const socket = io();

document.addEventListener('DOMContentLoaded', function() {
    const roomBtn = document.getElementById('btn-room');
    const chatBtn = document.getElementById('btn-chat');
    function fetchToRoom() {
        fetch(`/room/test`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.ok) {
                window.location.href = `/room/test`;
            } else {
                console.log('failed to join');
            }
        })
        .catch(error => {
            console.error('Error in fetchToRoom', error);
        });
    }
    
    const roomId = 'test';
    function handleEnterRoom(event) {
        event.preventDefault();
        fetchToRoom();
    }

    if (roomBtn) { roomBtn.addEventListener('click', handleEnterRoom) }
    if (chatBtn) { chatBtn.addEventListener('click', (event) => {
        const now = new Date();
        socket.emit('click_chat', roomId, now);
    }) }
});