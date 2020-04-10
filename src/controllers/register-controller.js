const bcrypt = require("bcryptjs");
const User = require("../models/user");
const createUser = async userObj => {
    const hash = await bcrypt.hash(userObj.password, 10);
    const user = new User({
        username: userObj.username,
        password: hash,
        fname: userObj.fname,
        lname: userObj.lname,
    });
    const data = await user.save();
    return data;
};

const register = (req, res, next) => {
    res.render("register", {
        data: {
            pageName: "Register",
            message: "Fill your information",
            class: "alert alert-primary"
        }
    });
};
module.exports.register = register;

const postRegister = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const userObj = {
        username: username,
        password: password,
        fname: fname,
        lname: lname,
    };
    createUser(userObj)
        .then(() => {
            const success = `Successfully SignUp!`;
            res.render("login", {
                data: {
                    pageName: "Login",
                    message: success,
                    class: "alert alert-primary",
                    fname: userObj.fname,
                    lname: userObj.lname,
                }
            });
        })
        .catch(err => {
            res.status(401).render("register", {
                data: {
                    pageName: "Error",
                    message: err,
                    class: "alert alert-dager"
                }
            });
        });
};
module.exports.postRegister = postRegister;