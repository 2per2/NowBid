document.addEventListener('DOMContentLoaded', function() {
    const roomBtn = document.getElementById('btn-room');
    const roomId = roomBtn.dataset.roomId;
    console.log(roomId);
    
    function fetchToRoom() {
        fetch(`/room/${roomId}`, {
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
    
    function handleEnterRoom(event) {
        event.preventDefault();
        fetchToRoom();
    }

    if (roomBtn) { roomBtn.addEventListener('click', handleEnterRoom) }
});