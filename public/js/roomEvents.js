export function emitBidEvent(socket, bidValue, roomId) {
    socket.emit('update_bid', bidValue, roomId, (updatedBid) => {
        console.log(`You updated current bid to ${updatedBid}`)
    });
}

export function emitEndEvent(socket, roomId) {
    socket.emit('auctionEnd', roomId);
}