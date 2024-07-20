document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("form-auction").addEventListener('submit', (event) => {
        event.preventDefault();
        
        const vname = document.getElementById('input-name'),
            vdescription = document.getElementById('input-description'),
            vstartTime = document.getElementById('input-startTime');
        
        fetch('/auction/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: vname,
                description: vdescription,
                startTime: vstartTime
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('successed to create your account');
                //window.location.href = '/';
            } else {
                // if email is already in use
                
            }
        })
        .catch(error => {
            console.error('Error occured for creating your account', error);
        });
    });
});