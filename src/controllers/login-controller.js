const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Food = require("../models/food");
const login = (req, res, next) => {
    res.render("login", {
        data: {
            pageName: "Login",
            message: "please login",
            class: "alert alert-primary",
            loginStatus: false,
        }
    });
};
module.exports.login = login;

const getUserData = async dataObj => {
    const user = await User.findOne({
    username: dataObj.username});
    //console.log(foods);
        if(!user){
            return { id: null, username: null, loginStatus: false };
        }else{
            const result = await bcrypt.compare(dataObj.password,
                user.password);
                return { id:user._id, username: user.username,
                lname: user.lname, fname: user.fname,
                loginStatus: result, };
        }
};

const postLogin = async (req, res, next) => {
    if(!req.body.username || !req.body.password){
        res.render("login", {
            data: {
                pageName: "Login",
                message: "Please Enter Username and Password",
                class: "alert alert-warning",
                loginStatus: false
            }
        });
        return;
    }
    const dataObj = {
        username: req.body.username,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname
    };
    getUserData(dataObj)
        .then(async result => {
            if(result.loginStatus == true){
                const token = jwt.sign(
                    {id: result.id, 
                    username: result.username,
                    loginStatus: true,
                    fname: result.fname,
                    lname: result.lname
                },
                    "SECRETKEY",
                    { expiresIn: 60*1 }
                );
                const arrName = new Array();
                const arrCal = new Array();
                const arrDate = new Array();
                const foods = await Food.find({uid: result.id});
                //console.log(foods[0].calorie);
                for( i = 0 ; i < foods.length ; i++){
                    arrName[i] = foods[i].name;
                    arrCal[i] = foods[i].calorie;
                    arrDate[i] = foods[i].updated;
                }
                res.setHeader("Set-Cookie", "token=" + token);
                res.render("profile", {
                    data: {
                        pageName: "Profile",
                        message: "",
                        class: "alert alert-primary",
                        username: result.username,
                        loginStatus: true,
                        fname: result.fname,
                        lname: result.lname
                    },
                    forfood: {
                        name: arrName,
                        n: arrName.length,
                        calorie: arrCal,
                        date: arrDate
                    }
                });
            } else {
                res.render("login", {
                    data: {
                        pageName: "Login",
                        message: "Invalid Username or Password",
                        class: "alert alert-danger",
                        loginStatus: false
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
}
module.exports.postLogin = postLogin;

const logout = (req, res, next) => {
    res.clearCookie("token");
    res.render("login" , {
        data: {
            pageName: "Login",
            message: "Please Login",
            class: "alert alert-warning",
            loginStatus: false
        }
    });
};
module.exports.logout = logout;