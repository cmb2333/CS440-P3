const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Setup express app
const app = express();
app.use(bodyParser.json());

// Connect to the ResponseDB database?
mongoose.connect("mongodb://127.0.0.1:27017/ResponseDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("User Response DB connected."))
  .catch((err) => console.log("Database connection error:", err));

// schema and model
const userResponseSchema = new mongoose.Schema({
  userId: String,
  quizId: String,
  responses: [{ questionId: String, answer: String }],
  score: Number
});

const UserResponse = mongoose.model("UserResponse", userResponseSchema);

// Submit user responses
app.post("/responses", async (req, res) => {
  try {
    const { userId, quizId, responses } = req.body;
    const score = calculateScore(responses);
    const userResponse = new UserResponse({ userId, quizId, responses, score });

    await userResponse.save();
    res.status(201).send(userResponse);
  } catch (error) {
    res.status(500).send("Error processing response.");
  }
});

// Calculate score
function calculateScore(responses) {
  return responses.filter(response => response.correct).length;
}

app.listen(3002, () => {
  console.log("User Response Service running on port 3002");
});
