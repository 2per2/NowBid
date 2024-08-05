const socket = io();


/* Html elements event handlers */
document.addEventListener('DOMContentLoaded', function() {
    const roomBtn = document.getElementById('btn-room');
    function fetchToRoom(roomId) {
        fetch(`/room/test`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.ok) {
                console.log('successed to join room');
                window.location.href = `/room/test`;
            } else {
                console.log('failed to join');
            }
        })
        .catch(error => {
            console.error('Error in fetchToRoom', error);
        });
    }
    
    function handleEnterRoom(event) {
        event.preventDefault();
        
        socket.emit("enter_room", 1, () => {
            fetchToRoom(1);
        });
        console.log('clicked');
    }

    if (roomBtn) { roomBtn.addEventListener('click', handleEnterRoom) }
});


/* Socket event handlers */
socket.on('connect', () => {
    console.log('connected to server');
});