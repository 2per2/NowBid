document.addEventListener('DOMContentLoaded', (event) => {
    // Bring room id from url path
    const pathname = window.location.pathname;
    const roomId = pathname.substring(pathname.lastIndexOf('/') + 1);

    // Emit socket event
    socket.emit('enter_room', roomId);

    socket.on('seller', () =>{ // 나중에 낙찰 버튼으로 바꾸기
        document.body.innerHTML += '<h1>You are seller</h1>';
    });

    // Get current bid
    const currentBid = document.getElementById('current-bid-container');
    socket.emit('getCurrentBid', (price) => {
        const bidElement = document.createElement('p');
        bidElement.textContent = `Current Bid: $${price}`;
        document.getElementById('current-bid-container').appendChild(bidElement);
    });


    // Add event listener to each emoji buttons
    const buttons = document.querySelectorAll('#container-emoji button');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const condition = button.id;
            socket.emit(`click_${condition}`, roomId);
        });
    });
});