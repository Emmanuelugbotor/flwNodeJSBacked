const express =  require("express");
const bodyParser =  require("body-parser")
const app =  express();
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.urlencoded({ extended: false}));
require("./routes/users.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{console.log(`server running on port ${PORT}`)})
