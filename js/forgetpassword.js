function forgetpassword() {
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('newpassword').value;
    const compatibilityCheck = document.getElementById('compatibilitycheck').value;

    const user = JSON.parse(localStorage.getItem('user')) || {};

    if (newPassword !== compatibilityCheck){
        alert("Passwords dosen`t match, Please try again.")
        return false;
    }
    if (user.email === email) {
        user.password = newPassword;
        localStorage.setItem('user', JSON.stringify(user));
        alert('The password has been changed.');
        window.location.href = 'login.html';
    }
    else {
        alert('Invalid email, Please try again.');
    }

    return false;
}
document.getElementById('forgetpasswordform').onsubmit = forgetpassword;