const request = require("supertest");
const app = require("../index");

describe("Auth API", () => {
  it("should register user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@mail.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe("test@mail.com");
  });

  it("should login user and return access token", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "login@test.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "login@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });

  it("should block protected route without token", async () => {
    const res = await request(app).get("/api/projects");

    expect(res.statusCode).toBe(401);
  });

  it("should allow protected route with valid token", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Protected User",
      email: "protected@test.com",
      password: "password123",
    });

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "protected@test.com",
      password: "password123",
    });

    const token = loginRes.body.accessToken;

    const res = await request(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
