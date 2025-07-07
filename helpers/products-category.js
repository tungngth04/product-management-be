const ProductCategory = require("../models/product-category.model");

module.exports.getSubCategory = async (patrentId) => {
  const getCategory = async (patrentId) => {
    const subs = await ProductCategory.find({
      parent_id: patrentId,
      deleted: false,
      status: "active",
    });

    let allSub = [...subs];
    for (const sub of subs) {
      const childs = await getCategory(sub.id);
      allSub = allSub.concat(childs);
    }

    return allSub;
  };
  const result = await getCategory(patrentId);
  return result;
};
