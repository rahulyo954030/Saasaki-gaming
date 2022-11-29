const express = require("express")
const app = express()

const connection =require("./db/db")

const userRouter = require("./Routes/user")
const authRouter = require("./Routes/Auth")

app.use(express.urlencoded({extended : true}))
app.use(express.json())


app.use("/auth", authRouter)
app.use("/user", userRouter)

app.get("/", async(req,res) => {
    res.send("<h1>Welcome to Home Page</h1>")
})

const PORT = process.env.PORT || 8080

app.listen(PORT, async() => {
    await connection
    console.log('listening on http://localhost:8080')
})