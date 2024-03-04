const mongoose = require("mongoose");
const supertest = require("supertest");
const server = require("../server");
const api = supertest(server);
const User = require("../models/userModel");
const Goal = require("../models/goalModel")

let token = null;
let email = null;

async function findGoals() {
    const response = await Goal.find({});
    return response.map((goal) => goal.toJSON());
};

beforeAll(async () => {
    await User.deleteMany({});
    const result = await api
      .post("/api/users/signup")
      .send({ email: "testi@email.fi", password: "#SecretPassword1234€€" });
    token = result.body.token;
    email = result.body.email;

  describe("when there is initially some goal saved", () => {
    beforeEach(async () => {
      await Goal.deleteMany({});
        });
    });
    
    test("Get all goals", async () => {
        await api
        .get("/api/goals")
        .set("Authorization", "bearer " + token)
        .expect(200)
        .expect("Content-Type", /application\/json/)
    });


    test("New goal added successfully", async () => {
        const newGoal = {
            text: "jotain tähän",
            user_id: email,
        };
        await api
         .post("/api/goals")
         .set("Authorization", "bearer " + token)
         .send(newGoal)
         .expect(200)
         .expect("Content-Type", /application\/json/)
         });
    
    test("Goal updated successfully", async () => {
        const goals = await api.get("/api/goals").set("Authorization", "bearer " + token);
    
        const goalToUpdate = goals.body[0];
    
        const updatedGoal = {
        ...goalToUpdate,
        text: "Updated goal text",
        };
    
        await api
        .put(`/api/goals/${goalToUpdate._id}`)
        .set("Authorization", "bearer " + token)
        .send(updatedGoal)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    
        const updatedGoals = await api.get("/api/goals").set("Authorization", "bearer " + token);
        const goalAfterUpdate = updatedGoals.body.find((goal) => goal._id === goalToUpdate._id);
        expect(goalAfterUpdate.text).toBe("Updated goal text");
    });
  

    test("Goal deleted successfully", async () => {
        const goalToDelete = await findGoals();
        const goal = goalToDelete[0];

        await api
          .delete(`/api/goals/${goal._id}`)
          .set("Authorization", "bearer " + token)
          .expect(200); 
      });
    }); 

afterAll(() => {
    mongoose.connection.close();
  });