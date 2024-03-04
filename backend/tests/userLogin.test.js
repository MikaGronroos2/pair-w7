const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../server")
const api = supertest(app);
const User = require("../models/userModel");

let token = null;


    beforeEach( async () => {
        const result = await api
        .post("/api/users/login")
    .send({ email: "Pepe@pyykkaaja.fi", password: "Asd123€%&"})
    .expect(200)
    .expect("Content-Type", /application\/json/);
    token = result.body.token;
    console.log(result.body);
    });

describe("when user tries getMe", () => {
    test("/GET getMe", async () => {
        await api
        .get("/api/users/me")
        .set("Authorization", "bearer " + token)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    })
});



afterAll(() => {
    mongoose.connection.close();

});
