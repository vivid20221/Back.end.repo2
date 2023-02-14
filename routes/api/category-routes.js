const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
  const rawCategoryData = await Category.findByPk(req.params.id, {
    include:[{model: Product}],
  });
  if (!rawCategoryData){
    res.status(404).json({message : "not found"});
    return;
  }

  const categoryData = rawCategoryData.get({ plain: true });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});


  // find one category by its `id` value
  // be sure to include its associated Products


router.post("/",  async (req, res) => {
  try {
    const { categoryName } = req.body;
    await category.create({ category_name: categoryName});
    res.status(200).json({ message: "Category created!" });
  } catch (err) {
    res.status(500).json(err);
  }
  });


router.put("/:id" , async(req, res) => {
  try {
    const { categoryName} = req.body;
    const updatedCategory = await Category.update(
      { category_name: categoryName},
      {
        where: { id: req.params.id},

      }
    );
    if(!updatedCategory[0]){
      res.status(404).json({message: "Category not found!"});
      return;
    }
    res.status(200).json({ message: "Category updated!" });
  } catch (err) {
    res.status(500).json(err);
  }
  });





router.delete("/:id", async (req, res) => {
  
    try{
   const deletedCategory = await Category.destroy({
      where: {id: req.params.id},
    });
      if(!deletedCategory) {
        res.status(404).json({message: 'no category data found with that id!' });
        return;
      }
      res.status(200).json({message: "category Deleted!"});
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;