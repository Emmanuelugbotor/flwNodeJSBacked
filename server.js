require("express-async-errors")
const express =  require("express");
const bodyParser =  require("body-parser")
const error =  require("./errorHandler/error.handler")
const app =  express();

app.use(bodyParser.json())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.urlencoded({ extended: false}));
app.all('/*', (req, res, next)=>{
    res.setHeader("Acess-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET", "POST")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With Content-type, Accept, X-Access-Token, X-key")
    res.contentType("application/json;charset=utf-8")
    next()
})
app.use(error)
require("./routes/users.routes")(app)
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{console.log(`server running on port ${PORT}`)});