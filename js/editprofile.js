function update() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const age = document.getElementById('age').value;

    const user = JSON.parse(localStorage.getItem('user'));

    user.email = email
    user.password = password
    user.firstName = firstName
    user.lastName = lastName
    user.age = age

    localStorage.setItem('user', JSON.stringify(user));

    alert('Edit profile successful!');

    window.location.href = 'home.html';

    return false;
}
document.getElementById('editProfileForm').onsubmit = update;