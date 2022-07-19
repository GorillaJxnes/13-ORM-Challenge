
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: `tag_id`
})

Product.belongsTo(Category, {
  foreignKey: 'cat_type',
  onDelete: `CASCADE`
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: `product_id`
});

Category.hasMany(Product, {
  foreignKey: `cat_type`
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
