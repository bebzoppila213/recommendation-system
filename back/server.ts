import express from "express";
import { sign, verify } from "jsonwebtoken"
import UserRouter from "./app/routers/UserRouter";
import cors from "cors";
import FilmRouter from "./app/routers/FilmRouter";

require('dotenv').config();

const app = express()
const port = 8090
app.use(express.json())
app.use(cors());

const userRouter = new UserRouter()
const filmRouter = new FilmRouter()

app.use(express.static('public'));

app.use("/user", userRouter.getRouter());
app.use("/films", filmRouter.getRouter());



app.get('/', (req, res) => {
    res.send('Hello wadawdWorld!')
})

app.get('/register', (req, res) => {
    var privateKey = "wadawd";
    var token = sign({ foo: 'bar', userId: 2 }, privateKey, { expiresIn: 60 * 60 });
    res.send(token)
})

app.get('/auth', (req, res) => {
    // var privateKey = "wadawd";
    // var token = jwt.sign({ foo: 'bar' }, privateKey, { expiresIn: 60 * 60 });
    // console.log(verify(req.body.token, 'wadawd'));
    res.send(req.body.token)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})