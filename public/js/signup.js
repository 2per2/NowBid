document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("form-signup");
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
    
            const vusername = document.getElementById('input-username').value,
            vemail = document.getElementById('input-email').value,
            vpassword = document.getElementById('input-password').value,
            vrepassword = document.getElementById('input-repassword').value,
            error_email = document.getElementById('error-email'),
            error_pw = document.getElementById('error-repassword');
    
            if (vpassword !== vrepassword) {
                error_pw.textContent = '비밀번호가 일치하지 않습니다.';
                return; // quit form submitting
            } else {
                error_pw.textContent = '';
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
            }
        });
    }   
});