import request from "supertest";
import { app, server } from "../../src/server";
import { AddressRepository } from "../../src/repositories/address.repository";
import knex from "../../src/db/knex";

describe("Address API", () => {
  beforeAll(async () => {
    await knex.migrate.latest();
  });
  
  beforeEach(async () => {
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.destroy(); // Close database connection
    server.close(); // Close Express server
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Reset mocks after each test
  });

  const mockAddress = { id: 1, street: "123 Main St", city: "New York", state: "NY", zip_code: "10001", user_id: 1 };
  test("GET /addresses/:userID - should return an address", async () => {

    const response = await request(app).get("/api/addresses/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", mockAddress.id);
    expect(response.body).toHaveProperty("street", mockAddress.street);
    expect(response.body).toHaveProperty("city", mockAddress.city);
  });

  test("GET /addresses/:userID - should return 404 if address is not found", async () => {
    const response = await request(app).get("/api/addresses/404");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Address not found" });
  });

  test("POST /addresses - should create an address", async () => {
    const newAddress = {
      userId: 4,
      street: "456 Park Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
    };

    const mockCreatedAddress = {
      id: 4,
      user_id: newAddress.userId,
      street: newAddress.street,
      city: newAddress.city,
      state: newAddress.state,
      zip_code: newAddress.zipCode,
    };

    const response = await request(app).post("/api/addresses").send(newAddress);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockCreatedAddress);
  });

  test("POST /addresses - should return 409 if user already has an address", async () => {
    const newAddress = {
      userId: 1,
      street: "456 Park Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
    };


    const response = await request(app).post("/api/addresses").send(newAddress);

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: "User already has an address" });
  });

  test("PATCH /addresses/:userID - should update an address", async () => {

    const response = await request(app).patch("/api/addresses/1").send({ street: "789 New St" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Address updated successfully" });
  });

  test("PATCH /addresses/:userID - should return 404 if address is not found", async () => {

    const response = await request(app).patch("/api/addresses/404").send({ street: "789 New St" });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Address not found" });
  });

  test("GET /addresses/:userID - should return 500 if an error occurs", async () => {
    jest.spyOn(AddressRepository, 'getByUserId').mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/api/addresses/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Failed to fetch address", error: "Database error" });
  });

  test("POST /addresses - should return 500 if an error occurs", async () => {
    jest.spyOn(AddressRepository, 'create').mockRejectedValue(new Error("Database error"));

    const newAddress = {
      userId: 5,
      street: "456 Park Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
    };

    const response = await request(app).post("/api/addresses").send(newAddress);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Failed to create address", error: "Database error" });
  });

  test("PATCH /addresses/:userID - should return 500 if an error occurs", async () => {
    jest.spyOn(AddressRepository, 'update').mockRejectedValue(new Error("Database error"));

    const response = await request(app).patch("/api/addresses/1").send({ street: "789 New St" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Failed to update address", error: "Database error" });
  })
});
