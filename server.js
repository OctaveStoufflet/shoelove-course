require("dotenv").config();
require("./config/db_connection"); // database initial setup
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const express = require("express");
const hbs = require("hbs");
const app = express();
app.locals.site_url = process.env.SITE_URL;
// used in front end to perform ajax request on a url var instead of hardcoding it

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs"); //
app.set("views", __dirname + "/views"); //
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");
app.use(
  session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 60000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  })
);
const basePageRouter = require("./routes/index");
const adminRouter = require("./routes/admin");

app.use(basePageRouter);
app.use(adminRouter);

const listener = app.listen(process.env.PORT || 8000, () => {
  console.log(`app started at ${process.env.SITE_URL}`);
});
