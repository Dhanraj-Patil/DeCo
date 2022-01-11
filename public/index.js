// const socket = io()

// socket.on('login', (data) => {
//     console.log("i was here")
//     if (data.status == false) {
//         alert(data.message)
//     } else {
//         console.log(data.message)
//     }
// })

var home_page = document.querySelector(".home_page")
home_page.addEventListener('click', () => {
    window.location = '/'
})

var login_status = document.querySelector(".login_status")
login_status.addEventListener('click', () => {
    console.log("i was here")
    if (login_status.classList == "login_status") {
        window.location = "/login/login.html"
    } else {
        window.location = "/logout"
        login_status.classList = "login_status"
    }
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

var add_project = document.querySelector(".add_project_form")
add_project.addEventListener('click', (event) => {
    event.preventDefault()
    var title = document.querySelector('.title')
    var description = document.querySelector('.description')
    var requirement = document.querySelector('.requirement')
    var github = document.querySelector('.github')

    var data = {
        title: title.value,
        description: description.value,
        requirement: requirement.value,
        github: github.value
    }

    if (title.value && description.value && requirement.value && github.value) {

        fetch('/new-project-submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.status == 'exist') {
                    alert("Title or Github used for another project")
                } else {
                    window.location = '/project_details?project=' + title.value
                }
            })
            .catch((error) => {
                console.log(error)
            })
    } else {
        alert("One or more fields empty.")
    }
})

// socket.on("create_account", (data) => {
//     alert(data.message)
// })