document.getElementsByClassName('login-container')[0].style.display = 'none';
        
const loginButton = document.getElementById("login");

loginButton.addEventListener('click', () => {
    if (document.getElementsByClassName('login-container')[0].style.display === "none") {
        document.getElementsByClassName('login-container')[0].style.display = "block";
    } else {
        document.getElementsByClassName('login-container')[0].style.display = "none";
    }
});

document.addEventListener('mouseup', function(e) {
    const container = document.getElementsByClassName('login-container')[0];
    const loginButton = document.getElementById("login");
    if (!container.contains(e.target) && !loginButton.contains(e.target)) {
        container.style.display = 'none';
    }
});