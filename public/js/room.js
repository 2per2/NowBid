document.addEventListener('DOMContentLoaded', () => {
    // Bring room id from url path
    const pathname = window.location.pathname;
    const roomId = pathname.substring(pathname.lastIndexOf('/') + 1);

    // Emit socket event
    try {
        socket.emit('enter_room', roomId, (idcheck) => { console.log(`You just joined ${idcheck} room`); });
    } catch (error) {
        console.error('Error during socket.emit:', error);
    }

    // Add event listener to each emoji buttons
    const emojiBtns = document.querySelectorAll('#container-emoji button');
    emojiBtns.forEach(button => {
        button.addEventListener('click', () => {
            const condition = button.id;
            socket.emit(`click_${condition}`, roomId);
        });
    });

    const bidForm = document.getElementById('form-bid');
        
    bidForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const bidInput = document.getElementById('input-bid'),
        bidValue = bidInput.value;
        
        socket.emit('updateBid', bidValue, roomId, (updatedBid) => {
            console.log(`You updated current bid to ${updatedBid}`)
        });
    });
});