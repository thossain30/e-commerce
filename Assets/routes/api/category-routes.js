const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    ]
  }).then((categories) => {
    res.json(categories);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    attributes: ["id", "category_name"], 
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
  ]
  }).then((categoryData) => {
    res.json(categoryData);
  });
});

router.post('/', async(req, res) => {
  // create a new category
  await Category.create(req.body).
    then((newCategory) => res.status(200).json(newCategory)).
    catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name,
  },
  {
    where: {
      id: req.params.id
    }
  }).
  then((_updatedCategory) => {
    res.json({
      status: "updated",
      message: `The category with id: ${req.params.id} has been updated`
    })
  }).
  catch((err) => {res.json(err)});
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then((removedCategory) => {
    res.json(`${removedCategory} category has been removed from the database!`);
  }).catch((err) => {
    res.json(err);
  })
});

module.exports = router;
