// const socket = io()

var login_form = document.querySelector(".login_submit")
login_form.addEventListener('click', (event) => {
    event.preventDefault()
    console.log("Hi")
    var name = document.querySelector(".name")
    var password = document.querySelector(".password")
    socket.emit('login', { username: name.value, password: password.value })
})


// socket.on('login', (data) => {
//     console.log("i was here")
//     if (data.status == false) {
//         alert(data.message)
//     }
// })