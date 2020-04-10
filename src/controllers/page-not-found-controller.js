const notFound = (req, res, next) => {
    res.render("page-not-found", {
        data: {
            pageName: "error404",
            message: "page not found",
            class: "alert alert-warning",
            loginStatus: false
        }
    });
};
module.exports = notFound;