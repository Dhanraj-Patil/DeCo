const socket = io()

username = ""

// socket.on('login', (data) => {
//     console.log("i was here")
//     if (data.status == false) {
//         alert(data.message)
//     } else {
//         console.log(data.message)
//     }
// })

var login_status = document.querySelector(".login_status")
login_status.addEventListener('click', () => {
    console.log("i was here")
    if (username == "") {
        window.location = "/login/login.html"
    } else { console.log(username) }
})

window.addEventListener("load", () => {
    console.log("Page loaded")
    fetch('/home')
        .then(res => res.json())
        .then(res => {
            console.log(res)
            login_status.classList = "login_status active"
            login_status.innerHTML = res.username
        })
        .catch(err => {
            if (err) console.log(err);
        });
})

// socket.on("create_account", (data) => {
//     alert(data.message)
// })