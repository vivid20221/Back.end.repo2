// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  
})

// Categories have many Products
//hasMany instead of belongsToMany
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through:{
    model: ProductTag,
    foreignKey: "product_id"
  
  },
  //change the id to match the right foreign key
  // as: 'product'
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through:{
    model: ProductTag,
    foreignKey: "tag_id"
   
  },
  //change the id
  // as: 'tag'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
