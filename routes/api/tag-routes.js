const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try{
    const allTag = await Tag.findAll({
      include:[{model: Product, through: ProductTag}]
    });
    res.status(200).json(allTag)
  } catch(err) {res.status(500).json(err)}
});

router.get('/:id', (req, res) => {
  try{
    const unoTag = await Tag.findOne({
      where: { id: req.params.id },
      include: [{model: Product, through: ProductTag}]
    });
    !unoTag ? res.status(404).json({message:`No Tag ID`}) : res.status(200).json(unoTag);
  } catch(err) {res.status(500).json(err)}
});


router.post('/', (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch(err) {res.status(500).json(err)}
});

router.put('/:id', (req, res) => {
  try{
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    !updateTag ? res.status(404).json({message: `No ID for tag`}) : res.status(200).json({message: `Tag Updated.`})
  } catch(err) {res.status(500).json(err)}
});

router.delete('/:id', (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    !deleteTag ? res.status(404).json({message: `No ID for tag`}) : res.status(200).json({message: `Tag Removed.`})
  } catch(err) {res.status(500).json(err)}
})

module.exports = router;
