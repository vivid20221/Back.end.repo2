const router = require('express').Router();
const {Tag , Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
  const rawTagData = await Tag.findAll({ 
    include: [{ model: Product, through: ProductTag }],
  });
   const tagData = rawTagData.map((tag) => tag.get({ plain: true }));
  // make sure to include products
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const rawTagData = await tag.findByPk(req.params.id, {
      //through ProductTag because we used the ProductTag model to make a connection between the Product model and the Tag Model
      include: [{ model: Product, through: ProductTag}]

    });

    if (!rawTagData) {
      res.status(404).json({ message: "Doesn't exit!"});
      return;
    }
    const tagData = rawTagData.get({plain: true});
    res.status(200).json(tagData);

  }catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
   try {
    const { tagName } = req.body;
    await  Tag.create({tag_name: tagName});
    res.status(200).json({message: " Tag created!"})
  } catch (err) {
    res.status(500).json(err);
  }
});




router.put('/:id', async (req, res) => {
  try {
    const{ tagName} = req.body;
    const updatedTag = await Tag.update(
      { tag_name: tagName },
       {where: {id: req.params.id} }
       );
       if(!updatedTag[0]) {
        res.status(404).json({ message:"tag not found"});
        return;
       }
       res.status(200).json({message: "tag updated!" });
    } catch (err) {
      res.status(500).json(err);
    }
  });










router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      
  }});

    if (!deletedTag) {
      res.status(404).json({ message:"nothing to destroy!" });
      return;
    }

    res.status(200).json({message: "Tag destroyed!"});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
