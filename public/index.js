const socket = io()

username = ""

socket.on('login', (data) => {
    console.log("i was here")
    if (data.status == false) {
        alert(data.message)
    }
})

var login_status = document.querySelector(".login_status")
login_status.addEventListener('click', () => {
    console.log("i was here")
    if (username == "") {
        window.location = "/login/login.html"
    } else { console.log(username) }
})