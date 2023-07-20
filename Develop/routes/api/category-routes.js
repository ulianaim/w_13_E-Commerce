const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // const results = await Category.findAll({
  //   attributes: {
  //     include: [ 
  //       Product
  //     ]
  //   }
  // });
  // res.json(results)
  try {
    const results = await Category.findAll({
     
        include: [{ model: Product }]
  
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category_result = await Category.findOne({ where: { id: req.params.id } });
  res.json(category_result)
});

router.post('/', async (req, res) => {
  // create a new category
  // const newCategory = await User.create({ firstName: "Jane", lastName: "Doe" });
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
      
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const category_update = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!category_update[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(category_update);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const userCategoty = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userCategoty) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(userCategoty);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
