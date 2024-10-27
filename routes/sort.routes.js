const express = require("express")
const router = express.Router()
const controllers = require("../controllers/sort.controllers")


router.get("/", controllers.index)

router.get("/bubblesort", controllers.bubblesort)

router.post("/bubblesort", controllers.bubblesortPost)

router.get("/interchangesort", controllers.interchangesort)

router.post("/interchangesort", controllers.interchangesortPost)

router.get("/insertionsort", controllers.insertionsort)

router.post("/insertionsort", controllers.insertionsortPost)

router.get("/selectionsort", controllers.selectionsort)

router.post("/selectionsort", controllers.selectionsortPost)

router.get("/shakersort", controllers.shakersort)

router.post("/shakersort", controllers.shakersortPost)

router.get("/binaryinsertionsort", controllers.binaryinsertionsort)

router.post("/binaryinsertionsort", controllers.binaryinsertionsortPost)

router.get("/shellsort", controllers.shellsort)

router.post("/shellsort", controllers.shellsortPost)

router.get("/mergesort", controllers.mergesort)

router.post("/mergesort", controllers.mergesortPost)

router.get("/quicksort", controllers.quicksort)

router.post("/quicksort", controllers.quicksortPost)

router.get("/heapsort", controllers.heapsort)

router.post("/heapsort", controllers.heapsortPost)

module.exports = router