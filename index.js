const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(server)
const path = require('path')
const { send } = require('process')
const sql = require('mysql2')


const session = require('express-session')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))



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

    // socket.on('login', (data) => {
    //     let username = data.username
    //     let password = data.password
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
    //                 socket.emit('login', { status: true, message: "Success" })
    //             } else {
    //                 console.log("wrong credentials")
    //                 socket.emit('login', { status: false, message: "Wrong credentials" })
    //             }
    //         }
    //     })
    // })


    // socket.on("create_account", (data) => {
    //     let name = data.name
    //     let username = data.username
    //     let email = data.email
    //     let password = data.password
    //     console.log(data)
    //     con.query(`SELECT * FROM USERS WHERE USERNAME=? OR EMAIL=?`, [username, email], (err, result, fields) => {
    //         if (err) throw err;
    //         console.log(result)
    //         if (result[0] = undefined) {
    //             console.log("Testing []")
    //             con.query(`INSERT INTO USERS VALUES(?,?,?,?)`, [name, username, email, password], (err, result, fields) => {
    //                 if (err) throw err;
    //                 console.log(result)
    //                 socket.emit("create_account", { message: "created" })
    //             })
    //         } else {
    //             socket.emit("create_account", { message: "Email or username used." })
    //         }
    //     })
    // })

})

app.get('/user_login', (req, res) => {
    let username = req.query.Username
    let password = req.query.Password
    console.log(username + " " + password)
    con.query(`SELECT * FROM USERS WHERE USERNAME=? AND PASSWORD=?`, [username, password], (err, result, fields) => {
        if (err) throw err;
        if (result[0] != undefined) {
            req.session.loggedin = true
            req.session.username = username
            res.json({ login: req.session.loggedin, username: req.session.username })
        } else {
            console.log("Wrong Credentials")
            res.json({ login: req.session.loggedin })
        }
    })

})


app.post('/create_account', (req, res) => {
    let name = req.body.name
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    console.log(req.body)
    con.query(`SELECT * FROM USERS WHERE USERNAME=? OR EMAIL=?`, [username, email], (err, result, fields) => {
        if (err) throw err;
        console.log(result)
        if (result[0] == undefined) {
            con.query(`INSERT INTO USERS VALUES(?,?,?,?)`, [name, username, email, password], (err, result, fields) => {
                if (err) throw err;
                console.log(result)
                console.log("Account Created")
                res.json({ status: true })
            })
        } else {
            res.json({ status: false, message: "Username or Email already used." })
        }
    })
})


app.get('/home', (req, res) => {
    if (req.session.loggedin) {
        console.log({ login: req.session.loggedin, username: req.session.username })
        res.json({ login: req.session.loggedin, username: req.session.username })
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})