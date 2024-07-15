document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("form-signin").addEventListener('submit', (event) => {
        event.preventDefault();

        const vusername = document.getElementById('input-username').value,
            vemail = document.getElementById('input-email').value,
            vpassword = document.getElementById('input-password').value,
            errorMessage = document.getElementById('error-message');

            errorMessage.textContent = '';
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: vusername,
                    email: vemail,
                    password: vpassword
                })
            })
            .then(response => {
                if (response.ok) {
                    console.log('successed to create your account');
                    window.location.href = '/';
                } else {
                    console.log('failed to create your account');
                }
            })
            .catch(error => {
                console.error('Error occured for creating your account', error);
            });
        
    });
});