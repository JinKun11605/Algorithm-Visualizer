const express = require("express")
const router = express.Router()
const controllers = require("../controllers/home.controllers")


router.get("/", controllers.index)


module.exports = router