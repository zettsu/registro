const express = require("express")
var bodyParser = require('body-parser');
const app = express()

require('dotenv').config()

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));

const userRouter = require('./routes/user.router')
app.use("/static", express.static(__dirname + '/static'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
  });

app.use("/api/v1/users", userRouter)

app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))