const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  try{
    const catData = await Category.findAll({
      include: [{model: Product}]
    });
  }catch (err) {res.status(500).json(err)}
});

router.get('/:id', (req, res) => {
  try {
    const unoCat = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }]
    });
    !unoCat ? res.status(404).json({message: `No cat found.`})
      : res.status(200).json(unoCat);
  } catch (err) {res.status(500).json(err)}
});

router.post('/', (req, res) => {
  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
  } catch (err) {res.status(500).json(err)}
});

router.put('/:id', (req, res) => {
  try {
    const freshCat = await Category.update(req.body, {
      where:{
        id: req.params.id,
      },
    });
    !updatedCategory ? res.status(404).json({message: `No cat was found`})
      : res.status(200).json()
  } catch (err) { res.status(500).json(err) }
});

router.delete('/:id', (req, res) => {
  try {
    const spoiledCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    !spoiledCat ? res.status(404).json({message: `No cat was found` })
      : res.status(200).json()
  } catch (err) { res.status(500).json(err) };
});

module.exports = router;
