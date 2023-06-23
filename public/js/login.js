const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
            // document.location.replace('/');

        } else {
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const goToSignup = async (event) => {
    event.preventDefault();
    document.location.replace('/signup');
};

const signupButton = document.querySelector('#signup-btn');
if (signupButton) {
    signupButton.addEventListener('click', goToSignup);
};

const loginForm = document.querySelector('.login-form');
if (loginForm) {
    loginForm.addEventListener('submit', loginFormHandler);
};

const signupForm = document.querySelector('.signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', signupFormHandler);
};


    
