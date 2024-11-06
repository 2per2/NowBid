import { socket } from './app.js';
import { emitBidEvent, emitEndEvent } from './roomEvents.js';
import { onEmojiEvents, emitEmojiEvents } from './emojiEvents.js';
import { onWelcome, emitEnterRoom } from './welcomeEvents.js';

// set up -> 작게 작게 함수를 모아서 set up에 추가
// onEmoji도 추가

export function setupRoom() {
    onWelcome(socket);
    onEmojiEvents(socket);
    
    document.addEventListener('DOMContentLoaded', () => {
        // Bring room id from url path
        const pathname = window.location.pathname;
        const roomId = pathname.substring(pathname.lastIndexOf('/') + 1);
        const price = document.getElementById('price');

        if (price) {
            try {
                emitEnterRoom(socket, roomId, price);
            } catch (error) {
                console.error('Error in enter_room:', error);
            }
            emojiEventListener(roomId);
            bidHandler(roomId);
        }
    });
}

function emojiEventListener(roomId) {
    const emojiBtns = document.querySelectorAll('#container-emoji button');
    emojiBtns.forEach(button => {
        button.addEventListener('click', () => {
            const condition = button.id;
            //socket.emit(`click_${condition}`, roomId);
            emitEmojiEvents(socket, condition, roomId);
        });
    });
}

function bidHandler(roomId) {
    const bidForm = document.getElementById('form-bid');
    bidForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const bidInput = document.getElementById('input-bid'),
        bidValue = bidInput.value;
        emitBidEvent(socket, bidValue, roomId);
    });
}

function sellerHandler(roomId) {
    socket.on('seller', () => { // 나중에 낙찰 버튼으로 바꾸기
        console.log('You are seller');
        const endBtn = document.createElement('button');
        endBtn.id = 'btn-end';
        endBtn.textContent = 'End Auction';
        endBtn.addEventListener('click', () => {
            console.log('click');
            emitEndEvent(socket);
        });
        document.body.appendChild(endBtn, roomId);
    });
}