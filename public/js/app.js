const socket = io();


/* Html elements event handlers */
document.addEventListener('DOMContentLoaded', function() {
    const roomForm =  document.getElementById('form-room');
    
    function fetchToRoom(roomName) {
        fetch(`/auction/${roomName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.ok) {
                console.log('successed to join room');
                window.location.href = `/auction/${roomName}`;
            } else {
                console.log('failed to join');
            }
        })
        .catch(error => {
            console.error('Error occured for join', error);
        });
    }
    
    function handleRoomSubmit(event) {
        event.preventDefault();
        const input = roomForm.querySelector("input");
        roomName = input.value;
        socket.emit("enter_room", roomName, () => {
            fetchToRoom(roomName);
        });
        input.value="";
    }
   roomForm.addEventListener('submit', handleRoomSubmit);
});


/* Socket event handlers */
socket.on('connect', () => {
    console.log('connected to server');
});