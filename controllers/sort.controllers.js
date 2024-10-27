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

// [GET] sort/insertionsort
module.exports.insertionsort = (req, res) => {
    res.render("pages/sort/interchangesort", {
        pageTitle: "Insertion Sort"
    })
}

// [POST] sort/insertionsort
module.exports.insertionsortPost = (req, res) => {
    const numbersString = req.body.numbers_input
    let numbersArray = numbersString.split(",").map(number => parseInt(number.trim()))

    if (numbersArray.some(number => isNaN(number))){
        numbersArray = []
    }

    res.render("pages/sort/insertionsort", {
        pageTitle: "Insertion Sort",
        numbersArray: numbersArray,
    })
}

// [GET] sort/selectionsort
module.exports.selectionsort = (req, res) => {
    res.render("pages/sort/selectionsort", {
        pageTitle: "Selection Sort"
    })
}

// [POST] sort/selectionsort
module.exports.selectionsortPost = (req, res) => {
    const numbersString = req.body.numbers_input
    let numbersArray = numbersString.split(",").map(number => parseInt(number.trim()))

    if (numbersArray.some(number => isNaN(number))){
        numbersArray = []
    }

    res.render("pages/sort/selectionsort", {
        pageTitle: "Selection Sort",
        numbersArray: numbersArray,
    })
}

// [GET] sort/shakersort
module.exports.shakersort = (req, res) => {
    res.render("pages/sort/shakersort", {
        pageTitle: "Shaker Sort"
    })
}

// [POST] sort/shakersort
module.exports.shakersortPost = (req, res) => {
    const numbersString = req.body.numbers_input
    let numbersArray = numbersString.split(",").map(number => parseInt(number.trim()))

    if (numbersArray.some(number => isNaN(number))){
        numbersArray = []
    }

    res.render("pages/sort/shakersort", {
        pageTitle: "Shaker Sort",
        numbersArray: numbersArray,
    })
}


// [GET] sort/binaryinsertionsort
module.exports.binaryinsertionsort = (req, res) => {
    res.render("pages/sort/binaryinsertionsort", {
        pageTitle: "Binary Insertion Sort"
    })
}

// [POST] sort/binaryinsertionsort
module.exports.binaryinsertionsortPost = (req, res) => {
    const numbersString = req.body.numbers_input
    let numbersArray = numbersString.split(",").map(number => parseInt(number.trim()))

    if (numbersArray.some(number => isNaN(number))){
        numbersArray = []
    }

    res.render("pages/sort/binaryinsertionsort", {
        pageTitle: "Binary Insertion Sort",
        numbersArray: numbersArray,
    })
}

// [GET] sort/shellsort
module.exports.shellsort = (req, res) => {
    res.render("pages/sort/shellsort", {
        pageTitle: "Shell Sort"
    })
}

// [POST] sort/shellsort
module.exports.shellsortPost = (req, res) => {
    const numbersString = req.body.numbers_input
    let numbersArray = numbersString.split(",").map(number => parseInt(number.trim()))

    if (numbersArray.some(number => isNaN(number))){
        numbersArray = []
    }

    res.render("pages/sort/shellsort", {
        pageTitle: "Shell Sort",
        numbersArray: numbersArray,
    })
}

// [GET] sort/mergesort
module.exports.mergesort = (req, res) => {
    res.render("pages/sort/mergesort", {
        pageTitle: "Merge Sort"
    })
}

// [POST] sort/mergesort
module.exports.mergesortPost = (req, res) => {
    const numbersString = req.body.numbers_input
    let numbersArray = numbersString.split(",").map(number => parseInt(number.trim()))

    if (numbersArray.some(number => isNaN(number))){
        numbersArray = []
    }

    res.render("pages/sort/mergesort", {
        pageTitle: "Merge Sort",
        numbersArray: numbersArray,
    })
}

// [GET] sort/quicksort
module.exports.quicksort = (req, res) => {
    res.render("pages/sort/quicksort", {
        pageTitle: "Quick Sort"
    })
}

// [POST] sort/quicksort
module.exports.quicksortPost = (req, res) => {
    const numbersString = req.body.numbers_input
    let numbersArray = numbersString.split(",").map(number => parseInt(number.trim()))

    if (numbersArray.some(number => isNaN(number))){
        numbersArray = []
    }

    res.render("pages/sort/quicksort", {
        pageTitle: "Quick Sort",
        numbersArray: numbersArray,
    })
}

// [GET] sort/heapsort
module.exports.heapsort = (req, res) => {
    res.render("pages/sort/heapsort", {
        pageTitle: "Heap Sort"
    })
}

// [POST] sort/heapsort
module.exports.heapsortPost = (req, res) => {
    const numbersString = req.body.numbers_input
    let numbersArray = numbersString.split(",").map(number => parseInt(number.trim()))

    if (numbersArray.some(number => isNaN(number))){
        numbersArray = []
    }

    res.render("pages/sort/heapsort", {
        pageTitle: "Heap Sort",
        numbersArray: numbersArray,
    })
}