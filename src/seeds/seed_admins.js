/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "admin1",
          password:
            "$2a$10$Eix.QnJ0XG6RTP1gZbHt/OZfllneM5Fj6G2TWiN7B67UCwL5p3Lfi",
        }, // bcrypt hash of 'password1'
        {
          id: 2,
          username: "admin2",
          password:
            "$2a$10$A0.KRFT7CkA0NU8xg.xzde1a7Ewzw81Pb3.UwWoB.O6g/OtKtrh8e",
        }, // bcrypt hash of 'password2'
      ]);
    });
};
