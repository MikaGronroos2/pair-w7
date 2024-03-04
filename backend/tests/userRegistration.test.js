const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../server");
const User = require("../models/userModel");
const api = supertest(app);

let token = null;

beforeAll(async () => {
    await User.deleteMany({});
    const result = await api
    .post("/api/users/signup")
    .send({ email: "Pepe@pyykkaaja.fi", password: "Asd123€%&" })
    console.log(result);
});

describe("User that is signed in, is able to log in with the credentials", () => {
    test("User can log in with the signup credentials", async () => {
        
        await api.post("/api/users/login")
        .send({ email: "Pepe@pyykkaaja.fi", password: "Asd123€%&" })
        .expect(200)
        .expect("Content-Type", /application\/json/)
    });
});

afterAll(() => {
    mongoose.connection.close();

});