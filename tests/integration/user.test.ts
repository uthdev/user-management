import request from 'supertest';
import app from '../../src/server';
import knex from '../../src/db/knex';
import { UserRepository } from "../../src/repositories/user.repository";

describe('User API', () => {
  beforeAll(async () => {
    await knex.migrate.latest();
  });

  beforeEach(async () => {
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Reset mocks after each test
  });

  test('GET /users should return paginated users', async () => {
    const res = await request(app).get('/api/users?pageNumber=0&pageSize=10');
    expect(res.status).toBe(200);
    expect(res.body.items.length).toBeGreaterThan(0);
    expect(res.body).toHaveProperty('totalCount');
    expect(res.body).toHaveProperty('totalPages');
    expect(res.body).toHaveProperty('currentPage');
  });

  test('GET /users/:id should return user details', async () => {
    const res = await request(app).get('/api/users/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('email');
  });

  test('GET /users/:id should return 404 for non-existent user', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('User not found');
  });

  test('POST /users should create a user', async () => {
    const newUser = { name: 'Jane Doe', email: 'jane@example.com' };
    const res = await request(app).post('/api/users').send(newUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(newUser.name);
  });

  test('POST /users should return 409 for duplicate email', async () => {
    const existingUser = { name: 'John Doe', email: 'alice@example.com' };
    const res = await request(app).post('/api/users').send(existingUser);
    expect(res.status).toBe(409);
    expect(res.body.message).toBe("User with this email already exists");
  });

  test('POST /users should return 400 for invalid data', async () => {
    const res = await request(app).post('/api/users').send({ email: 'invalid' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });

  test('GET /users/count should return total counts of users', async () => {
    const res = await request(app).get('/api/users/count');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('count');
  });

  test("GET /users/count should handle errors", async () => {
    jest.spyOn(UserRepository, "getCount").mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/api/users/count");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Failed to fetch user count",
      error: "Database error",
     });
  });

  test("GET /users should handle errors", async () => {
    jest.spyOn(UserRepository, "getAll").mockRejectedValue(new Error("Failed to fetch users"));

    const response = await request(app).get("/api/users");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Failed to fetch users",
      error: "Failed to fetch users",
    });
  });

  test("GET /users/:id should handle errors", async () => {
    jest.spyOn(UserRepository, "getById").mockRejectedValue(new Error("User not found"));

    const response = await request(app).get("/api/users/1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "User not found",
      message: "Failed to fetch user details",
    });
  });

  test("POST /users should handle errors", async () => {
    jest.spyOn(UserRepository, "create").mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .post("/api/users")
      .send({ name: "John Doe", email: "john@example.com" });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Database error",
      message: "Failed to create user",
    });
  });
});
