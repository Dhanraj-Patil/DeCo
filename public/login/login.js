var login_form = document.querySelector(".login_form")
var username = document.querySelector(".name")
var password = document.querySelector(".password")

login_form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(username.value + "  " + password.value)
    $.ajax({
        url: "/user_login",
        type: "GET",
        data: {
            Username: username.value,
            Password: password.value
        },
        success: (data) => {
            if (data.login) {
                window.location = "/"
            } else {
                alert("Wrong Username or Password")
            }
        },
        error: () => {
            console.log("login failed")
        }
    })
})