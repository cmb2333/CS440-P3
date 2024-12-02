const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Setup express app
const app = express();
app.use(bodyParser.json());

// Connect to the QuizDB database?
mongoose.connect("mongodb://127.0.0.1:27017/QuizDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Quiz Management DB connected."))
  .catch((err) => console.log("Database connection error:", err));

// Schema and model
const quizAnswersSchema = new mongoose.Schema({
  Answer: String,
  Correct: Boolean
});

const quizQuestionsSchema = new mongoose.Schema({
  Question: String,
  QuestionAnswers: [quizAnswersSchema]
});

const QuizQuestion = mongoose.model("QuizQuestion", quizQuestionsSchema);

// Get quiz questions
app.get("/quiz", async (req, res) => {
  try {
    const allQuestions = await QuizQuestion.find();
    res.status(200).json(allQuestions);
  } catch (error) {
    res.status(500).send("Error fetching questions.");
  }
});

app.listen(3001, () => {
  console.log("Quiz Management Service running on port 3001");
});
