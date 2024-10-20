const express = require("express")
const router = express.Router()
const controllers = require("../controllers/sort.controllers")


router.get("/", controllers.index)

router.get("/bubblesort", controllers.bubblesort)

router.post("/bubblesort", controllers.bubblesortPost)

module.exports = router