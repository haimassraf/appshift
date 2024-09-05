function register() {
    if (localStorage.getItem('user') !== null){
        alert("You already registed, please login");
        return false;
    }
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const age = document.getElementById('age').value;

    const user = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        age: age
    };

    localStorage.setItem('user', JSON.stringify(user));

    alert('Registration successful!');

    window.location.href = 'home.html';
    return false;
}
document.getElementById('registerform').onsubmit = register;