/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("transactions", (table) => {
      table.increments("id").primary();
      table.integer("item_id").unsigned().notNullable();
      table.foreign("item_id").references("id").inTable("items").onDelete("CASCADE"); // Ensures referential integrity
      table.integer("quantity_change").notNullable(); // Positive for stock increase, negative for stock decrease
      table.decimal("total_value", 10, 2).notNullable(); // Quantity * Price
      table.string("type"); // 'sale', 'purchase', etc.
      table.timestamps(true, true); // created_at and updated_at timestamps
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("transactions");
  };
  