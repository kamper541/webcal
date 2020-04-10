const Food = require("../models/food");
const jwt = require("jsonwebtoken");

const cal = (req, res , next) => {
    const food = new Food(req.body);
     console.log(food);
     res.render("profile", {
         data: {
             pageName: "Profile",
             message: "",
             class: "alert alert-primary",
             loginStatus: true
         }
     });
 }
 
 module.exports.cal = cal;
