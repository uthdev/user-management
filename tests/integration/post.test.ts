import request from "supertest";
import { app, server } from "../../src/server";
import knex from "../../src/db/knex";
import { PostRepository } from '../../src/repositories/post.repository'



describe("Post API", () => {
  beforeAll(async () => {
    await knex.migrate.latest();
  });

  beforeEach(async () => {
    await knex.seed.run();
  });

  afterAll(async () => {
    await knex.destroy();
    server.close();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("GET /posts?userId=1 should return posts for a specific user", async () => {
    const response = await request(app).get("/api/posts?userId=1");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("POST /posts should create a new post", async () => {
    const newPost = {
      title: "New Test Post",
      body: "This is a test post",
      userId: 1,
    };

    const response = await request(app).post("/api/posts").send(newPost);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newPost.title);
  });

  test("POST /posts should return 400 for invalid input", async () => {
    const invalidPost = {
      title: "T",
      body: "",
      userId: "invalid",
    };

    const response = await request(app).post("/api/posts").send(invalidPost);
    expect(response.status).toBe(400);
  });

  test("DELETE /posts/:id should delete a post", async () => {
    const postToDelete = await knex("posts").first();
    const response = await request(app).delete(`/api/posts/${postToDelete.id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Post deleted successfully");
  });

  test("DELETE /posts/:id should return 404 if post does not exist", async () => {
    const response = await request(app).delete("/api/posts/9999");
    expect(response.status).toBe(404);
  });

  test("GET /posts?userId=1 - should return 500 if an error occurs", async () => {
    jest.spyOn(PostRepository, 'getByUserId').mockRejectedValue(new Error('Database Error'));

    const response = await request(app).get("/api/posts?userId=1");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Database Error', message: 'Failed to fetch posts' });
  });

  test("POST /posts - should return 500 if an error occurs", async () => {
    jest.spyOn(PostRepository, 'create').mockRejectedValue(new Error('Database Error'));

    const newPost = {
      title: "New Test Post",
      body: "This is a test post",
      userId: 1,
    };

    const response = await request(app).post("/api/posts").send(newPost);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Database Error', message: 'Failed to create post' });
  });

  test("DELETE /posts/:id - should return 500 if an error occurs", async () => {
    jest.spyOn(PostRepository, 'deleteById').mockRejectedValue(new Error('Database Error'));

    const response = await request(app).delete("/api/posts/1");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Database Error', message: 'Failed to delete post' });
  });
});
