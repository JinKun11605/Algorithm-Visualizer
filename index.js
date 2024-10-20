// express
const express = require("express");
const app = express();

// body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// routes
const routes = require("./routes/index.routes")
routes(app)



// views, pug, public
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));

const port = 3000;
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
