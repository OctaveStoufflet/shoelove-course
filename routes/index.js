const express = require("express");
const router = new express.Router();
const productModel = require("./../models/Product");
const UserModel = require("./../models/User");
const uploadCloud = require("../config/cloudinary.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bcryptSalt = bcrypt.genSaltSync(saltRounds);

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

router.get(["/collection", "/kids", "/women", "/men"], (req, res) => {
  var cat = req.url.substring(1);
  if (cat == "collection") {
    productModel
      .find()
      .then(sneakers => {
        res.render("products", { sneakers });
      })
      .catch(err => {
        console.log(err);
      });
    return;
  }
  productModel
    .find({ category: cat })
    .then(sneakers => {
      res.render("products", { sneakers });
    })
    .catch(err => {
      res.render(err);
    });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  const username = req.body.name;
  let userpassword = req.body.password;
  const useremail = req.body.email;
  const userlastname = req.body.lastname;
  if (
    username === "" ||
    userlastname === "" ||
    useremail === "" ||
    userpassword === ""
  ) {
    res.render("signup", {
      errorMessage: "Please fill in all the information to sign up."
    });
    return;
  }
  UserModel.findOne({ name: username }) //compare le name qui est dans le schéma (BDD) avec le username rentré par le user//
    .then(dbRes => {
      if (dbRes) {
        res.render("signup", {
          errorMessage: "The username already exists"
        });
        return;
      } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        let hashPass = bcrypt.hashSync(userpassword, salt);
        // userpassword = hashPass;
        req.body.password = hashPass;
        UserModel.create(req.body)
          .then(() => {
            res.redirect("/");
          })
          .catch(error => {
            console.log(error);
          });
      }
    })
    .catch(error => {
      console.log(error);
    });
});

/*Login*/
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  const theUseremail = req.body.email;
  const thePassword = req.body.password;
  if (theUseremail === "" || thePassword === "") {
    res.render("login", {
      errorMessage: "Please enter both, name and password to sign up."
    });
    return;
  }

  UserModel.findOne({ email: theUseremail })
    .then(dbRes => {
      if (!dbRes) {
        res.render("login", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, dbRes.password)) {
        req.session.currentUser = dbRes;
        res.redirect("/collection");
      } else {
        res.render("login", {
          errorMessage: "Incorrect password"
        });
      }
    })
    .catch(error => {
      next(error);
    });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    console.log("SESSION TERMINATED");
    res.redirect("/login");
  });
});

router.get("/one-product/:id", (req, res) => {
  productModel
    .findById(req.params.id)
    .then(sneaker => res.render("one_product", { sneaker }))
    .catch(err => console.log(err));
});

module.exports = router;
