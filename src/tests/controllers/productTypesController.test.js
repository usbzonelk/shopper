const { productTypes } = require("../../controllers/productTypesController");

test("saveNewAttribute function", async () => {
  const data = await productTypes.saveNewAttribute(
    "ummdh",
    {
      attributeName: "jas",
      search: false,
      type: "String",
      qualitative: true,
    },
    "1"
  );
  expect(data).toEqual({});
});
