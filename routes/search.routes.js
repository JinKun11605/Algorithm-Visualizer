const express = require("express")
const router = express.Router()
const controllers = require("../controllers/search.controllers")

router.get("/", controllers.index)

router.get("/linearsearch", controllers.linearsearch)

router.post("/linearsearch", controllers.linearsearchPost)

router.get("/binarysearch", controllers.binarysearch)

router.post("/binarysearch", controllers.binarysearchPost)

module.exports = router