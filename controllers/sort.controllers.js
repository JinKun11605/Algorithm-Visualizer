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
    let numbersArray = numbersString.split(",").map(number => parseInt(number.trim()))

    if (numbersArray.some(number => isNaN(number))){
        numbersArray = []
    }

    res.render("pages/sort/bubblesort", {
        pageTitle: "Bubble Sort",
        numbersArray: numbersArray,
    })
}

// [GET] sort/interchangesort
module.exports.interchangesort = (req, res) => {
    res.render("pages/sort/interchangesort", {
        pageTitle: "Interchange Sort"
    })
}

// [POST] sort/interchangesort
module.exports.interchangesortPost = (req, res) => {
    const numbersString = req.body.numbers_input
    let numbersArray = numbersString.split(",").map(number => parseInt(number.trim()))

    if (numbersArray.some(number => isNaN(number))){
        numbersArray = []
    }

    res.render("pages/sort/interchangesort", {
        pageTitle: "Interchange Sort",
        numbersArray: numbersArray,
    })
}