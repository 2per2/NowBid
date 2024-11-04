document.addEventListener('DOMContentLoaded', function() {
    const roomBtn = document.getElementById('btn-room');
    if (roomBtn) {
        const roomId = roomBtn.dataset.roomId;
    
    function fetchToRoom() {
        fetch(`/room/${roomId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.ok) {
                window.location.href = `/room/${roomId}`;

            } else {
                console.error('failed to join');
            }
        })
        .catch(error => {
            console.error('Error in fetchToRoom', error);
        });
    }

    roomBtn.addEventListener('click', fetchToRoom);

    }
    
});