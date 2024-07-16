document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("form-reservation").addEventListener('submit', (event) => {
        event.preventDefault();
        //console.log(window.userId);

        const name = document.getElementById('input-name'),
            description = document.getElementById('input-description'),
            startTime = document.getElementById('input-startTime');
        
        fetch('/reservation/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
    
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('successed to create your account');
                window.location.href = '/';
            } else {
                // if email is already in use
                
            }
        })
        .catch(error => {
            console.error('Error occured for creating your account', error);
        });
    });
});