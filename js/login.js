function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = JSON.parse(localStorage.getItem('user'));

    if (localStorage.getItem('user') === null){
        alert("You are not registed.");
        return false;
    }

    if (user.email === email && user.password === password) {
        alert('login successful.')
        window.location.href = 'home.html';
    }
    else {
        alert('Invalid email or password. Please try again.');
    }

    return false;
}
document.getElementById('loginform').onsubmit = login;