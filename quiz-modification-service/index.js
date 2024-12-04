const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/QuizDB");

const app = express();
app.use(express.json());

const quizAnswersSchema = new mongoose.Schema({
  Answer: String,
  Correct: Boolean,
});

const quizQuestionsSchema = new mongoose.Schema({
  Question: String,
  QuestionAnswers: [quizAnswersSchema],
});

const quizQuestions = mongoose.model("quizQuestions", quizQuestionsSchema);

app.get("/questions", async (req, res) => {
  const questions = await quizQuestions.find();
  res.json({ questions });
});

app.listen(3001, () => {
  console.log("Quiz Management Service started on port 3001");
});
