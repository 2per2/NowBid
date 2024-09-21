document.addEventListener('DOMContentLoaded', () => {
    // Bring room id from url path
    const pathname = window.location.pathname;
    const roomId = pathname.substring(pathname.lastIndexOf('/') + 1);
    const price = document.getElementById('price');

    // Emit socket event
    try {
        socket.emit('enter_room', roomId, (idcheck, updatedBid) => { 
            console.log(`You just joined ${idcheck} room, ${updatedBid}`);
            price.innerText = updatedBid;
        });
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

    socket.on('seller', () =>{ // 나중에 낙찰 버튼으로 바꾸기
        console.log('You are seller');
        const endBtn = document.createElement('button');
        endBtn.id = 'btn-end';
        endBtn.textContent = 'End Auction';
        endBtn.addEventListener('click', () => {
            console.log('click');
            socket.emit('auction_end', roomId);
        });
        document.body.appendChild(endBtn);
        // endBtn 이벤트 리스너는 room.js에 있음
    });

    // Add event listener to end button
    
});