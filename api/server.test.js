const supertest = require("supertest");

const server = require("./server");
// const { add } = require("../games/games-model");
// const database = require("../data/knexConfig");

describe("route", () => {
  describe("get /", () => {
    it("returns json object", () => {
      return supertest(server)
        .get("/api/accounts")
        .then(res =>
          expect(res.body[0]).toEqual({
            title: "",
            genre: "",
            releaseYear: null,
            id: null
          })
        );
    });
    it("returns json", () => {
      return supertest(server)
        .get("/api/accounts")
        .expect("Content-Type", /json/i);
    });
    it("responds with 200", () => {
      return supertest(server)
        .get("/api/accounts")
        .expect(200);
    });
  });

  describe("post /", () => {
    it("responds with 200", () => {
      return supertest(server)
        .post("/api/accounts")
        .expect(500);
    });

    it("insert provided game", async () => {
      await add({
        classroom: "science",
        timer: 3,
        threshold: 20,
        teacher_id: 2
      });
    });
  });
});
