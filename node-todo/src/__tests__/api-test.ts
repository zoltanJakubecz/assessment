import {app} from "../index";
import request from "supertest";

describe("GET / - a simple api endpoint", () => {
  it("Get all todos", async () => {
    const response = await request(app)
      .get("/todos");
    expect(JSON.parse(response.text).length).toEqual(3);
    expect(response.statusCode).toEqual(200);
  });

  it('should return "Text required"', async () => {
    const response = await request(app)
      .put('/todos/b546b04d-1e56-4b91-989c-a4abb4999420')
      .send({
          done: false
      });

    expect(response.statusCode).toBe(200)
    expect(response.text).toEqual('Text required');
  });

  it('should return "Invalid ID"', async () => {
    const response = await request(app)
      .put('/todos/b546b04d-1e56-4b91-989c-a4abb4999422')
      .send({
        done: false
      });

    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual('Invalid ID');
  });

  it('should return added todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({
        text: "Test Todo"
      });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text)).toMatchObject({priority: 3});
  });
});
