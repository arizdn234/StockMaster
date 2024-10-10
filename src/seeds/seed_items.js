/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("items").del();

  // Inserts seed entries
  await knex("items").insert([
    {
      id: 1,
      name: "Item 1",
      category: "Category 1",
      stock: 100,
      price: 10.99,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: "Item 2",
      category: "Category 2",
      stock: 50,
      price: 20.49,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: "Item 3",
      category: "Category 3",
      stock: 30,
      price: 5.00,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      name: "Item 4",
      category: "Category 4",
      stock: 20,
      price: 15.25,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
