const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
try {
  const tags = await Tag.finadAll({
    include: [{
      model: Product,
      through: ProductTag
    }]
  });
  res.status(200).json(tags)
} catch (err) {
  res.status(500).json(err);
}

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag,
      }]});
   !tag ? res.status(404).json({body: 'Tag ID not found'})
   :res.status(200).json(tag);
  } catch (err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
  !tag ? res.status(404).json({body: 'Tag ID not found'}):
  res.status(200).json({header: `Tag '${tag.name}' updated`}, {tag})
  } catch (err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    !tag ? res.status(404).json({body: 'Tag ID not found'}):
    res.status(200).json({header: `Tag '${tag.name}' Deleted`}, {tag})
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
