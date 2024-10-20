// [GET] sort/
module.exports.index = (req, res) => {
    res.render("pages/sort/index", {
        pageTitle: "Sắp xếp"
    })
}
// [GET] sort/bubblesort
module.exports.bubblesort = (req, res) => {
    res.render("pages/sort/bubblesort", {
        pageTitle: "Bubble Sort"
    })
}

// [POST] sort/bubblesort
module.exports.bubblesortPost = (req, res) => {
    const numbersString = req.body.numbers_input
    const numbersArray = numbersString.split(",").map(number => parseInt(number.trim()))

    res.render("pages/sort/bubblesort", {
        pageTitle: "Bubble Sort",
        numbersArray: numbersArray,
    })
}
