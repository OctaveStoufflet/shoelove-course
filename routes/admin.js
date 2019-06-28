const express = require("express");
const router = new express.Router();
const productModel = require("./../models/Product");
const uploadCloud = require("../config/cloudinary.js");

router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

// router.post("/prod-add", (req, res) => {
//   // const { name, description, ref, size, price } = req.body;
//   productModel
//     .create(req.body)
//     .then(sneaker => res.redirect("/collection"))
//     .catch(sneaker => console.log(sneaker));
// });

router.get("/prod-manage", (req, res) => {
  productModel
    .find()
    .then(sneakers => {
      res.render("products_manage", { sneakers });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/product_edit/:id", (req, res) => {
  productModel
    .findById(req.params.id)
    .then(edit => {
      res.render("product_edit", { edit });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/product_edit/:id", uploadCloud.single("image"), (req, res) => {
  console.log(req.body);
  productModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/collection");
    })
    .catch(() => {
      res.render("product_edit", { errormessage: "ca a bugué" });
    });
});

router.get("/delete-sneaker/:id", (req, res) => {
  productModel
    .findByIdAndRemove(req.params.id)
    .then(success => res.redirect("/prod-manage"))
    .catch(error => res.redirect("/prod-manage"));
});

router.post("/prod-add", uploadCloud.single("image"), (req, res, next) => {
  const { name, description, ref, size, price, category } = req.body;
  const imgUrl = req.file.secure_url;
  // const imgName = req.file.originalname;
  const newSneak = new productModel({
    name,
    ref,
    size,
    description,
    price,
    category,
    image: imgUrl
    // imgName
  });
  newSneak
    .save()
    .then(dbRes => {
      console.log(dbRes);
      res.redirect("/collection");
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
