const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  try {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = await Product.create({
      title,
      imageUrl,
      price,
      description,
      userId: 1,
    });

    if (product) {
      res.redirect("/");
    }
  } catch (err) {
    console.log("Error is ", err);
  }
};

exports.getEditProduct = async (req, res, next) => {
  try {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect("/");
    }
    const prodId = req.params.productId;
    const product = await Product.findByPk(prodId);
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  } catch (err) {
    console.log("Error is ", err);
  }
};

exports.postEditProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    const updateProduct = await Product.update(
      {
        title: updatedTitle,
        description: updatedDesc,
        imageUrl: updatedImageUrl,
        price: updatedPrice,
      },
      {
        where: {
          id: prodId,
        },
      }
    );

    if (updateProduct) {
      console.log("Updated Product is ", updateProduct);
      res.redirect("/admin/products");
    }
  } catch (err) {
    console.log("Error is ", err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (err) {
    console.log("Error is ", err);
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const deletedProduct = await Product.destroy({
      where: {
        id: prodId,
      },
    });
    if (deletedProduct) {
      console.log("Deleted Product is ", deletedProduct);
      res.redirect("/admin/products");
    }
  } catch (err) {
    console.log("Error is ", err);
  }
};
