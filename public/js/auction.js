document.addEventListener('DOMContentLoaded', function() {
    const roomBtn = document.getElementById('btn-room');
    
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
});