document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("form-reservation").addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(window.userId);
            /*
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
                    // if email is already in use
                    error_email.textContent = "사용 중인 이메일입니다.";
                }
            })
            .catch(error => {
                console.error('Error occured for creating your account', error);
            });
            */
    });
});