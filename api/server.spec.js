const request = require("supertest");
const server = require("./server");

let token; //Saving token

describe("server.js accessing routes", () => {
  describe("Attempting Login", () => {
    it("returns 200 OK", async () => {
      const res = await request(server)
        .post("/auth/login")
        .send({ username: "bucketboy", password: "bucket" });

      expect(res.status).toBe(200);
    });
    it("returns 401 for invalid credentials", async () => {
      const res = await request(server)
        .post("/auth/login")
        .send({ username: "bucketboy2", password: "bucket2" });

      expect(res.status).toBe(401);
    });
    it("returns 400 if login info is missing", async () => {
      const res = await request(server).post("/auth/login");
      expect(res.status).toBe(400);
    });
  });
  describe("Attempt Login and retrieve a user info", () => {
    it("gets a Token, uses info from response to perform another req for more info", async () => {
      const res = await request(server)
        .post("/auth/login")
        .send({ username: "bucketboy", password: "bucket" });
      token = res.body.token;
      let user_id = res.body.user.user_id;

      const GETUSER = await request(server)
        .get(`/user/${user_id}`)
        .set("Authorization", `${token}`);

      //Test Server is using SQLite3 Config, Postgres automatically converts boolean values to true/false
      let storedUser = {
        user_id: 2,
        username: "bucketboy",
        email: "bucky@buck.com",
        sharedBucketLists: [
          {
            bucket_list_id: 2,
            bucket_list_name: "Bucky's Top 3 games",
            bucket_list_user_id: 2,
            private: 0
          },
          {
            bucket_list_id: 4,
            bucket_list_name: "Bucky's Scuba Diving Goals",
            bucket_list_user_id: 2,
            private: 0
          }
        ],
        privateBucketLists: [
          {
            bucket_list_id: 3,
            bucket_list_name: "Bucky's Favorite Games",
            bucket_list_user_id: 2,
            private: 1
          }
        ]
      };

      expect(GETUSER.body).toStrictEqual(storedUser);
    });
    it("denies access with invalid token", async () => {
      const res = await request(server)
        .get("/user/2")
        .set(
          "Authorization",
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJ1Y2tldGJveSIsImlhdCI6MTU2OTUzMzQzOCwiZXhwIjoxNTY5NTUxNDM4fQ.hD9-9ucWo4Al33h_T6Z1JiR6cxg2o-WZr8Pg9Ac5_yg`
        );
      expect(res.status).toBe(401);
    });
  });
});
