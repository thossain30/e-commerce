const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag
      }
    ]
  }).then((tagData) => {
    res.status(200).json(tagData);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag
      }
    ]
  }).then((tagData) => {
    res.json(tagData);
  }).catch((err) => {
    res.json(err);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then((newTag) => {
    res.json(newTag);
  }).catch((err) => {
    res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
  {
    tag_name: req.body.tag_name
  },
  {
    where : {
      id: req.params.id
    }
  }).then((updatedTag) => {
    res.json(updatedTag);
  }).catch((err) => {
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then((removedTag) => {
    res.json(`${removedTag} tag was removed from the database`);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
