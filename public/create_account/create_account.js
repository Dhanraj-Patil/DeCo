var create_account_form = document.querySelector(".create_account")
create_account_form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log("I am here")
    var name = document.querySelector('.name')
    var email = document.querySelector('.email')
    var username = document.querySelector('.username')
    var pass = document.querySelector('.password')
    console.log({
        name: name.value,
        username: username.value,
        email: email.value,
        password: pass.value
    })
    $.ajax({
        url: "/create_account",
        type: "POST",
        data: {
            name: name.value,
            username: username.value,
            email: email.value,
            password: pass.value
        },
        success: (data) => {
            console.log(data.status)
            if (data.status) {
                window.location = "/login/login.html"
            } else {
                alert(data.message)
            }
        },
        error: () => {
            alert("Accoutn Creation Failed")
        }
    })
    console.log("testing account creation")
})