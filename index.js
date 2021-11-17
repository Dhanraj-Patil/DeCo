const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(server)
const path = require('path')
const { send } = require('process')
const sql = require('mysql2')
    // const { Socket } = require('socket.io')
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname + '/public')))

// sql config

var con = sql.createConnection({
    host: "localhost",
    user: "Dhanraj",
    password: "djp111234",
    database: "DeCo",
    insecureAuth: true
});
con.connect((err) => {
    if (err) throw err;
    console.log("connected to my sql")
})

// socket.io config 

io.on('connection', socket => {
    console.log("Client connected")

    socket.on('login', (data) => {
        let username = data.username
        let password = data.password
        console.log(username + " " + password)
        con.query(`SELECT * FROM USERS WHERE USERNAME=?`, [username], (err, result, fields) => {
            console.log(result[0])
            if (err) throw err;
            if (result[0] == undefined) {
                console.log("User does not exist")
                socket.emit('login', { status: false, message: "Account does not exist." })
            } else if (result[0] != undefined) {
                if (result[0].PASSWORD == password) {
                    console.log("Success")
                        // res.redirect('/chat/chat.js')
                    socket.emit('login', { status: true })
                }
            } else {
                console.log("wrong credentials")
                socket.emit('login', { status: false, message: "Wrong credentials" })
            }
        })
    })

    // app.post('/user_login', (req, res) => {
    //     let username = req.body.Username
    //     let password = req.body.Password
    //     console.log(username + " " + password)
    //     con.query(`SELECT * FROM USERS WHERE USERNAME=?`, [username], (err, result, fields) => {
    //         console.log(result[0])
    //         if (err) throw err;
    //         if (result[0] == undefined) {
    //             console.log("User does not exist")
    //             socket.emit('login', { status: false, message: "Account does not exist." })
    //         } else if (result[0] != undefined) {
    //             if (result[0].PASSWORD == password) {
    //                 console.log("Success")
    //                     // res.redirect('/chat/chat.js')
    //                 socket.emit('login', { status: true })
    //             }
    //         } else {
    //             console.log("wrong credentials")
    //             socket.emit('login', { status: false, message: "Wrong credentials" })
    //         }
    //     })

    // })
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})