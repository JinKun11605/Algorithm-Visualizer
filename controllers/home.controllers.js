// [GET] /
module.exports.index = (req, res) => {
    res.render("pages/home/index", {
        pageTitle: "Trang ông chủ"
    })
}