const express = require("express");
const router = new express.Router();
const productModel = require("./../models/Product");
const uploadCloud = require("../config/cloudinary.js");

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

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/one-product/:id", (req, res) => {
  productModel
    .findById(req.params.id)
    .then(sneaker => res.render("one_product", { sneaker }))
    .catch(err => console.log(err));
});

module.exports = router;
