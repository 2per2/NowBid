document.addEventListener('DOMContentLoaded', (event) => {
    // Bring room id from url path
    const pathname = window.location.pathname;
    const roomId = pathname.substring(pathname.lastIndexOf('/') + 1);

    // Add event listener to each emoji buttons
    const buttons = document.querySelectorAll('#container-emoji button');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const condition = button.id;
            socket.emit(`click_${condition}`, roomId);
        });
    });
});