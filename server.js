const express = require('express');
const dotenv = require("dotenv")
const app = express();
var cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(cookieParser())

dotenv.config({ path: './config.env' })
require("./db/conn");
app.use(cors());
app.use(express.json());
app.use(require('./router/auth'));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;


app.get('/', (req, res) => {
    res.send(`Hello world from server`);
})

app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`)
})

