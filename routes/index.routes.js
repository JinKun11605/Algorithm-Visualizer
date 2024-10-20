const homeRoutes = require("./home.routes")
const sortRoutes = require("./sort.routes")
const searchRoutes = require("./search.routes")

module.exports = (app) => {
    app.use("/", homeRoutes)

    app.use("/sort", sortRoutes)

    app.use("/search", searchRoutes)
}