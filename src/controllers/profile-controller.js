const jwt = require("jsonwebtoken");
const Food = require("../models/food");

const profile = async(req, res, next) => {

    try{
        const token = req.get("Cookie").split("token=")[1].trim();
        const user = jwt.verify(token, "SECRETKEY");
        //console.log(user);
        const foods = await Food.find({uid: user.id});
        const arrName = new Array();
        const arrCal = new Array();
        const arrDate = new Array();
        for( i = 0 ; i < foods.length ; i++){
            arrName[i] = foods[i].name;
            arrCal[i] = foods[i].calorie;
            arrDate[i] = foods[i].updated;
        }
        //console.log(foods);
        res.render("profile", {
            data: {
                pageName: "Profile",
                message: "",
                class: "alert alert-primary",
                username: user.username,
                loginStatus: user.loginStatus,
                fname: user.fname,
                lname: user.lname,
            },
            forfood: {
                name: arrName,
                n: arrName.length,
                calorie: arrCal,
                date: arrDate
            }
        });
    }catch (error) {
        res.render("login", {
            data: {
                pageName: "Login",
                message: "Please Login",
                class: "alert alert-warning"
            }
        });
    }
};
module.exports = profile;
 