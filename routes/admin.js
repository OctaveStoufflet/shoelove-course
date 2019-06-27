const express = require("express");
const router = new express.Router();
const productModel = require("./../models/Product");

router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.post("/prod-add", (req, res) => {
  // const { name, description, ref, size, price } = req.body;
  productModel
    .create(req.body)
    .then(sneaker => res.redirect("/collection"))
    .catch(sneaker => console.log(sneaker));
});

router.get("/prod-manage", (req, res) => {
  productModel
    .find()
    .then(sneakers => {
      console.log(sneakers);
      res.render("products_manage", { sneakers });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/product_edit", (req, res) => {
  res.render("product_edit");
});

module.exports = router;
