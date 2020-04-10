const express = require("express");
const router = express.Router();
const Food = require("../models/food");
const loginController = require("../controllers/login-controller");
const registerController = require("../controllers/register-controller");
const profileController = require("../controllers/profile-controller");
const authChecker = require("../middlewares/auth-middleware");
const addF = require("../controllers/calculator");
const jwt = require("jsonwebtoken");


const deleteF = async dl => {
   const ff = await Food.findOneAndDelete({name: dl})
}

router.get("/login", loginController.login);
router.post("/login", loginController.postLogin);
router.get("/logout", loginController.logout);
router.get("/register", registerController.register);
router.post("/register", registerController.postRegister);
router.get("/profile", authChecker , profileController);
router.get("/add" , authChecker, function(req, res) {
    const foodt = req.query.food;
    const calorie = req.query.cal;

     if( foodt === "" || calorie === ""){
      res.redirect(301,"/profile");
     }else{
        const token = req.get("Cookie").split("token=")[1].trim();
        const user = jwt.verify(token, "SECRETKEY");
        const food = new Food({
           uid: user.id,
           name: foodt,
           calorie: calorie
        })
        console.log(user);
        console.log(food);
        food.save();
        res.redirect(301,"/profile");
     }
     
 });

router.get("/del" , function(req, res){
   const dl = req.query.food;
    console.log(req.query.food);
    deleteF(dl);
    res.redirect(301,"/profile");
})

//  router.get("/del" , authChecker, async function (req, res){
//    // const token = req.get("Cookie").split("token=")[1].trim();
//    // console.log(token);
//    // const user = jwt.verify(token, "SECRETKEY");
//       console.log("del");
//       const nfood = req.query.food;
//       console.log("del2");
//       const food1 = await Food.findOneAndDelete({name:nfood});
//       console.log(food1);
//       res.redirect(301,"/profile");
// });

// router.get("/add", function(res,req){
//     console.log("in add");
// });
//  router.post("/profile", function(req,res){
//      profileController.add;
//  });
module.exports = router;