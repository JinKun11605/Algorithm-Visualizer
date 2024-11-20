// [GET] search/
module.exports.index = (req, res) => {
    res.send("Tìm kiếm")
    // res.render("pages/search/index", {
    //     pageTitle: "Tìm kiếm"
    // })
}

// [GET] search/linearsearch
module.exports.linearsearch = (req, res) => {
    res.render("pages/search/linearsearch", {
        pageTitle: "Linear Search"
    })
}

// [POST] search/linearsearch
module.exports.linearsearchPost = (req, res) => {
    if (req.body.search_input != "") {
        var search_input = parseInt(req.body.search_input);
    }

    const numbersString = req.body.numbers_input
    let numbersArray = numbersString.split(",").map(number => parseInt(number.trim()))

    if (numbersArray.some(number => isNaN(number))){
        numbersArray = []
    }

    res.render("pages/search/linearsearch", {
        pageTitle: "Linear Search",
        numbersString: numbersString,
        numbersArray: numbersArray,
        numberFind: search_input
    })
}


// [GET] search/binarysearch
module.exports.binarysearch = (req, res) => {
    res.render("pages/search/binarysearch", {
        pageTitle: "Binary Search"
    })
}

// [POST] search/binarysearch
module.exports.binarysearchPost = (req, res) => {
    if (req.body.search_input != "") {
        var searchInput = parseInt(req.body.search_input);
    }

    const numbersString = req.body.numbers_input
    let numbersArray = numbersString.split(",").map(number => parseInt(number.trim()))

    if (numbersArray.some(number => isNaN(number))){
        numbersArray = []
    }

    res.render("pages/search/binarysearch", {
        pageTitle: "Binary Search",
        numbersString: numbersString,
        numbersArray: numbersArray,
        numberFind: searchInput
    })
}