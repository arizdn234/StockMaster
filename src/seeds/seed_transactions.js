/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("transactions").del();

  // Inserts seed entries
  await knex("transactions").insert([
    {
      item_id: 1,
      quantity_change: -10,
      total_value: 109.90, // Assuming price of Item 1 is 10.99 * -10
      type: "sale",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      item_id: 2,
      quantity_change: 5,
      total_value: 102.45, // Assuming price of Item 2 is 20.49 * 5
      type: "restock",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      item_id: 3,
      quantity_change: -3,
      total_value: 15.00, // Assuming price of Item 3 is 5.00 * -3
      type: "sale",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      item_id: 4,
      quantity_change: -20,
      total_value: 305.00, // Assuming price of Item 4 is 15.25 * -20
      type: "usage",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};
