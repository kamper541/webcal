const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const homeController = require("./controllers/home-controller");
const pageNotFoundController = require("./controllers/page-not-found-controller");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./src/views"); 
app.use(authRoute);
app.get("/",homeController);
app.get("*",pageNotFoundController);
mongoose.connect(
    "mongodb+srv://kamper541:5EB12C0E@cluster0-32yjx.mongodb.net/React?retryWrites=true&w=majority",
    { userNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
).then(() => {
    console.log("Database Connected!");
}).catch(e => {
    console.log("Cannot Connect to Database!");
    console.warn(e);
});
app.listen(port, function() {
    console.log("Listening on port",port)
});
