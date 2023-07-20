const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      attributes: {
        include: [ Product ]
      }
    });
    res.status(200).json(ProductData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag_result = await Tag.findAll({where: { id: req.params.id } });
    res.status(200).json(tag_result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
  // or should I use const newTag = await Tag.create(req.body)
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag_update = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tag_update[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tag_update);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const userTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userTag) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(userTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
