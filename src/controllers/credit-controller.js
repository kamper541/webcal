const verifyToken = require("../utilities/verify");
const credit = (req , res , next) => {
    const status = verifyToken(req);
    res.render("credit", {
        data: {
            pageName: "Credit",
            message: "Home Page",
            class: "alert alert-primary",
            loginStatus: false,
        }
    });
};
module.exports = credit;